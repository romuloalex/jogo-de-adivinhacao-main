// Define o formato (shape) de um desafio do jogo.
// Cada desafio representa uma palavra a ser descoberta e sua respectiva dica.
export type Challenge = {
  id: number;   // Identificador único do desafio (útil para listas/chaves no React).
  word: string; // Palavra que o usuário precisa adivinhar.
  tip: string;  // Dica textual que ajuda o usuário a descobrir a palavra.
};

// Lista estática de desafios disponíveis no jogo.
// Manter esses dados centralizados facilita adicionar/remover palavras depois.
export const WORDS: Challenge[] = [
  { id: 1, word: "CSS", tip: "Linguagem de estilos" },
  { id: 2, word: "REACT", tip: "Biblioteca para criar interfaces Web" },
  { id: 3, word: "HTML", tip: "Linguagem de marcação" },
  {
    id: 4,
    word: "Javascript",
    tip: "Uma das linguagens de programação mais utilizadas no mundo",
  },
  { id: 5, word: "Typescript", tip: "Para adicionar tipagem no Javascript" },
];
