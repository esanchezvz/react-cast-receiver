import React, { useState, useEffect, useMemo, useContext, createContext, useRef } from 'react';

const YoutubeContext = createContext<Context>({
  player: {},
  apiReady: false,
});

export const YoutubeProvider: React.FC = ({ children }) => {
  const [apiReady, setApiReady] = useState(false);
  const [player, setPlayer] = useState<any>(null);
  const apiLoaded = useRef(false);
  const playerRef = useRef<any>(null);

  const providerValue = useMemo(() => ({ apiReady, player }), [apiReady, player]);

  const _onPlayerReady = (event: any) => {
    _initPlayer();
    if (event) {
      setApiReady(true);
      setPlayer(event.target);
    }
  };

  const _loadApi = () => {
    // TODO - check why its not recognizing method
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
      videoId: 'dQw4w9WgXcQ',
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
        origin: 'https://www.youtube.com',
        rel: 0,
        showinfo: 0,
        iv_load_policy: 3,
      },
    });
  };

  useEffect(() => {
    if (!apiLoaded.current) _loadApi();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <YoutubeContext.Provider value={providerValue}>{children}</YoutubeContext.Provider>;
};

export const useYoutube = () => useContext(YoutubeContext);

interface Context {
  player: any;
  apiReady: boolean;
}
