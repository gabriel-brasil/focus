import { useState } from "react";
import Button from "../../components/Button";

import Header from "../../components/Header";
import Item from "../../components/Item";
import Timer from "../../components/Timer";

import styles from "./app.module.scss";

function App() {
  const [viewOptions, setViewOptions] = useState(false);

  const [activedItem, setActivedItem] = useState("Pomodoro");

  function activeItem(ev) {
    setActivedItem(ev.target.textContent);
  }

  return (
    <div className={styles.wrapper}>
      <Header viewOptions={viewOptions} setViewOptions={setViewOptions} />

      {!viewOptions ? (
        <main className={styles.main}>
          <nav className={styles.nav}>
            <Item onClick={activeItem} actived={activedItem}>
              Pomodoro
            </Item>
            <Item onClick={activeItem} actived={activedItem}>
              Short Break
            </Item>
            <Item onClick={activeItem} actived={activedItem}>
              Long Break
            </Item>
          </nav>

          <Timer />

          <div className={styles.userControls}>
            <Button>Iniciar</Button>
            <Button>Retomar</Button>
            <Button>Reiniciar</Button>
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
