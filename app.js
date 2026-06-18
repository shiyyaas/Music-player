// DOM Elements
const playBtn = document.getElementById("play-btn");
const playText = document.getElementById("play-text");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const progressBar = document.getElementById("progress-bar");
const volumeBar = document.getElementById("volume-bar");
const currentTimeEl = document.getElementById("current-time");
const totalTimeEl = document.getElementById("total-time");
const trackNameEl = document.getElementById("track-name");
const artistNameEl = document.getElementById("artist-name");
const albumArtEl = document.getElementById("album-art");
const audio = document.getElementById("audio-player");

// Player State
let isPlaying = false;
let currentSongIndex = 0;

// Songs
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

// Load Song
function loadSong(song) {
  trackNameEl.textContent = song.title;
  artistNameEl.textContent = song.artist;
  albumArtEl.src = song.cover;
  audio.src = song.src;

  progressBar.value = 0;
  currentTimeEl.textContent = "0:00";
}

// Play Song
function playSong() {
  isPlaying = true;
  playText.textContent = "PAUSE";
  audio.play();
}

// Pause Song
function pauseSong() {
  isPlaying = false;
  playText.textContent = "PLAY";
  audio.pause();
}

// Toggle Play
function togglePlay() {
  isPlaying ? pauseSong() : playSong();
}

// Previous Song
function prevSong() {
  currentSongIndex =
    (currentSongIndex - 1 + songs.length) % songs.length;

  loadSong(songs[currentSongIndex]);

  if (isPlaying) {
    audio.play();
  }
}

// Next Song
function nextSong() {
  currentSongIndex =
    (currentSongIndex + 1) % songs.length;

  loadSong(songs[currentSongIndex]);

  if (isPlaying) {
    audio.play();
  }
}

// Update Progress
function updateProgress() {
  if (!audio.duration) return;

  const progressPercent =
    (audio.currentTime / audio.duration) * 100;

  progressBar.value = progressPercent;

  // Premium progress fill
  progressBar.style.background = `linear-gradient(
    to right,
    #1C0B0A ${progressPercent}%,
    #ddd4ca ${progressPercent}%
  )`;

  // Current time
  let currentMins = Math.floor(audio.currentTime / 60);
  let currentSecs = Math.floor(audio.currentTime % 60);

  if (currentSecs < 10) {
    currentSecs = `0${currentSecs}`;
  }

  currentTimeEl.textContent =
    `${currentMins}:${currentSecs}`;
}

// Show Total Duration
function loadMetadata() {
  let mins = Math.floor(audio.duration / 60);
  let secs = Math.floor(audio.duration % 60);

  if (secs < 10) {
    secs = `0${secs}`;
  }

  totalTimeEl.textContent = `${mins}:${secs}`;
}

// Change Progress
function setProgress() {
  if (!audio.duration) return;

  audio.currentTime =
    (progressBar.value * audio.duration) / 100;
}

// Volume
function setVolume() {
  audio.volume = volumeBar.value / 100;
}

// Error Handling
function audioError() {
  alert("Audio file missing or cannot be played.");
}

// Event Listeners
playBtn.addEventListener("click", togglePlay);
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

audio.addEventListener("timeupdate", updateProgress);
audio.addEventListener("loadedmetadata", loadMetadata);
audio.addEventListener("ended", nextSong);
audio.addEventListener("error", audioError);

progressBar.addEventListener("input", setProgress);
volumeBar.addEventListener("input", setVolume);

// Initial Setup
loadSong(songs[currentSongIndex]);
setVolume();