let fetchedData = null;
let intervalId = null;
// User-based access token
const clientId = "f217d780b51e4badb7b1ba2da50d14ef";
const redirectUri = "http://localhost:3000/spotify-player.html"; // Replace with your redirect URI
const scopes = "user-read-playback-state user-modify-playback-state";

const authUrl = `https://accounts.spotify.com/authorize?response_type=token&client_id=${clientId}&scope=${encodeURIComponent(scopes)}&redirect_uri=${encodeURIComponent(redirectUri)}`;

// Redirect the user to Spotify's login page
document.getElementById("tokenButton").addEventListener("click", function (event) {
    window.location.href = authUrl;
});

// Extract the access token from the URL fragment
const hash = window.location.hash.substring(1);
const params = new URLSearchParams(hash);
const accessToken = params.get("access_token");

console.log("User Access Token:", accessToken);

/*   document.getElementById("playerButton").addEventListener("click", function (event) { */
fetchPlayer(accessToken);
/*   }); */

// Get player infos
document.getElementById("tokenButton").addEventListener("click", function (event) {
    fetchPlayer(accessToken);
})

function fetchPlayer(accessToken) {
    fetch("https://api.spotify.com/v1/me/player", {
        method: "GET",
        headers: { "Authorization": "Bearer " + accessToken }
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            console.log("GOT Player Data:", data);
            displayPlayer(data);
        })
        .catch((error) => {
            console.error("Error fetching player data:", error);
        });
}

function displayPlayer(data) {
    document.getElementById("player").innerHTML = `
    <div>
    <p>Listening on: <b>${data.device.type}</b></p>
    <p>Song: <b>${data.item.name}</b></p>
    <p>Album: <b>${data.item.album.name}</b></p>
    <p>Artist: <b>${data.item.artists[0].name}</b></p>
    <img src="${data.item.album.images[0].url}" style="width: 200px; height: 200px;">

    </div>           
    `
    document.getElementById("progress").style.width = `${data.progress_ms / data.item.duration_ms * 100}%`;
    document.getElementById("playbackTime").innerHTML = `${Math.floor(data.progress_ms / 60000)}:${Math.floor((data.progress_ms % 60000) / 1000).toString().padStart(2, '0')}`;
    document.getElementById("endTime").innerHTML = `${Math.floor(data.item.duration_ms / 60000)}:${Math.floor((data.item.duration_ms % 60000) / 1000).toString().padStart(2, '0')}`;

    const time = document.getElementById("playbackTime")
    console.log(time.innerHTML)
    let minSec = time.innerHTML.split(":");
    let min = parseInt(minSec[0]);
    let sec = parseInt(minSec[1]);
    updatePlayer(min, sec, time, data.item.duration_ms, accessToken, data.item.name);
}

// Play button
document.getElementById("playButton").addEventListener("click", function (event) {
    fetch(`https://api.spotify.com/v1/me/player/play`, {
        method: "PUT",
        headers: { "Authorization": "Bearer  " + accessToken, 'Content-Type': 'application/json' },
        
    })
});

// Pause button
document.getElementById("pauseButton").addEventListener("click", function (event) {
    fetch(`https://api.spotify.com/v1/me/player/pause`, {
        method: "PUT",
        headers: { "Authorization": "Bearer " + accessToken }
    })
})

function updatePlayer(min, sec, time, endTime, accessToken, trackName) {
     // Clear any existing interval before starting a new one
     if (intervalId) {
        clearInterval(intervalId);
    }

    intervalId = setInterval(() => {
    const bar = document.getElementById("progress")
    let width = parseFloat(bar.style.width);
    width += 100 / (endTime / 1000);
    bar.style.width = width + "%";
                    
    sec += 1;
    if (sec >= 60) {
        sec = 0;
        min += 1;
    }
    time.innerHTML = `${min}:${sec.toString().padStart(2, '0')}`;

    if (min >= Math.floor(endTime / 60000) && sec >= Math.floor((endTime % 60000) / 1000)) {
        min = 0;
        sec = 0;
        fetchPlayer(accessToken);
    }   
}, 1000);
}




    



