import React, { useState, useEffect } from 'react';
import BounceLoader from 'react-spinners/BounceLoader';

const Splash = ({ playerReady }: { playerReady: boolean }) => {
  const [image, setImage] = useState('');

  useEffect(() => {
    // Simulate api call
    setTimeout(() => {
      // TODO fetch image from backend
      setImage('https://via.placeholder.com/1920x1080');
    }, 300);
  }, []);

  return image ? (
    <div
      className={`splash ${playerReady ? 'splash__hide' : ''}`}
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.54), rgba(0, 0, 0, 0.54)),
        url('${image}')`,
      }}
    >
      <h1>Espacio Publicitario</h1>
    </div>
  ) : (
    <div
      className='splash'
      style={{
        color: 'white',
        backgroundColor: 'black',
      }}
    >
      <BounceLoader loading={true} color='#FFFFFF' />
    </div>
  );
};

export default Splash;
