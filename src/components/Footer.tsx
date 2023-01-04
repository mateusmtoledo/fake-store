import githubIcon from "../icons/github.png";
import styles from "./styles/Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <a className={styles.githubLink} href="https://github.com/mateusmtoledo">
        <img src={githubIcon} alt="GitHub" />
        <p>mateusmtoledo</p>
      </a>
    </footer>
  );
}
