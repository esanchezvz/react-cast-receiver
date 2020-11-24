import React, { useState, useEffect, useMemo, useContext, createContext, useRef } from 'react';
import { CastReceiverContext } from '../@types/CastReceiver';

declare const cast: any;

const NAMESPACE = 'urn:x-cast:dev.esanchezvz.custom-cast-test';

const YoutubeContext = createContext<Context>({
  player: {},
  apiReady: false,
});

export const YoutubeProvider: React.FC = ({ children }) => {
  const [apiReady, setApiReady] = useState(false);
  const [player, setPlayer] = useState<any>(null);
  const [castReady, setCastReady] = useState(false);
  const [context, setContext] = useState<CastReceiverContext | null>(null);
  const apiLoaded = useRef(false);
  const playerRef = useRef<any>(null);
  const [videoId, setVideoId] = useState<string>('');
  const [startSeconds, setStartSeconds] = useState<number>(0);

  const providerValue = useMemo(() => ({ apiReady, player }), [apiReady, player]);

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
        start: startSeconds,
      },
    });
  };

  useEffect(() => {
    if (!castReady && context) {
      const _listener = (e: { type: string; data: any }) => {
        if (e.data.command === 'INIT_COMMUNICATION') {
          setVideoId(e.data.videoId as string);
          setStartSeconds(e.data.startSeconds);
          setCastReady(true);
        }
        if (e.data.command === 'MUTE_VIDEO') {
          player.mute();
        }
        if (e.data.command === 'UNMUTE_VIDEO') {
          player.unMute();
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
    if (!apiLoaded.current && castReady) _loadApi();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [castReady]);

  return <YoutubeContext.Provider value={providerValue}>{children}</YoutubeContext.Provider>;
};

export const useYoutube = () => useContext(YoutubeContext);

interface Context {
  player: any;
  apiReady: boolean;
}
