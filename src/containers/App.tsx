import React from 'react';

import YoutubePlayer from '../components/YoutubePlayer';
import Splash from '../components/Splash';
import { YoutubeProvider } from '../contexts/youtube.context';

function App() {
  return (
    <YoutubeProvider>
      <Splash />
      <YoutubePlayer />
    </YoutubeProvider>
  );
}

export default App;
