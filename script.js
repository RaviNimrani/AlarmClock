// Get references to various HTML elements
const currentTime = document.getElementById("time");
const sethour = document.getElementById("hourI");
const setmin = document.getElementById("minI");
const setsec = document.getElementById("secI");
const setAmPm = document.querySelector("#am-pm");
const setbtn = document.getElementById("set");
const alarmContainer = document.getElementById("alarms-container");

// Arrays and variables to store data and track alarms
const ids = [];
let index = 0;
let audio = new Audio("alarm.mp3");
let hourValue = null;
let minuteValue = null;
let secValue = null;
let amPmValue;

// Update current time every second
setInterval(getTime, 1000);

// Function to display current time
function getTime() {
  let time = new Date();
  time = time.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  });
  currentTime.innerHTML = time;

  return time;
}

// Check and play alarm sound if alarm time matches current time
setInterval(() => {
  const current = getTime();

  for (let element in ids) {
    if (ids[element].value == current) {
      audio.play();
    }
  }
}, 1000);

// Event listener for the "Set Alarm" button
setbtn.addEventListener("click", getInput);

// Function to handle user input and set alarms
function getInput(e) {
  e.preventDefault();
  hourValue = sethour.value;
  minuteValue = setmin.value;
  secValue = setsec.value;
  amPmValue = setAmPm.value;

  // Validate input values
  if (hourValue == "Hour" || minuteValue == "Minute" || secValue == "Second") {
    window.alert("Enter Valid Values");
    return;
  }

  // Arrange alarm time and add alarm
  const aTime = arrange(hourValue, minuteValue, secValue, amPmValue);
  addAlarm(aTime);

  // Show success message and increment index
  setTimeout(() => {
    window.alert("Alarm Set Successfully !!");
    index++;
  }, 300);

  // Store alarm data
  ids[index] = {
    value: arrange(hourValue, minuteValue, secValue, amPmValue),
  };
}

// Structuring the alarm time
function arrange(hour, minute, second, amPm) {
  return `${parseInt(hour)}:${minute}:${second} ${amPm}`;
}

// Function to add alarms
function addAlarm(Atime) {
  const alarm = document.createElement("div");
  alarm.classList.add("alarm", "mb", "d-flex");
  alarm.id = Atime;

  // Create alarm HTML
  alarm.innerHTML = `
    <div class="time">${Atime}</div>
    <button class="btn delete-alarm">Delete</button>`;
  alarmContainer.appendChild(alarm);

  // Add event listener to delete button
  const deleteButton = alarm.querySelector(".delete-alarm");
  deleteButton.addEventListener("click", (e) => deleteAlarm(e));
}

// Function to delete an alarm
function deleteAlarm(event) {
  const point = event.target;

  // Find the parent alarm element
  const alarm = point.parentElement;
  const ide = alarm.querySelector(".time").innerHTML;

  // Remove alarm from the stored Array
  for (let i in ids) {
    if (ids[i].value === ide) {
      ids[i].value = 0;
    }
  }

  // Remove the alarm element
  alarm.remove();
}
