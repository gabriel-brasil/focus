import styles from "./timer.module.scss";

function Timer() {
  return (
    <div className={styles.wrapper}>
      <span>0</span>
      <span>0</span>
      <span>:</span>
      <span>0</span>
      <span>0</span>
    </div>
  );
}

export default Timer;
