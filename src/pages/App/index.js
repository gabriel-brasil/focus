import { useEffect, useState } from "react";

import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  atomActivedItem,
  atomBgColor,
  atomConfig,
  atomCountdownActived,
  atomTimer,
  atomWasStarted,
} from "../../states/atom";

import classNames from "classnames";

import Button from "../../components/Button";
import Header from "../../components/Header";
import Item from "../../components/Item";
import Timer from "../../components/Timer";

import styles from "./app.module.scss";
import Input from "../../components/Input";
import { timeToSeconds } from "../../common/utils/timeToSecond";

let countdownTimeout;

function App() {
  // Recoil
  const timer = useRecoilValue(atomTimer);

  const config = useRecoilValue(atomConfig);
  const setConfig = useSetRecoilState(atomConfig);

  const timerWasStarted = useRecoilValue(atomWasStarted);
  const setTimerWasStarted = useSetRecoilState(atomWasStarted);

  const bgColor = useRecoilValue(atomBgColor);
  const setBgColor = useSetRecoilState(atomBgColor);

  const activedItem = useRecoilValue(atomActivedItem);
  const setActivedItem = useSetRecoilState(atomActivedItem);

  const isCountdownActived = useRecoilValue(atomCountdownActived);
  const setIsCountdownActived = useSetRecoilState(atomCountdownActived);
  // /Recoil

  // Custom Timer
  const [customPomodoro, setCustomPomodoro] = useState("00:00:00");
  const [customShortBreak, setCustomShortBreak] = useState("00:00:00");
  const [customLongBreak, setCustomLongBreak] = useState("00:00:00");

  const [stream, setStream] = useState(null);

  // /Custom Timer

  const currentTimer = timer[activedItem];
  const [time, setTime] = useState(timer[activedItem]);

  useEffect(() => {
    setTime(timeToSeconds(currentTimer));
  }, [currentTimer]);

  useEffect(() => {
    if (isCountdownActived && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else {
      clearTimeout(countdownTimeout);
    }
  }, [isCountdownActived, time]);

  function activeItem(ev) {
    setActivedItem(ev.target.id);
    setBgColor(ev.target.id);
    setIsCountdownActived(false);
    setTimerWasStarted(false);
  }

  function startCountdown() {
    setIsCountdownActived(true);
    setTimerWasStarted(true);
  }

  function stopCountdown() {
    setIsCountdownActived(false);
  }

  function resetCountdown() {
    setTime(timeToSeconds(currentTimer));
    setTimerWasStarted(false);
  }

  useEffect(() => {
    if (config === true) {
      if (JSON.parse(localStorage.getItem("focus_customTimers"))) {
        getCurrentCustomTimers();
      } else {
        setNewCustomTimers();
      }
    }
  }, [config]);

  function setNewCustomTimers() {
    localStorage.setItem(
      "focus_customTimers",
      JSON.stringify({
        pomodoro: "00:00:00",
        shortBreak: "00:00:00",
        longBreak: "00:00:00",
      })
    );
  }

  function getCurrentCustomTimers() {
    const customTimers = JSON.parse(localStorage.getItem("focus_customTimers"));
    setCustomPomodoro(customTimers.pomodoro);
    setCustomShortBreak(customTimers.shortBreak);
    setCustomLongBreak(customTimers.longBreak);
  }

  function saveCustomTimer() {
    // pegar os dados do localstorage
    const customTimers = JSON.parse(localStorage.getItem("focus_customTimers"));

    // pegar os dados dos inputs e atualizar os dados do localstorage com os dados dos inputs
    customTimers.pomodoro = customPomodoro;
    customTimers.shortBreak = customShortBreak;
    customTimers.longBreak = customLongBreak;

    // salvar os dados no localstorage
    localStorage.setItem("focus_customTimers", JSON.stringify(customTimers));
  }

  function cancelCustomTimer() {
    setConfig(false);
  }

  function requestStream() {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        const video = document.querySelector("#video");
        setStream(stream);

        video.srcObject = stream;
        video.play();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function stopStream() {
    const video = document.querySelector("#video");


    stream.getTracks().forEach(function (track) {
      track.stop();
    });

    video.src = "";
    setStream(null);
  }

  return (
    <div
      className={classNames({
        [styles.wrapper]: true,
        [styles[bgColor]]: true,
        [styles.config]: config,
      })}
    >
      <Header />

      {!config ? (
        <main className={styles.main}>
          <nav className={styles.nav}>
            <Item id="pomodoro" onClick={activeItem} actived={activedItem}>
              Pomodoro
            </Item>
            <Item id="shortBreak" onClick={activeItem} actived={activedItem}>
              Short Break
            </Item>
            <Item id="longBreak" onClick={activeItem} actived={activedItem}>
              Long Break
            </Item>
          </nav>

          <Timer time={time} />

          <div className={styles.userControls}>
            {!isCountdownActived && !timerWasStarted && (
              <Button onClick={startCountdown}>Iniciar</Button>
            )}

            {isCountdownActived && (
              <Button onClick={stopCountdown}>Pausar</Button>
            )}
            {!isCountdownActived && timerWasStarted && (
              <>
                <Button onClick={startCountdown}>Retomar</Button>
                <Button onClick={resetCountdown}>Reiniciar</Button>
              </>
            )}
          </div>
        </main>
      ) : (
        <div className={styles.options}>
          <div className={styles.nav}>
            <div className={styles.custom}>
              <Item>Pomodoro</Item>
              <Input
                custom="custom"
                value={customPomodoro}
                onChange={(ev) => setCustomPomodoro(ev.target.value)}
              />
            </div>
            <div className={styles.custom}>
              <Item>Short Break</Item>
              <Input
                custom="custom"
                value={customShortBreak}
                onChange={(ev) => setCustomShortBreak(ev.target.value)}
              />
            </div>
            <div className={styles.custom}>
              <Item>Long Break</Item>
              <Input
                custom="custom"
                value={customLongBreak}
                onChange={(ev) => setCustomLongBreak(ev.target.value)}
              />
            </div>
          </div>

          <div className={styles.userControls}>
            <Button onClick={() => saveCustomTimer()}>Salvar</Button>
            <Button onClick={() => cancelCustomTimer()}>Cancelar</Button>
          </div>

          <div className={styles.user}>
            <div className={styles.photo}>
              <video src="" id="video"></video>
            </div>
            <div>
              {stream ? (
                <Button onClick={() => stopStream()}>Parar Câmera</Button>
              ) : (
                <Button onClick={() => requestStream()}>Testar Câmera</Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
