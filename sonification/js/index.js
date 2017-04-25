var wavesurfer = WaveSurfer.create({
  container: '#waveform',
  waveColor: 'darkorange',
  progressColor: 'purple',
  splitChannels: true,
  height: 128
});

wavesurfer.load('wav/multichannel.wav');

wavesurfer.on('ready', function () {
  var timeline = Object.create(WaveSurfer.Timeline);

  timeline.init({
    wavesurfer: wavesurfer,
    container: '#waveform-timeline'
  });
});