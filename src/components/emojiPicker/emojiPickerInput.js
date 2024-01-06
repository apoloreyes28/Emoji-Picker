import { useRef } from "react";
import EmojiPicker from "./emojiPicker";

import styles from "./emojiPicker.module.css";

export default function EmojiPickerInput() {

  const inputRef = useRef(null);// este es el gancho 'hook' useRef

  return (
    <div className={styles.inputContainer}>
      <input ref={inputRef} />
      <EmojiPicker ref={inputRef} />
    </div>
  );
}// todos los inputs tienen por defecto el método: focus

/*
aquí el código va manejar la referencia del input -  ref={}  - para estar 
pasando el método focus 'foco' y asi el usuario no pierde la posición 
donde está escribiendo al momento de insertar el o los emojis.
*/

/*
useRef nos permite acceder a la referencia (en donde está almacenado) de un 
elemento; es decir, nos permite conectar elementos (etiquetas) HTML entre si
a partir de la referencia (especificar el punto de inicio y el destino que va seguir).
*/