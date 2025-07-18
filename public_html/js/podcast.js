const podcasts = [
  { id: 'WLniyScD8OM', titulo: 'Podcast 1: NEGOCIACION INFALIBLE' },
  { id: 'oyRoGAwnq6c', titulo: 'Podcast 2: EXPERTO EN MENTE INCONCSIENTE' },
  { id: '1hDnKinIFC4', titulo: 'Podcast 3: LO QUE NO SABES DEL AYAHUASCA' },
  { id: 'c6_cadmuxoc', titulo: 'Podcast 4: PACTOS, DEMONIOS y CIUDADES PERDIDAS' }
];

const container = document.getElementById('podcasts-container');
const players = {};

function onYouTubeIframeAPIReady() {
  podcasts.forEach((podcast, index) => {
    const div = document.createElement('div');
    div.classList.add('podcast');
    div.innerHTML = `
      <h2>${podcast.titulo}</h2>
      <div id="player-${index}"></div>
      <div class="controles">
        <button onclick="rewind(${index}, 10)">⏪ -10s</button>
        <button onclick="playVideo(${index})">▶️ Play</button>
        <button onclick="pauseVideo(${index})">⏸️ Pause</button>
        <button onclick="forward(${index}, 10)">⏩ +10s</button>
        <input type="range" min="0" max="100" value="50" onchange="setVolume(${index}, this.value)">
      </div>
    `;
    container.appendChild(div);

    players[index] = new YT.Player(`player-${index}`, {
      videoId: podcast.id,
      playerVars: {
        autoplay: 0,
        controls: 0,
        modestbranding: 1
      },
      events: {
        'onReady': (event) => {
          event.target.setVolume(50);
        }
      }
    });
  });
}

function playVideo(index) {
  players[index].playVideo();
}

function pauseVideo(index) {
  players[index].pauseVideo();
}

function setVolume(index, value) {
  players[index].setVolume(value);
}

function rewind(index, segundos) {
  const currentTime = players[index].getCurrentTime();
  players[index].seekTo(Math.max(0, currentTime - segundos), true);
}

function forward(index, segundos) {
  const currentTime = players[index].getCurrentTime();
  players[index].seekTo(currentTime + segundos, true);
}