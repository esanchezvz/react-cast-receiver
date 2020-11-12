import React, { useEffect } from 'react';

import YoutubePlayer from '../components/YoutubePlayer';
import { YoutubeProvider, useYoutube } from '../contexts/youtube.context';

function App() {
  const { player } = useYoutube();

  useEffect(() => {
    console.log(player);
  }, [player]);

  return (
    <YoutubeProvider>
      {/* // TODO - get Video id from cast Message */}
      <YoutubePlayer videoId='dQw4w9WgXcQ' />
    </YoutubeProvider>
  );
}

export default App;
