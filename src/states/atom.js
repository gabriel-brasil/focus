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

export const atomTimer = atom({
  key: "atomTimer",
  default: {
    pomodoro: 1500,
    shortBreak: 300,
    longBreak: 900,
  },
});

export const atomCountdownActived = atom({
  key: "atomCountdownActived",
  default: false,
});

export const atomWasStarted = atom({
  key: "atomWasStarted",
  default: false,
});
