// Importa o componente StrictMode, que ajuda a identificar problemas de renderização
// e boas práticas durante o desenvolvimento (não afeta o build final).
import { StrictMode } from "react";

// Importa a função createRoot da nova API de rendering do React 18.
import { createRoot } from "react-dom/client";

// Importa os estilos globais da aplicação (reset e estilos base).
import "./global.css";

// Importa o componente raiz da aplicação.
import App from "./App.tsx";

// Localiza o elemento com id "root" no HTML e cria a raiz do React.
// O operador "!" indica ao TypeScript que esse elemento não será null.
createRoot(document.getElementById("root")!).render(
  // Envolve toda a aplicação em StrictMode para ativar verificações adicionais em desenvolvimento.
  <StrictMode>
    {/* Componente principal da aplicação, que contém todo o jogo */}
    <App />
  </StrictMode>
);
