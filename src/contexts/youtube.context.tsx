import React, {
  useState,
  useEffect,
  useMemo,
  useContext,
  createContext,
  useRef,
} from 'react';

import { useCast } from './cast.context';

const YoutubeContext = createContext<Context>({
  player: {},
  apiReady: false,
});

export const YoutubeProvider: React.FC = ({ children }) => {
  const { castReady, videoId } = useCast();

  const [apiReady, setApiReady] = useState(false);
  const [player, setPlayer] = useState<any>(null);
  const apiLoaded = useRef(false);
  const playerRef = useRef<any>(null);

  const providerValue = useMemo(() => ({ apiReady, player }), [
    apiReady,
    player,
  ]);

  const _loadApi = () => {
    (window as any).onYouTubeIframeAPIReady = (e: any) => _onPlayerReady(e); // automatically called by yt api when loaded

    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const tmpTag = document.getElementsByTagName('head')[0];

    tmpTag.parentNode!.insertBefore(tag, tmpTag);
    apiLoaded.current = true;
  };

  const _onPlayerReady = (event: any) => {
    _initPlayer();
    if (event) {
      setApiReady(true);
      setPlayer(event.target);
    }
  };

  const _initPlayer = () => {
    // TODO - check why its not recognizing method and get videoId from ionic app
    playerRef.current = new (window as any).YT.Player('youtubePlayer', {
      height: '100%',
      width: '100%',
      videoId,
      events: {
        onReady: _onPlayerReady,
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
    // TODO - Check for chromecast_receiver api loaded
    if (!apiLoaded.current && castReady) _loadApi();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [castReady]);

  return (
    <YoutubeContext.Provider value={providerValue}>
      {children}
    </YoutubeContext.Provider>
  );
};

export const useYoutube = () => useContext(YoutubeContext);

interface Context {
  player: any;
  apiReady: boolean;
}
