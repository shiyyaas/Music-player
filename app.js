// DOM Elements
const playBtn = document.getElementById('play-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const progressBar = document.getElementById('progress-bar');
const volumeBar = document.getElementById('volume-bar');
const currentTimeEl = document.getElementById('current-time');
const totalTimeEl = document.getElementById('total-time');
const trackNameEl = document.getElementById('track-name');
const artistNameEl = document.getElementById('artist-name');
const albumArtEl = document.getElementById('album-art');

// Music Player State
let isPlaying = false;
let currentSongIndex = 0;
let audio = new Audio();

// Dummy Song Data (Since actual audio files aren't provided, we'll simulate it)
// Alternatively, I can use a free public domain audio link.
const songs = [
  {
    title: "SUNNY TULIPS",
    artist: "The Florals",
    src: "audio/song1.mp3",
    cover: "images/cover1.jpg"
  },
  {
    title: "MIDNIGHT BLOOM",
    artist: "Night Garden",
    src: "audio/song2.mp3",
    cover: "images/cover2.jpg"
  },
  {
    title: "DAWN CHORUS",
    artist: "Morning Light",
    src: "audio/song3.mp3",
    cover: "images/cover3.jpg"
  }
];

// Initialize Player
function loadSong(song) {
  trackNameEl.textContent = song.title;
  artistNameEl.textContent = song.artist;
  albumArtEl.src = song.cover;
  audio.src = song.src;

  // Reset progress bar and time displays
  progressBar.value = 0;
  currentTimeEl.textContent = "0:00";
  // The total time will update once the audio metadata is loaded
}

// Play/Pause Functionality
function togglePlay() {
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
}

function playSong() {
  isPlaying = true;
  playBtn.textContent = 'PAUSE';
  audio.play();
}

function pauseSong() {
  isPlaying = false;
  playBtn.textContent = 'PLAY';
  audio.pause();
}

// Previous/Next Functionality
function prevSong() {
  currentSongIndex--;
  if (currentSongIndex < 0) {
    currentSongIndex = songs.length - 1;
  }
  loadSong(songs[currentSongIndex]);
  if (isPlaying) playSong();
}

function nextSong() {
  currentSongIndex++;
  if (currentSongIndex > songs.length - 1) {
    currentSongIndex = 0;
  }
  loadSong(songs[currentSongIndex]);
  if (isPlaying) playSong();
}

// Progress Bar Update
function updateProgress(e) {
  const { duration, currentTime } = e.target;

  if (isNaN(duration)) return;

  const progressPercent = (currentTime / duration) * 100;
  progressBar.value = progressPercent;

  // Calculate display time
  let currentMins = Math.floor(currentTime / 60);
  let currentSecs = Math.floor(currentTime % 60);
  if (currentSecs < 10) currentSecs = `0${currentSecs}`;
  currentTimeEl.textContent = `${currentMins}:${currentSecs}`;

  let totalMins = Math.floor(duration / 60);
  let totalSecs = Math.floor(duration % 60);
  if (totalSecs < 10) totalSecs = `0${totalSecs}`;
  if (!isNaN(totalMins) && !isNaN(totalSecs)) {
      totalTimeEl.textContent = `${totalMins}:${totalSecs}`;
  }
}

// Set Progress Bar
function setProgress(e) {
  const value = progressBar.value;
  const duration = audio.duration;
  audio.currentTime = (value * duration) / 100;
}

// Set Volume
function setVolume() {
  audio.volume = volumeBar.value / 100;
}

// Event Listeners
playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('ended', nextSong);
progressBar.addEventListener('input', setProgress);
volumeBar.addEventListener('input', setVolume);

// Initial Load
loadSong(songs[currentSongIndex]);
