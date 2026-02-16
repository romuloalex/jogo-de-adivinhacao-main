// Importa os estilos específicos para o componente de letra.
import styles from "./styles.module.css";

// Props que controlam o conteúdo e a aparência visual de uma letra.
type Props = {
  value?: string; // Letra a ser exibida (pode ser vazia quando ainda não descoberta).
  size?: "default" | "small"; // Tamanho visual do componente (padrão ou reduzido).
  color?: "default" | "correct" | "wrong"; // Variação de cor conforme o estado da letra.
};

// Componente visual que representa uma única letra do jogo.
export function Letter({
  // Define valores padrão para quando as props não são passadas.
  value = "",
  size = "default",
  color = "default",
}: Props) {
  return (
    <div
      className={`
        ${styles.letter}
        ${size === "small" && styles.letterSmall}
        ${color === "correct" && styles.letterCorrect}
        ${color === "wrong" && styles.letterWrong}
      `}
    >
      {/* Exibe a letra (ou vazio, se ainda não adivinhada) */}
      <span>{value}</span>
    </div>
  );
}
