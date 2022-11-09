import styles from "./timer.module.scss";

function Timer({ time }) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const [minuteTen, minuteUnity] = String(minutes).padStart(2, "0");
  const [secondTen, secondUnity] = String(seconds).padStart(2, "0");

  return (
    <div className={styles.wrapper}>
      <span>{minuteTen}</span>
      <span>{minuteUnity}</span>
      <span>:</span>
      <span>{secondTen}</span>
      <span>{secondUnity}</span>
    </div>
  );
}

export default Timer;
