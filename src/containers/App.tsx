import React, { useEffect } from 'react';

import YoutubePlayer from '../components/YoutubePlayer';
import { YoutubeProvider } from '../contexts/youtube.context';

function App() {
  return (
    <YoutubeProvider>
      {/* // TODO - get Video id from cast Message */}
      <YoutubePlayer videoId='dQw4w9WgXcQ' />
    </YoutubeProvider>
  );
}

export default App;
