// Importa os estilos específicos do campo de entrada de texto.
import styles from "./styles.module.css";

// Aproveita todas as props nativas de um <input> HTML.
type Props = React.ComponentProps<"input">;

// Componente de input reutilizável, já estilizado para o jogo.
export function Input({ ...rest }: Props) {
  return (
    // Define sempre o tipo text, aplica a classe de estilo e repassa o restante das props.
    <input type="text" className={styles.input} {...rest} />
  );
}
