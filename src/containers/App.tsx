import React, { useEffect, useState } from 'react';

import YoutubePlayer from '../components/YoutubePlayer';
import VimeoPlayer from '../components/VimeoPlayer';
import Splash from '../components/Splash';
import { useCast } from '../contexts/cast.context';
import { YoutubeProvider } from '../contexts/youtube.context';

function App() {
  const { provider } = useCast();
  const [playerReady, setPlayerReady] = useState(false);
  //
  useEffect(() => {
    return () => window.close();
  }, []);

  return (
    <>
      <Splash playerReady={playerReady} />
      {provider === 'youtube' && (
        <YoutubeProvider>
          <YoutubePlayer handleSplash={() => setPlayerReady(true)} />
        </YoutubeProvider>
      )}
      {provider === 'vimeo' && (
        <VimeoPlayer
          splashHandled={playerReady}
          handleSplash={() => setPlayerReady(true)}
        />
      )}
    </>
  );
}

export default App;
