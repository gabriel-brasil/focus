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

let countdownTimeout;

function App() {
  // Recoil
  const timer = useRecoilValue(atomTimer);
  const config = useRecoilValue(atomConfig);

  const timerWasStarted = useRecoilValue(atomWasStarted);
  const setTimerWasStarted = useSetRecoilState(atomWasStarted);

  const bgColor = useRecoilValue(atomBgColor);
  const setBgColor = useSetRecoilState(atomBgColor);

  const activedItem = useRecoilValue(atomActivedItem);
  const setActivedItem = useSetRecoilState(atomActivedItem);

  const isCountdownActived = useRecoilValue(atomCountdownActived);
  const setIsCountdownActived = useSetRecoilState(atomCountdownActived);
  // /Recoil

  const [time, setTime] = useState();
  const currentTimer = timer[activedItem];

  useEffect(() => {
    setTime(currentTimer);
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
    setTime(currentTimer);
    setTimerWasStarted(false);
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
              <Item type="custom">00:00</Item>
            </div>
            <div className={styles.custom}>
              <Item>Short Break</Item>
              <Item type="custom">00:00</Item>
            </div>
            <div className={styles.custom}>
              <Item>Long Break</Item>
              <Item type="custom">00:00</Item>
            </div>
          </div>

          <div className={styles.userControls}>
            <Button>Salvar</Button>
            <Button>Cancelar</Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
