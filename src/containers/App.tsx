import React, { useEffect, useState } from 'react';

// import Player from '../components/Player';
import YoutubePlayer from '../components/YoutubePlayer'
import Splash from '../components/Splash';

function App() {
  const [playerReady, setPlayerReady] = useState(false);

  useEffect(() => {
    return () => window.close();
  }, []);

  return (
    <>
      {/* <Player onReady={() => setPlayerReady(true)} /> */}
      <Splash playerReady={playerReady} />
      <YoutubePlayer handleSplash={() => setPlayerReady(true)} />
    </>
  );
}

export default App;
