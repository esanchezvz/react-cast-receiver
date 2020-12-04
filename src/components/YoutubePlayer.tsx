import React, { useEffect, useRef } from 'react';
import { useCast } from '../contexts/cast.context';
import { useYoutube } from '../contexts/youtube.context';

const YoutubePlayer = ({ handleSplash }: { handleSplash: () => void }) => {
  const { player, apiReady } = useYoutube();
  const { castMessage } = useCast();
  const playerInit = useRef(false);
  const apiLoaded = useRef(false);

  useEffect(() => {
    if (!playerInit.current && player) {
      player.playVideo();
      playerInit.current = true;
    }

    console.log({ player });
  }, [player]);

  useEffect(() => {
    if (apiReady && player && !apiLoaded.current) {
      handleSplash();
      apiLoaded.current = true;
    }
  }, [apiReady, player, handleSplash]);

  useEffect(() => {
    if (!player) return;

    if (castMessage.command === 'PLAY_VIDEO') {
      player.playVideo();
    }
    if (castMessage.command === 'PAUSE_VIDEO') {
      player.pauseVideo();
    }
    if (castMessage.command === 'FORWARD') {
      player.seekTo(player.getCurrentTime() + 10, true);
    }
    if (castMessage.command === 'REWIND') {
      player.seekTo(player.getCurrentTime() - 10, true);
    }
  }, [castMessage, player]);

  return <div style={{ height: '100%', width: '100%' }} id={`youtubePlayer`} />;
};

export default YoutubePlayer;
