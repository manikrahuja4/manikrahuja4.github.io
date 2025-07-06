    // ==== Element Selectors ====
    const nowPlaying = document.querySelector(".now-playing");
    const trackArt = document.querySelector(".track-art");
    const trackName = document.querySelector(".track-name");
    const trackArtist = document.querySelector(".track-artist");

    const playPauseBtn = document.querySelector(".playpause-track");
    const seekSlider = document.querySelector(".seek_slider");
    const volumeSlider = document.querySelector(".volume_slider");
    const currentTimeDisplay = document.querySelector(".current-time");
    const totalDurationDisplay = document.querySelector(".total-duration");

    // ==== State ====
    let trackIndex = 0;
    let isPlaying = false;
    let updateTimer;
    const currTrack = new Audio();

    // ==== Track List ====
    const trackList = [
      {
        name: "Animals",
        artist: "Maroon 5",
        image: "https://i.discogs.com/Th3K6NHZVa75FVjLayd6taQltOeM1MADTH5SAg5gMcE/rs:fit/g:sm/q:90/h:512/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTEyNzAz/MjQ2LTE1NDAzNjgx/MDEtMzQ2Mi5qcGVn.jpeg",
        path: "./music/Animals---Maroon-5(PagalWorlld.Com).mp3"
      },
      {
        name: "Tom's Diner",
        artist: "AnnenMayKantereit & Giant Rooks",
        image: "https://i.ytimg.com/vi/5r3B7yz6J68/maxresdefault.jpg",
        path: "./music/annenmaykantereit-giant-rooks-tom-s-diner-mp3.mp3"
      },
      {
        name: "Believer",
        artist: "Imagine Dragons",
        image: "https://i.scdn.co/image/ab67616d0000b2732f2623c93d48a736c6f23cef",
        path: "./music/Believer By Imagine Dragons From Believer.mp3"
      },
      {
        name: "Bad Guy",
        artist: "Billie Eilish",
        image: "https://i1.sndcdn.com/artworks-000515072985-gx5m4c-t500x500.jpg",
        path: "./music/Billie_Eilish_-_Bad_guy_(Jesusful.com).mp3"
      }
    ];

    function loadTrack(index) {
      clearInterval(updateTimer);
      resetValues();
      const track = trackList[index];
      currTrack.src = track.path;
      currTrack.load();
      trackArt.style.backgroundImage = `url(${track.image})`;
      trackName.textContent = track.name;
      trackArtist.textContent = track.artist;
      nowPlaying.textContent = `Playing ${index + 1} of ${trackList.length}`;
      updateTimer = setInterval(seekUpdate, 1000);
      currTrack.addEventListener("ended", nextTrack);
      setRandomBackground();
    }

function setRandomBackground() {
  // Generate a base color in the lighter range (128–255)
  const base = () => Math.floor(Math.random() * 128) + 128;

  // Get base color components
  const red = base();
  const green = base();
  const blue = base();

  // Set background color
  const bgColor = `rgb(${red}, ${green}, ${blue})`;
  document.body.style.backgroundColor = bgColor;

  // Calculate darker shade for border
  const darker = (val) => Math.max(0, val - 60); // ensure not below 0
  const textColor = `rgb(${darker(red)}, ${darker(green)}, ${darker(blue)})`;

  // Apply border to upload button
  const uploadBtn = document.querySelector(".upload-btn");
  if (uploadBtn) {
    uploadBtn.style.color = `${textColor}`;
  }
}


    function resetValues() {
      currentTimeDisplay.textContent = "00:00";
      totalDurationDisplay.textContent = "00:00";
      seekSlider.value = 0;
    }

    function playpauseTrack() {
      isPlaying ? pauseTrack() : playTrack();
    }

    function playTrack() {
      currTrack.play();
      isPlaying = true;
      playPauseBtn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
    }

    function pauseTrack() {
      currTrack.pause();
      isPlaying = false;
      playPauseBtn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
    }

    function nextTrack() {
      trackIndex = (trackIndex + 1) % trackList.length;
      loadTrack(trackIndex);
      playTrack();
    }

    function prevTrack() {
      trackIndex = (trackIndex - 1 + trackList.length) % trackList.length;
      loadTrack(trackIndex);
      playTrack();
    }

    function seekTo() {
      if (!isNaN(currTrack.duration)) {
        currTrack.currentTime = currTrack.duration * (seekSlider.value / 100);
      }
    }

    function setVolume() {
      currTrack.volume = volumeSlider.value / 100;
    }

    function seekUpdate() {
      if (!isNaN(currTrack.duration)) {
        const seekPosition = (currTrack.currentTime / currTrack.duration) * 100;
        seekSlider.value = seekPosition;
        const formatTime = (s) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
        currentTimeDisplay.textContent = formatTime(currTrack.currentTime);
        totalDurationDisplay.textContent = formatTime(currTrack.duration);
      }
    }

    function handleUserTrack(event) {
      const file = event.target.files[0];
      if (file) {
        const url = URL.createObjectURL(file);
        trackList.push({
          name: file.name,
          artist: "Local File",
          image: "https://play-lh.googleusercontent.com/mOkjjo5Rzcpk7BsHrsLWnqVadUK1FlLd2-UlQvYkLL4E9A0LpyODNIQinXPfUMjUrbE",
          path: url
        });
        trackIndex = trackList.length - 1;
        loadTrack(trackIndex);
        playTrack();
      }
    }

    // Initial load
    loadTrack(trackIndex);