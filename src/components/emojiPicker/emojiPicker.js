// Este es el Componente Principal

import { forwardRef, useEffect, useRef, useState } from "react";
import { data as emojiList } from "./data";// importamos los datos de data.js
import EmojiButton from "./emojiButton";

import styles from "./emojiPicker.module.css";
import EmojiSearch from "./emojiSearch";
import EmojiList from "./emojiList";

// borramos: function EmojiPicker() y lo cambiamos por esta función: forwardRef
// por lo tanto ya nos estamos construyendo un nuevo componente
export default forwardRef((props, inputRef) => {
// esta función necesita un callback el cual va ser la definición de mi componente

// esta es otra forma de definir componentes, la cual se usa cuando se necesita 
// heredar (pasar de un componente Padre a un componente Hijo) la referencia de un useRef

  const [isOpen, setIsOpen] = useState(false);
  const [emojis, setEmojis] = useState([...emojiList]);//  emojiList = data.js

  const containerRef = useRef(null);

  useEffect(() => {
    window.addEventListener("click", (e) => {// oyente de eventos
    // sirve para detectar a que le estamos dando click en la pantalla
      if (!containerRef.current.contains(e.target)) {
        // containerRef hace referencia al contenedor en donde estan los emojis
        setIsOpen(false);// esto sirve para abrir el menú buscador de emojis
        setEmojis([...emojiList]);// aquí le decimos que nos muestre emojiList = data.js
      }
    });
  }, []);

  function handleClick() {
    setIsOpen(!isOpen);// con esto abrimos y cerramos el menú de emojis
  }

  function handleEmojiClick(emoji) {
    const cursorPos = inputRef.current.selectionStart;// nos da la posición inicial del cursor
    const text = inputRef.current.value;// obtenemos el texto actual

    // si el cursor está en medio de 2 palabras:  antes 😊 después
    const prev = text.slice(0, cursorPos);// obtenemos lo que está antes del cursor
    const next = text.slice(cursorPos);// obtenemos lo que está después del cursor
    // para hacer esto dividimos (cortamos) el arreglo con el método: slice()

    // una vez que obtenemos la posición del cursor en el input, 
    // concatenamos (unimos) el texto con el ó los emojis.    symbol = 😊
    inputRef.current.value = prev + emoji.symbol + next;

    // esto es por si ponemos varios emojis en un mismo lugar:          😊 😊 Texto 😊 😊
    inputRef.current.selectionStart = cursorPos + emoji.symbol.length;// 0  1    2             antes
    inputRef.current.selectionEnd = cursorPos + emoji.symbol.length; //          0    1   2    después
    inputRef.current.focus();
    // hacemos referencia a current, la cual es una propiedad que saca (apunta) 
    // la referencia del objeto en donde colocamos la propiedad: ref
  }

  function handleSearch(e) {// e = event = evento
    const q = e.target.value;
    // q = query

    if (!!q) {// si esto es igual a verdadero (si existe un valor)
      const search = emojiList.filter((emoji) => {
    // filtramos la busqueda para cada emoji
        return (
          emoji.name.toLowerCase().includes(q) ||
          emoji.keywords.toLowerCase().includes(q)
          // si existe el nombre ó la palabra clave en minúsculas
        );
      });

      setEmojis([...search]);// nos regresa el emoji que estamos buscando
    } else {
      setEmojis([...emojiList]);// nos regresa al menú de busqueda de emojis
    }
  }

  return (
    <div ref={containerRef} style={{ position: "relative", display: "inline" }}>
      <button className={styles.emojiPickerButton} onClick={handleClick}>
        😊
      </button>
      {isOpen ? (
        // esto es un condicional ? = if
        <div className={styles.emojiPickerContainer}>
          <EmojiSearch onSearch={handleSearch} />  {/* buscar emojis */}

          <EmojiList>  {/* imprimir la lista de emojis */}
            {emojis.map((emoji) => (
              // aquí recorremos el arreglo 'lista' de emojis
              <EmojiButton
                key={emoji.symbol}
                emoji={emoji}
                onClick={handleEmojiClick}
              />
            ))}
          </EmojiList>
        </div>
      ) : (
        ""
      )}
    </div>
  );
});
