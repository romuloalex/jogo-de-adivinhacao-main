// Importa o módulo de estilos específico deste componente.
import styles from "./styles.module.css";

// Importa o ícone que representa visualmente a ideia de "dica".
import tipIcon from "../../assets/tip.svg";

// Define as props esperadas pelo componente Tip.
type Props = {
  // Texto da dica que será exibida para o usuário.
  tip: string;
};

// Componente responsável por exibir a dica da palavra atual.
export function Tip({ tip }: Props) {
  return (
    // Aplica o estilo de container de dica.
    <div className={styles.tip}>
      {/* Ícone ilustrativo da seção de dica */}
      <img src={tipIcon} alt="Ícone de dica" />

      <div>
        {/* Título da seção de dica */}
        <h3>Dica</h3>

        {/* Conteúdo da dica, recebido via props */}
        <p>{tip}</p>
      </div>
    </div>
  );
}
