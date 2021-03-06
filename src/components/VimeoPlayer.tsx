import React, { useRef, useState, useEffect } from 'react';
import Player from '@vimeo/player';

import { useCast } from '../contexts/cast.context';

const VimeoPlayer = ({
  handleSplash,
  splashHandled,
}: {
  handleSplash: () => void;
  splashHandled: boolean;
}) => {
  const { videoId, castMessage, provider } = useCast();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const playerInitRef = useRef(false);
  const loadedRef = useRef(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [player, setPlayer] = useState<Player | null>(null);
  const [vimeoError, setVimeoError] = useState<any>(null);

  useEffect(() => {
    let player: Player;
    if (iframeRef.current) {
      player = new Player(iframeRef.current, {
        autoplay: true,
        autopause: false,
        background: false,
        playsinline: true,
      });

      console.log({ player });
      setPlayer(player);
      playerInitRef.current = true;
    }

    return () => {
      player.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handler = async () => {
      if (!playerInitRef.current || !player) return;

      if (castMessage.command === 'PLAY_VIDEO') {
        await player.play();
      }
      if (castMessage.command === 'PAUSE_VIDEO') {
        await player.pause();
      }
      if (castMessage.command === 'FORWARD') {
        const time = await player.getCurrentTime();
        await player.setCurrentTime(time + 10);
      }
      if (castMessage.command === 'REWIND') {
        const time = await player.getCurrentTime();
        await player.setCurrentTime(time >= 10 ? time - 10 : 0);
      }
    };

    handler();
  }, [castMessage, player]);

  useEffect(() => {
    if (player && !loadedRef.current) {
      // const _requestFullscrren = async () => {
      //   await (player as any).requestFullscreen();
      // };

      player.on('loaded', async (e) => {
        loadedRef.current = true;
        setVideoLoaded(true);
        handleSplash();
        // await _requestFullscrren();
      });

      player.on('error', async (e) => {
        setVimeoError(e);
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [player]);

  return (
    <>
      <iframe
        ref={iframeRef}
        title='vimeo player'
        src={`https://player.vimeo.com/video/${videoId}?autoplay=1&autopause=0&origin=${window.location.protocol}//${window.location.hostname}`}
        width='100%'
        height='100%'
        frameBorder='0'
        allowFullScreen
        allow='autoplay'
      />
      <div
        style={{
          backgroundColor: 'white',
          position: 'absolute',
          display: 'none', // Remove for debugging on TV
          top: 0,
          left: 0,
          width: 'auto',
          padding: 20,
          color: 'black',
          zIndex: 1500,
        }}
      >
        <pre>
          {JSON.stringify(
            {
              provider,
              videoId,
              splashHandled,
              videoLoaded: videoLoaded,
              castMessage,
              vimeoError,
            },
            null,
            2
          )}
        </pre>
      </div>
    </>
  );
};

export default VimeoPlayer;
