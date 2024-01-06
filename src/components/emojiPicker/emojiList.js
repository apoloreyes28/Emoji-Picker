import styles from "./emojiPicker.module.css";

export default function EmojiList({ children }) {
  return <div className={styles.emojisList}>{children}</div>;
}
