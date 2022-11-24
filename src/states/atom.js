import { atom } from "recoil";

export const atomBgColor = atom({
  key: "atomBgColor",
  default: "pomodoro",
});

export const atomConfig = atom({
  key: "atomConfig",
  default: false,
});

export const atomActivedItem = atom({
  key: "atomActivedItem",
  default: "pomodoro",
});

const getLocalStorage = JSON.parse(localStorage.getItem("focus_customTimers"));

let timer = {};

if (getLocalStorage && getLocalStorage.pomodoro !== "00:00:00") {
  timer.pomodoro = getLocalStorage.pomodoro;
} else {
  timer.pomodoro = "00:25:00";
}

if (getLocalStorage && getLocalStorage.shortBreak !== "00:00:00") {
  timer.shortBreak = getLocalStorage.shortBreak;
} else {
  timer.shortBreak = "00:05:00";
}

if (getLocalStorage && getLocalStorage.longBreak !== "00:00:00") {
  timer.longBreak = getLocalStorage.longBreak;
} else {
  timer.longBreak = "00:15:00";
}

export const atomTimer = atom({
  key: "atomTimer",
  default: timer,
});

export const atomCountdownActived = atom({
  key: "atomCountdownActived",
  default: false,
});

export const atomWasStarted = atom({
  key: "atomWasStarted",
  default: false,
});
