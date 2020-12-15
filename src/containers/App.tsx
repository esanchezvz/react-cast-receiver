import React, { useEffect, useState } from 'react';

import YoutubePlayer from '../components/YoutubePlayer';
import VimeoPlayer from '../components/VimeoPlayer';
import Splash from '../components/Splash';
import { useCast } from '../contexts/cast.context';

function App() {
  const { provider } = useCast();
  const [playerReady, setPlayerReady] = useState(true);

  useEffect(() => {
    return () => window.close();
  }, []);

  return (
    <>
      <Splash playerReady={playerReady} />
      {provider === 'youtube' && (
        <YoutubePlayer handleSplash={() => {}} />
        // <YoutubePlayer handleSplash={() => setPlayerReady(true)} />
      )}
      {provider === 'vimeo' && (
        <VimeoPlayer handleSplash={() => {}} />
        // <VimeoPlayer handleSplash={() => setPlayerReady(true)} />
      )}
    </>
  );
}

export default App;
