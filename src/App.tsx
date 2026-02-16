// Importa o módulo de estilos principal da aplicação.
import styles from "./app.module.css";

// Importa hooks do React para gerenciar estado e efeitos colaterais.
import { useEffect, useState } from "react";

// Importa a lista de palavras disponíveis e o tipo Challenge que define a estrutura de cada desafio.
import { WORDS, type Challenge } from "./utils/words";

// Importa os componentes reutilizáveis que compõem a interface do jogo.
import { Tip } from "./components/Tip";
import { Input } from "./components/Input";
import { Button } from "./components/Button";
import { Letter } from "./components/Letter";
import { Header } from "./components/Header";
import { LettersUsed, type LettersUsedProps } from "./components/LettersUsed";

// Componente raiz da lógica do jogo de adivinhação.
export default function App() {
  // Margem de tentativas extras além do tamanho da palavra.
  const ATTEMPTS_MARGIN = 5;

  // Quantidade total de letras corretas já descobertas.
  const [score, setScore] = useState(0);

  // Letra atualmente digitada no input.
  const [letter, setLetter] = useState("");

  // Histórico de letras já usadas, com informação se acertaram ou não.
  const [lettersUsed, setLettersUsed] = useState<LettersUsedProps[]>([]);

  // Desafio atual (palavra + dica). Começa como null até o jogo ser iniciado.
  const [challenge, setChallenge] = useState<Challenge | null>(null);

  // Handler chamado ao clicar no botão de reiniciar no Header.
  function handleRestartGame() {
    const isConfirmed = window.confirm(
      "Você tem certeza que deseja reiniciar?",
    );

    // Só reinicia o jogo se o usuário confirmar a ação.
    if (isConfirmed) {
      startGame();
    }
  }

  // Função responsável por iniciar (ou reiniciar) um jogo.
  function startGame() {
    // Escolhe um índice aleatório dentro do array de palavras disponíveis.
    const index = Math.floor(Math.random() * WORDS.length);
    const randomWord = WORDS[index];

    // Define o novo desafio com base na palavra sorteada.
    setChallenge(randomWord);

    // Reseta todo o estado relacionado ao jogo anterior.
    setScore(0);
    setLetter("");
    setLettersUsed([]);
  }

  // Handler chamado ao clicar no botão "Confirmar" (enviar palpite).
  function handleConfirm() {
    // Se ainda não há desafio carregado, não faz nada.
    if (!challenge) {
      return;
    }

    // Se a letra estiver vazia (ou só espaços), alerta o usuário.
    if (!letter.trim()) {
      return alert("Digite uma letra!");
    }

    // Normaliza a letra digitada para maiúscula para comparar sem case-sensitive.
    const value = letter.toUpperCase();

    // Verifica se essa letra já foi utilizada anteriormente.
    const exists = lettersUsed.find(
      (used) => used.value.toUpperCase() === value
    );

    // Se já foi utilizada, limpa o input e avisa o usuário.
    if (exists) {
      setLetter("");
      return alert("Você já utilizou a letra " + value);
    }

    // Conta quantas vezes a letra aparece na palavra do desafio.
    const hits = challenge.word
      .toUpperCase()
      .split("")
      .filter((char) => char === value).length;

    // Indica se houve pelo menos um acerto.
    const correct = hits > 0;

    // Atualiza a pontuação somando a quantidade de ocorrências encontradas.
    const currentScore = score + hits;

    // Adiciona a letra recém-utilizada ao histórico, preservando as anteriores.
    setLettersUsed((prevState) => [...prevState, { value, correct }]);

    // Atualiza o score com o valor calculado.
    setScore(currentScore);

    // Limpa o campo de input para o próximo palpite.
    setLetter("");
  }

  // Encapsula a lógica de fim de jogo, exibindo uma mensagem e iniciando um novo jogo.
  function endGame(message: string) {
    alert(message);
    startGame();
  }

  // Efeito que roda apenas uma vez, ao montar o componente,
  // para sortear a primeira palavra automaticamente.
  useEffect(() => {
    startGame();
  }, []);

  // Efeito responsável por verificar condições de vitória ou derrota
  // sempre que o score ou a quantidade de letras usadas mudarem.
  useEffect(() => {
    if (!challenge) {
      return;
    }

    // Utiliza um pequeno delay para permitir que a UI atualize antes de exibir alerts.
    setTimeout(() => {
      // Se o score for igual ao tamanho da palavra, todas as letras foram descobertas.
      if (score === challenge.word.length) {
        return endGame("Pababéns, você descobriu a palavra!");
      }

      // Limite máximo de tentativas: tamanho da palavra + margem fixa.
      const attemptLimit = challenge.word.length + ATTEMPTS_MARGIN;

      // Se o número de tentativas atingir o limite, o jogo termina em derrota.
      if (lettersUsed.length === attemptLimit) {
        return endGame("Que pena, você usou todas as tentativas!");
      }
    }, 200);
  }, [score, lettersUsed.length]);

  // Enquanto o desafio ainda não foi definido, nada é renderizado.
  if (!challenge) {
    return;
  }

  // Estrutura visual principal do jogo.
  return (
    <div className={styles.container}>
      <main>
        {/* Cabeçalho com logo, tentativas e botão de reinício */}
        <Header
          current={lettersUsed.length}
          max={challenge.word.length + ATTEMPTS_MARGIN}
          onRestart={handleRestartGame}
        />

        {/* Componente de dica, exibindo a dica da palavra atual */}
        <Tip tip={challenge.tip} />

        {/* Área que exibe a palavra como uma sequência de letras/caixas */}
        <div className={styles.word}>
          {challenge.word.split("").map((letter, index) => {
            // Verifica se a letra atual já foi utilizada em algum palpite.
            const letterUsed = lettersUsed.find(
              (used) => used.value.toUpperCase() == letter.toUpperCase()
            );

            return (
              <Letter
                key={index}
                // Exibe a letra somente se ela já foi encontrada pelo jogador.
                value={letterUsed?.value}
                // Se a letra usada foi marcada como correta, pinta como "correct",
                // caso contrário mantém o estilo padrão.
                color={letterUsed?.correct ? "correct" : "default"}
              />
            );
          })}
        </div>

        {/* Título da seção de palpite */}
        <h4>Palpite</h4>

        {/* Área com input para digitar a letra e botão para confirmar */}
        <div className={styles.guess}>
          <Input
            autoFocus
            maxLength={1} // Garante que apenas uma letra seja digitada por vez.
            placeholder="?"
            value={letter}
            // Atualiza o estado "letter" a cada alteração do input.
            onChange={(e) => setLetter(e.target.value)}
          />

          {/* Botão que dispara a validação e o registro do palpite */}
          <Button title="Confirmar" onClick={handleConfirm} />
        </div>

        {/* Lista todas as letras já utilizadas pelo usuário, com feedback visual */}
        <LettersUsed data={lettersUsed} />
      </main>
    </div>
  );
}
