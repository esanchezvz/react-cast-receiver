import React, { useEffect, useRef, useState } from 'react';
import { useCast } from '../contexts/cast.context';
declare const YT: any;

const YoutubePlayer = ({ handleSplash }: { handleSplash: () => void }) => {
  const { castMessage, videoId, castReady, provider } = useCast();

  const playerInit = useRef(false);
  const [player, setPlayer] = useState<any>(null);
  const apiLoaded = useRef(false);
  const playerRef = useRef<any>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [seekTo, setSeekTo] = useState<any>(null);
  const [playerError, setPlayerError] = useState<any>({});
  const [playerState, setPlayerState] = useState<number>(0);

  const _onPlayerReady = (event: any) => {
    _initPlayer();
    if (event) {
      // console.log({ event });
      setPlayer(event.target);
      handleSplash();
    }
  };

  const _initPlayer = () => {
    playerRef.current = new YT.Player('youtubePlayer', {
      height: '100%',
      width: '100%',
      videoId,
      events: {
        onReady: _onPlayerReady,
        onError: (error: any) => setPlayerError(error),
        onStateChange: (state: any) => setPlayerState(state.data),
      },
      playerVars: {
        autoplay: 1,
        autohide: 1,
        controls: 1,
        enablejsapi: 1,
        allowfullscreen: 1,
        fs: 0,
        origin: `${window.location.protocol}//${window.location.hostname}`,
        rel: 0,
        showinfo: 0,
        iv_load_policy: 3,
      },
    });

    // setPlayer(playerRef.current);
  };

  useEffect(() => {
    const _loadYoutubeApi = () => {
      (window as any).onYouTubeIframeAPIReady = (e: any) => _onPlayerReady(e); // automatically called by yt api when loaded

      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const tmpTag = document.getElementsByTagName('head')[0];

      tmpTag.parentNode!.insertBefore(tag, tmpTag);
      apiLoaded.current = true;
    };

    if (!apiLoaded.current && castReady) _loadYoutubeApi();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [castReady]);

  useEffect(() => {
    if (!playerInit.current && player) {
      const iframe = iframeRef.current as any;

      const requestFullScreen =
        iframe.requestFullScreen ||
        iframe.mozRequestFullScreen ||
        iframe.webkitRequestFullScreen;
      if (requestFullScreen) {
        requestFullScreen.bind(iframe)();
      }

      player.playVideo();
      playerInit.current = true;
    }

    // console.log({ player });
  }, [player]);

  useEffect(() => {
    if (!player) return;

    const castHandler = async () => {
      if (castMessage.command === 'PLAY_VIDEO') {
        player.playVideo();
      }
      if (castMessage.command === 'PAUSE_VIDEO') {
        player.pauseVideo();
      }
      if (castMessage.command === 'FORWARD') {
        const seekTime = (await player.getCurrentTime()) + 10;
        setSeekTo({
          currentTime: await player.getCurrentTime(),
          seekTo: seekTime,
        });
        player.seekTo(seekTime, false);
      }
      if (castMessage.command === 'REWIND') {
        const seekTime = (await player.getCurrentTime()) - 10;
        setSeekTo({
          currentTime: await player.getCurrentTime(),
          seekTo: seekTime,
        });
        player.seekTo(seekTime, false);
      }
    };

    castHandler();
  }, [castMessage, player]);

  return (
    <>
      <iframe
        ref={iframeRef}
        title='youtube'
        id='youtubePlayer'
        width='100%'
        height='100%'
        src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&html5=1`}
        frameBorder='0'
        allow='autoplay'
        allowFullScreen
      />
      <div
        style={{
          backgroundColor: 'white',
          position: 'absolute',
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
              playerState,
              playerError,
              castMessage,
              seekTo,
            },
            null,
            2
          )}
        </pre>
      </div>
    </>
  );
};

export default YoutubePlayer;
