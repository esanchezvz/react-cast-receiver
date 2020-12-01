import React from 'react';

// import YoutubePlayer from '../components/YoutubePlayer';
import Player from '../components/Player'
import {CastProvider} from '../contexts/cast.context';
// import Splash from '../components/Splash';
// import { YoutubeProvider } from '../contexts/youtube.context';

function App() {
  return (
    <CastProvider>
      <Player />
    </CastProvider>
  );
}

export default App;
