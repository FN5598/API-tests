let map;
let marker;
let watchId;

window.initMap = async function () {
  let userCoordinates = await getUserLocation();

  if (!userCoordinates) {
    console.warn("Using default location (Kyiv)");
    userCoordinates = { lat: 50.4501, lng: 30.5234 };
  }

  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    center: userCoordinates,
  });

  marker = new google.maps.Marker({
    position: userCoordinates,
    map: map,
    title: "Your Location",
  });

  // Start watching position when map initialized
  if (navigator.geolocation) {
    watchId = navigator.geolocation.watchPosition(
      (position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        marker.setPosition(pos);
        map.setCenter(pos);
        currentSpeedHTML.innerHTML = `${position.coords.speed ? (position.coords.speed * 3.6).toFixed(2) : '0'} km/h`; // speed in m/s * 3.6 = km/h
      },
      (error) => {
        console.error("Error watching position:", error);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 10000,
      }
    );
  } else {
    console.warn("Geolocation is not supported by this browser.");
  }
};

async function getUserLocation() {
  try {
    const position = await new Promise((resolve, reject) =>
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      })
    );

    const { latitude, longitude } = position.coords;

    return { lat: latitude, lng: longitude };
  } catch (error) {
    console.error("Error getting user location:", error.message);
    return null;
  }
}

// Your existing timer, speed, and button code remain mostly unchanged

const dateHTML = document.getElementById("date");
let dateToday = dayjs();
dateHTML.innerHTML = dateToday.format("MMMM D, YYYY");

let movingTimeHTML = document.getElementById("moving-time");

function updateDuration(startTime) {
  let currentTime = Date.now();
  let duration = currentTime - startTime;

  let seconds = Math.floor((duration / 1000) % 60);
  let minutes = Math.floor((duration / (1000 * 60)) % 60);
  let hours = Math.floor(duration / (1000 * 60 * 60));

  let formattedTime =
    String(hours).padStart(2, "0") +
    ":" +
    String(minutes).padStart(2, "0") +
    ":" +
    String(seconds).padStart(2, "0");

  movingTimeHTML.innerHTML = formattedTime;
  return duration / 1000; // seconds
}

const startButtonHTML = document.getElementById("start-button");
let isClicked = false;
let timeId = null;
startButtonHTML.addEventListener("click", () => {
  if (isClicked) {
    startButtonHTML.innerText = "Start";
    isClicked = false;
    clearInterval(timeId);
    return;
  } else {
    isClicked = true;
    startButtonHTML.innerText = "Stop";
    let startTime = Date.now();
    timeId = setInterval(() => {
      let duration = updateDuration(startTime);
      updateSpeed(duration, 100);
    }, 1000);
  }
});

let averageSpeedHTML = document.getElementById("average-speed");

function updateSpeed(duration, distance) {
  // duration in seconds, distance in meters
  let hours = duration / 3600; // convert seconds to hours
  let km = distance / 1000; // convert meters to km
  let speedInKmh = km / hours;
  averageSpeedHTML.innerHTML = `${speedInKmh.toFixed(2)} km/h`;
}

let currentSpeedHTML = document.getElementById("current-speed");
