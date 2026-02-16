// Importa os estilos específicos do botão.
import styles from "./styles.module.css";

// Props do botão: herda todas as props nativas de <button>
// e adiciona a prop "title" para o texto exibido dentro do botão.
type Props = React.ComponentProps<"button"> & {
  title: string;
};

// Componente de botão reutilizável da aplicação.
export function Button({ title, ...rest }: Props) {
  return (
    <button type="button" className={styles.button} {...rest}>
      {/* Texto principal do botão, passado via prop "title" */}
      {title}
    </button>
  );
}
