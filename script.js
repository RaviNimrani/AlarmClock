const currentTime = document.getElementById("time");
const sethour = document.getElementById("hourI");
const setmin = document.getElementById("minI");
const setsec = document.getElementById("secI");
const setAmPm = document.querySelector("#am-pm");
const setbtn = document.getElementById("set");
const ids = [];
let index = 0;
let audio = new Audio("alarm.mp3");
const alarmContainer = document.getElementById("alarms-container");
let hourValue = null;
let minuteValue = null;
let secValue = null;
let amPmValue;

setInterval(getTime, 1000);

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

setInterval(() => {
  const current = getTime();

  for (let element in ids) {
    if (ids[element].value == current) {
      audio.play();
    }
  }
}, 1000);

setbtn.addEventListener("click", getInput);

function getInput(e) {
  e.preventDefault();
  hourValue = sethour.value;
  minuteValue = setmin.value;
  secValue = setsec.value;
  amPmValue = setAmPm.value;

  if (hourValue == "Hour" || minuteValue == "Minute" || secValue == "Second") {
    window.alert("Enter Valid Values");
    return;
  }

  const aTime = arrange(hourValue, minuteValue, secValue, amPmValue);
  addAlarm(aTime);
  setTimeout(() => {
    window.alert("Alarm Set Successfully !!");
    index++;
  }, 300);

  ids[index] = {
    value: arrange(hourValue, minuteValue, secValue, amPmValue),
  };
}

function arrange(hour, minute, second, amPm) {
  return `${parseInt(hour)}:${minute}:${second} ${amPm}`;
}

function addAlarm(Atime) {
  const alarm = document.createElement("div");
  alarm.classList.add("alarm", "mb", "d-flex");
  alarm.id = Atime;

  alarm.innerHTML = `
  <div class="time " >${Atime}</div>
  <button class="btn delete-alarm">Delete</button>`;
  alarmContainer.appendChild(alarm);

  const deleteButton = alarm.querySelector(".delete-alarm");
  deleteButton.addEventListener("click", (e) => deleteAlarm(e));
}

function deleteAlarm(event) {
  const point = event.target;

  const alarm = point.parentElement;
  const ide = alarm.querySelector(".time").innerHTML;
  console.log("hello");
  for (let i in ids) {
    console.log(ids[i].value);
    if (ids[i].value === ide) {
      ids[i].value = 0;
    }
  }
  alarm.remove();
}
