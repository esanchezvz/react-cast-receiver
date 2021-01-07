import React, { useEffect, useRef, useState } from 'react';
import { differenceInSeconds } from 'date-fns';

import { useCast } from '../contexts/cast.context';
declare const YT: any;

const YoutubePlayer = ({ handleSplash }: { handleSplash: () => void }) => {
  const { castMessage, videoId, castReady } = useCast();

  const playerInit = useRef(false);
  const apiLoaded = useRef(false);
  const playerRef = useRef<any>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [player, setPlayer] = useState<any>(null);
  const [playerState, setPlayerState] = useState(-1);
  const [currentTime, setCurrentTime] = useState(0);
  const [, setPlayerError] = useState<any>(null);
  const [timer, setTimer] = useState<Date>(new Date());

  const _onPlayerReady = (event: any) => {
    _initPlayer();
    if (event) {
      setPlayer(event.target);
      handleSplash();
    }
  };

  const _onPlayerStateChanged = (e: { data: number; target: any }) => {
    setPlayerState(e.data);
    setCurrentTime(Math.round(e.target.playerInfo.currentTime));
    setTimer(new Date());
  };

  const _onError = (e: any) => {
    handleSplash();
    // castContext.setInactivityTimeout(30); // Close after 30 seconds
    setPlayerError(e);
  };

  const _initPlayer = () => {
    playerRef.current = new YT.Player('youtubePlayer', {
      height: '100%',
      width: '100%',
      videoId,
      events: {
        onReady: _onPlayerReady,
        onStateChange: _onPlayerStateChanged,
        onError: _onError,
      },
      playerVars: {
        autoplay: 1,
        controls: 1,
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
    if (!player) return;

    if (!playerInit.current && player) {
      const iframe = iframeRef.current as any;

      const requestFullScreen =
        iframe.requestFullScreen ||
        iframe.mozRequestFullScreen ||
        iframe.webkitRequestFullScreen;
      if (requestFullScreen && process.env.NODE_ENV !== 'development') {
        requestFullScreen.bind(iframe)();
      }

      player.playVideo();
      playerInit.current = true;
    }
  }, [player]);

  useEffect(() => {
    if (!player) return;

    // If player is paused ignore timer
    const dTime = playerState === 2 ? 0 : differenceInSeconds(new Date(), timer);
    const playerTime = currentTime + dTime;

    if (castMessage.command === 'PLAY_VIDEO') {
      player.playVideo();
    }
    if (castMessage.command === 'PAUSE_VIDEO') {
      player.pauseVideo();
    }
    if (castMessage.command === 'FORWARD') {
      const seekTime = playerTime + 10;
      if (playerState === 2) setCurrentTime(seekTime);
      player.seekTo(seekTime, true);
    }
    if (castMessage.command === 'REWIND') {
      const seekTime = playerTime - 10;
      if (playerState === 2) setCurrentTime(seekTime);
      player.seekTo(seekTime, true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    </>
  );
};

export default YoutubePlayer;
