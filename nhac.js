// default variables
let vidID = "0go2nfVXFgA"; 
let timeStart = 10; 
let bgImagePath = "";

// get params and apply changes to website
const url = new URL(location.href);
const params = url.searchParams;

// get data from params
if (params.has("vidID")) {
  vidID = params.get("vidID");
}

if (params.has("timeStart")) {
  timeStart = Number(params.get("timeStart"));
}


// Load the IFrame Player API code asynchronously.
var tag = document.createElement("script");
tag.src = "https://www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Replace the 'ytplayer' element with an <iframe> and
// YouTube player after the API code downloads.

var player;
function onYouTubePlayerAPIReady() {
  player = new YT.Player("ytplayer", {
    height: "128",
    width: "256",
    videoId: String(vidID),
    playerVars: {
      start: Number(timeStart),
      controls: 0,
    },
    events: {
      onReady: onPlayerReady,
    },
  });
}

var isPlaying = false;

const onPlayerReady = (event) => {
  const enableMusic = confirm("Bật âm thanh?");
  const music_tag = document.querySelector("#music-name");
  music_tag.textContent = player.videoTitle;
  music_tag.addEventListener("click", () => {
    window.open(event.target.playerInfo.videoUrl);
  });
  if (enableMusic) {
    const pause_button = document.querySelector("#pause");
    pause_button.classList.replace("fa-volume-xmark", "fa-volume-off");
    pause_button.addEventListener("click", () => {
      if (isPlaying) {
        event.target.pauseVideo();
        pause_button.classList.replace("fa-volume-high", "fa-volume-off");
      } else if (!isPlaying) {
        event.target.playVideo();
        pause_button.classList.replace("fa-volume-off", "fa-volume-high");
      }
      isPlaying = !isPlaying;
    });
  }
};
