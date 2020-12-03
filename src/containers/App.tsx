import React, { useEffect, useState } from 'react';

import Player from '../components/Player'
import { CastProvider } from '../contexts/cast.context';
import Splash from '../components/Splash';

function App() {
  const [playerReady, setPlayerReady] = useState(false);

  useEffect(() => {
    return () => window.close();
  }, []);

  return (
    <CastProvider>
      <Splash playerReady={playerReady} />
      <Player onReady={() => setPlayerReady(true)} />
    </CastProvider>
  );
}

export default App;
