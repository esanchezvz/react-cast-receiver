import React, { useEffect, useState } from 'react';

import YoutubePlayer from '../components/YoutubePlayer';
import VimeoPlayer from '../components/VimeoPlayer';
import Splash from '../components/Splash';
import { useCast } from '../contexts/cast.context';

function App() {
  const { provider, videoId, castMessage } = useCast();
  const [playerReady, setPlayerReady] = useState(false);

  useEffect(() => {
    return () => window.close();
  }, []);

  return (
    <>
      <Splash playerReady={playerReady} />
      {provider === 'youtube' && (
        <YoutubePlayer handleSplash={() => setPlayerReady(true)} />
      )}
      {provider === 'vimeo' && (
        <VimeoPlayer
          splashHandled={playerReady}
          handleSplash={() => setPlayerReady(true)}
        />
      )}

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
              playerReady,
              castMessage,
            },
            null,
            2
          )}
        </pre>
      </div>
    </>
  );
}

export default App;
