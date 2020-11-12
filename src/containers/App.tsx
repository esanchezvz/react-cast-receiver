import React from 'react';

import YoutubePlayer from '../components/YoutubePlayer';
import { YoutubeProvider } from '../contexts/youtube.context';

function App() {
  return (
    <YoutubeProvider>
      {/* // TODO - get Video id from cast Message */}
      <YoutubePlayer />
    </YoutubeProvider>
  );
}

export default App;
