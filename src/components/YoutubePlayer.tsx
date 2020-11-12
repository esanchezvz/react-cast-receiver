import React from 'react';
// import YoutubeIframeService from '../services/youtubeIframeApi.service';

const YoutubePlayer = ({ videoId }: Props) => {
  // const playerRef = useRef<any>();

  // useEffect(() => {
  //   const ytService = new YoutubeIframeService(videoId);
  //   // ytService.initialize();
  //   playerRef.current = ytService.player;

  //   setTimeout(() => console.log(ytService.player), 1);

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return <div style={{ height: '100%', width: '100%' }} id={`playerDOM`} />;
};

interface Props {
  videoId: string;
}

export default YoutubePlayer;
