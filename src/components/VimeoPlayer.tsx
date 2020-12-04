import React, { useRef, useState, useEffect } from 'react';
import Vimeo from '@u-wave/react-vimeo';

import { useCast } from '../contexts/cast.context';

const VimeoPlayer = ({ handleSplash }: { handleSplash: () => void }) => {
  const { videoId, castMessage } = useCast();
  const playerRef = useRef<any>();
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    console.log({ castMessage, player: playerRef.current });
    if (!playerRef.current) return;

    if (castMessage.command === 'PLAY_VIDEO') {
      setPlaying(true);
    }
    if (castMessage.command === 'PAUSE_VIDEO') {
      setPlaying(false);
    }
    if (castMessage.command === 'FORWARD') {
      // TODO
      // player.seekTo(player.getCurrentTime() + 10, true);
    }
    if (castMessage.command === 'REWIND') {
      // TODO
      // player.seekTo(player.getCurrentTime() - 10, true);
    }
  }, [castMessage]);

  return (
    <Vimeo
      autoplay
      ref={playerRef}
      className='player--vimeo'
      video={videoId}
      onLoaded={handleSplash}
      onPlay={() => setPlaying(true)}
      paused={!playing}
    />
  );
};

export default VimeoPlayer;
