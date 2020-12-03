document.addEventListener('DOMContentLoaded', function () {
  const playerDOM = document.getElementById('player');
  var player;
  let castReady = false;
  const debuggerDOM = document.getElementById('debugger');

  function messageListener(e) {
    const { type, data } = e;

    debuggerDOM.innerHTML = JSON.stringify(data, null, 2);

    switch (data.command) {
      case 'INIT_COMMUNICATION':
        playerDOM.setAttribute('data-plyr-provider', data.provider);
        playerDOM.setAttribute('data-plyr-embed-id', data.videoId);
        player = new Plyr(playerDOM, { seekTime: 10 });
        castReady = true;

        player.on('ready', function () {
          // TODO hide splashscreen
          player.play();
        });

        break;
      case 'PLAY_VIDEO':
        player.play();
        break;
      case 'PAUSE_VIDEO':
        player.pause();
        break;
      case 'REWIND':
        player.rewind();
        break;
      case 'FORWARD':
        player.forward();
        break;
      default:
        break;
    }
  }

  const castContext = cast.framework.CastReceiverContext.getInstance();

  castContext.addCustomMessageListener(
    'urn:x-cast:dev.esanchezvz.custom-cast-test',
    messageListener
  );
  castContext.start();
});
