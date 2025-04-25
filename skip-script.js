// Next button
document.getElementById("nextButton").addEventListener("click", function (event) {
    fetch(`https://api.spotify.com/v1/me/player/next`, {
        method: "POST",
        headers: { "Authorization": "Bearer  " + accessToken},        
    })
    .then(() => {
        // Introduce a delay before calling fetchPlayer
        setTimeout(() => fetchPlayer(accessToken), 1000); // 1-second delay
    })
    .catch(error => console.error("Error skipping to the next song:", error));

});

// Previous button
// Next button
document.getElementById("previousButton").addEventListener("click", function (event) {
    fetch(`https://api.spotify.com/v1/me/player/previous`, {
        method: "POST",
        headers: { "Authorization": "Bearer  " + accessToken},        
    })
    .then(() => {
        // Introduce a delay before calling fetchPlayer
        setTimeout(() => fetchPlayer(accessToken), 1000); // 1-second delay
    })
    .catch(error => console.error("Error skipping to the next song:", error));

});