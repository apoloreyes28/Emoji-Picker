import styles from "./emojiPicker.module.css";

export default function EmojiSearch({ onSearch }) {
  return <input className={styles.search} onChange={onSearch} />;
}
