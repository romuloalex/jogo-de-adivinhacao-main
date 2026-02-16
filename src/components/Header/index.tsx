// Importa a imagem de logo exibida no topo da aplicação.
import logo from "../../assets/logo.png";

// Importa o ícone usado no botão de reiniciar jogo.
import restart from "../../assets/restart.svg";

// Importa os estilos específicos do cabeçalho.
import styles from "./styles.module.css";

// Props esperadas pelo Header.
type Props = {
  current: number;      // Número atual de tentativas já usadas.
  max: number;          // Número máximo de tentativas permitidas.
  onRestart: () => void; // Função chamada ao clicar no botão de reinício.
};

// Componente de cabeçalho que exibe logo, tentativas e botão de reinício.
export function Header({ current, max, onRestart }: Props) {
  return (
    <div className={styles.container}>
      {/* Logo da aplicação, para identidade visual */}
      <img src={logo} alt="Logo" />

      <header>
        {/* Texto informando ao usuário o progresso de tentativas */}
        <span>
          <strong>{current}</strong> de {max} tentativas
        </span>

        {/* Botão que permite reiniciar o jogo a qualquer momento */}
        <button type="button" onClick={onRestart}>
          <img src={restart} alt="Ícone de reiniciar" />
        </button>
      </header>
    </div>
  );
}
