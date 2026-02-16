// Importa os estilos específicos da seção de letras utilizadas.
import styles from "./styles.module.css";

// Importa o componente visual de letra, reutilizado aqui em tamanho menor.
import { Letter } from "../Letter";

// Tipo que representa cada letra utilizada no jogo.
export type LettersUsedProps = {
  value: string;   // Letra que o usuário digitou.
  correct: boolean; // Indica se a letra pertence à palavra (true) ou não (false).
};

// Props do componente LettersUsed: recebe uma lista de letras usadas.
type Props = {
  data: LettersUsedProps[];
};

// Componente responsável por listar todas as letras já tentadas pelo usuário.
export function LettersUsed({ data }: Props) {
  return (
    <div className={styles.lettersUsed}>
      {/* Título da seção de letras utilizadas */}
      <h5>Letras utilizadas</h5>

      <div>
        {/* Para cada letra utilizada, renderiza um componente Letter em versão pequena */}
        {data.map(({ value, correct }) => (
          <Letter
            key={value} // Usa o próprio valor da letra como chave (por ser único na lista).
            value={value}
            size="small" // Usa variação visual menor para caber mais letras.
            // Define a cor com base no resultado do palpite: acerto (correct) ou erro (wrong).
            color={correct ? "correct" : "wrong"}
          />
        ))}
      </div>
    </div>
  );
}
