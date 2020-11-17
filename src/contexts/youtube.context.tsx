import React, { useState, useEffect, useMemo, useContext, createContext, useRef } from 'react';
import { CastReceiverContext } from '../@types/CastReceiver';

declare const cast: any;

const NAMESPACE = 'urn:x-cast:dev.esanchezvz.custom-cast-test';

const YoutubeContext = createContext<Context>({
  player: {},
  apiReady: false,
  event: {},
});

export const YoutubeProvider: React.FC = ({ children }) => {
  const [apiReady, setApiReady] = useState(false);
  const [player, setPlayer] = useState<any>(null);
  const [event, setEvent] = useState<any>(null);
  const [castReady, setCastReady] = useState(false);
  const [context, setContext] = useState<CastReceiverContext | null>(null);
  const apiLoaded = useRef(false);
  const playerRef = useRef<any>(null);
  const [videoId, setVideoId] = useState<string>('');

  const providerValue = useMemo(() => ({ apiReady, player, event }), [apiReady, player, event]);

  const _onPlayerReady = (event: any) => {
    _initPlayer();
    if (event) {
      setApiReady(true);
      setPlayer(event.target);
    }
  };

  const _loadApi = () => {
    (window as any).onYouTubeIframeAPIReady = (e: any) => _onPlayerReady(e); // automatically called by yt api when loaded

    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const tmpTag = document.getElementsByTagName('head')[0];

    tmpTag.parentNode!.insertBefore(tag, tmpTag);
    apiLoaded.current = true;
  };

  const _onStateChange = (event: { data: number; target: any }) => {
    // TODO: send state changed to ionic app.
    console.log({ playerState: event });
  };

  const _initPlayer = () => {
    // TODO - check why its not recognizing method and get videoId from ionic app
    playerRef.current = new (window as any).YT.Player('playerDOM', {
      height: '100%',
      width: '100%',
      videoId,
      // videoId: 'dQw4w9WgXcQ',
      // videoId: '71uOaZECL6A', // live feed example
      events: {
        onReady: _onPlayerReady,
        onStateChange: _onStateChange,
        // onPlaybackQualityChange: (event) =>
        //   YouTubePlayerBridge.sendPlaybackQualityChange(event.data),
        // onPlaybackRateChange: (event) => YouTubePlayerBridge.sendPlaybackRateChange(event.data),
        // onError: (error) => console.log(error),
        // onApiChange: () => YouTubePlayerBridge.sendApiChange(),
      },
      playerVars: {
        autoplay: 0,
        autohide: 1,
        controls: 0,
        enablejsapi: 1,
        fs: 0,
        origin: `${window.location.protocol}//${window.location.hostname}`,
        rel: 0,
        showinfo: 0,
        iv_load_policy: 3,
      },
    });
  };

  useEffect(() => {
    if (!castReady && context) {
      const _listener = (e: { type: string; data: any }) => {
        console.log(e);
        setEvent(e);
        if (e.data.command === 'INIT_COMMUNICATION_CONSTANTS') {
          setVideoId(e.data.videoId as string);
          setCastReady(true);
        }
      };

      context.addCustomMessageListener(NAMESPACE, _listener);
      context.start();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context]);

  useEffect(() => {
    setContext(cast.framework.CastReceiverContext.getInstance());
  }, []);

  useEffect(() => {
    // TODO - Check for chromecast_receiver api loaded
    if (!apiLoaded.current && castReady) _loadApi();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [castReady]);

  return <YoutubeContext.Provider value={providerValue}>{children}</YoutubeContext.Provider>;
};

export const useYoutube = () => useContext(YoutubeContext);

interface Context {
  player: any;
  event: any;
  apiReady: boolean;
}
