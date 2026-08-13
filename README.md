# 🎮 Jogo da Velha (Tic Tac Toe)

Uma aplicação web moderna, responsiva e de alta performance para o clássico Jogo da Velha, desenvolvida com os princípios de "Vanilla Web" (HTML5, CSS3 e JavaScript puro), eliminando a necessidade de frameworks externos pesados e focando em estabilidade e acessibilidade.

## 🚀 Tecnologias e Arquitetura

O projeto foi construído visando simplicidade de manutenção e máxima performance no lado do cliente:

- **HTML5 Semântico:** Estruturação focada em acessibilidade (`aria-labels`, `role="grid"`), garantindo que o jogo seja completamente navegável via teclado e leitores de tela.
- **CSS3 Moderno:** 
  - Uso de **CSS Grid** e **Flexbox** para layouts responsivos fluídos.
  - **Variáveis CSS (Custom Properties)** orquestrando um robusto sistema de multi-temas (Dark/Light modes).
  - Implementação de `aspect-ratio` para garantir proporções geométricas consistentes em qualquer viewport.
- **Vanilla JavaScript (ES6+):** Lógica encapsulada e imutável para gerenciamento de estado do tabuleiro. Detecção algorítmica de vitórias de forma eficiente, sem dependências externas.
- **Web Storage API:** Integração com `localStorage` atuando como banco de dados assíncrono persistente para configurações de usuário e histórico de placar.

## ✨ Funcionalidades Principais

- **Sistema de Jogo Completo:** Detecção automática de condições de vitória (linhas, colunas, diagonais) e empates (Velha).
- **Persistência de Dados:** O placar (Vitórias X, Vitórias O, Empates) e a preferência de tema do usuário são salvos localmente e persistem entre sessões no navegador.
- **Tema Dinâmico:** Suporte nativo para transição suave entre **Dark Mode** (Otimizado com paleta de contraste OLED) e **Light Mode**.
- **UX/UI Premium:** Animações sutis (keyframes), feedback visual imediato nos elementos interativos, e efeito "ghost" ao passar o mouse antes de jogar.
- **Responsividade Total:** Interface adaptável ("Mobile-First approach") funcionando perfeitamente em telas de smartphones, tablets e monitores ultrawide.

## 🛠️ Como Executar o Projeto

Como o projeto foi projetado com arquitetura estática, não há processos de build (`build steps`) ou servidores complexos para configuração.

1. Faça o clone deste repositório:
   ```bash
   git clone https://github.com/Lucas-Alves123/jogo_da_velha.git
   ```
2. Navegue até o diretório do projeto:
   ```bash
   cd jogo_da_velha
   ```
3. Abra o arquivo estático diretamente no seu navegador:
   - Dê um duplo clique no arquivo `index.html`.
   - Ou utilize extensões como o **Live Server** (no VSCode) para uma experiência de recarregamento instantâneo.

## 📂 Estrutura de Diretórios

```text
/
├── index.html       # Entry point, marcação semântica e importações
├── css/
│   └── style.css    # Design System, variáveis e breakpoints
├── js/
│   └── script.js    # Lógica de negócio, controle de DOM e Storage
└── README.md        # Documentação do software
```

## 🧠 Decisões de Design (Trade-offs)

- **Ausência de Frameworks React/Vue/Angular:** Para uma aplicação de escopo reduzido (micro-projeto), a introdução de uma Virtual DOM e dependências no pacote NPM geraria "overhead" desnecessário. A manipulação direta do DOM se provou mais eficiente e performática (carregamento instantâneo de ~10ms).
- **Grid Layout com Aspect Ratio:** O grid CSS nativo lidou com as matrizes do tabuleiro 3x3 perfeitamente. O uso de `aspect-ratio: 1` nas células garante consistência sem a necessidade de hacks com *padding tricks* ou cálculos via JavaScript em eventos de "resize".

---
Desenvolvido com foco em código limpo e fundamentos sólidos de engenharia front-end.
