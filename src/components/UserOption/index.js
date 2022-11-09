import { useRecoilValue, useSetRecoilState } from "recoil";
import { atomConfig } from "../../states/atom";

import { ReactComponent as GitHubSVG } from "../../images/github.svg";
import { ReactComponent as ConfigSVG } from "../../images/config.svg";

import styles from "./UserOption.module.scss";

function UserOption() {
  const config = useRecoilValue(atomConfig);
  const setConfig = useSetRecoilState(atomConfig);

  return (
    <div className={styles.wrapper}>
      <a
        className={styles.icon}
        href="https://github.com/gabriel-brasil/focus"
        target="_blank"
        rel="noreferrer"
      >
        <GitHubSVG fill="var(--White)" />
      </a>

      <button className={styles.icon} onClick={() => setConfig(!config)}>
        <ConfigSVG fill="var(--White)" />
      </button>
    </div>
  );
}

export default UserOption;
