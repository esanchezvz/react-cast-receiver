import React from 'react';
import ReactDOM from 'react-dom';

import App from './containers/App';
import { CastProvider } from './contexts/cast.context';
// import { YoutubeProvider } from './contexts/youtube.context';

import './styles/index.scss';

ReactDOM.render(
  <React.StrictMode>
    <CastProvider>
      {/* <YoutubeProvider> */}
        <App />
      {/* </YoutubeProvider> */}
    </CastProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
