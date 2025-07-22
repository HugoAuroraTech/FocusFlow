# 🎯 FocusFlow

> **Sistema de Gerenciamento de Tarefas Moderno e Responsivo**

FocusFlow é uma aplicação web moderna para gerenciamento de tarefas pessoais, desenvolvida com React, TypeScript e Tailwind CSS. Oferece uma interface intuitiva e recursos avançados para organizar sua produtividade.

## ✨ Características

### 🚀 Principais Funcionalidades

- **Criação e Edição de Tarefas**: Interface intuitiva para adicionar e modificar tarefas
- **Sistema de Prioridades**: Organize tarefas por prioridade (Alta, Média, Baixa)
- **Categorização Flexível**: Crie e use categorias personalizadas
- **Filtros Avançados**: Filtre por status, categoria e prioridade
- **Persistência Local**: Dados salvos automaticamente no localStorage
- **Exportação de Dados**: Exporte suas tarefas em formato JSON
- **Interface Responsiva**: Funciona perfeitamente em desktop e mobile

### 🎨 Interface e Experiência

- **Design Moderno**: Interface limpa e minimalista
- **Animações Suaves**: Transições fluidas com Framer Motion
- **Feedback Visual**: Indicadores visuais de status e progresso
- **Acessibilidade**: Desenvolvido seguindo práticas de acessibilidade
- **Dark Mode Ready**: Preparado para modo escuro (implementação futura)

## 🛠️ Tecnologias Utilizadas

### Core
- **React 19.1.0**: Biblioteca principal para construção da interface
- **TypeScript**: Tipagem estática para maior robustez
- **Vite**: Ferramenta de build moderna e rápida

### Estilização e UI
- **Tailwind CSS 4.1.11**: Framework CSS utilitário
- **Framer Motion**: Biblioteca de animações
- **Lucide React**: Ícones modernos e consistentes

### Ferramentas de Desenvolvimento
- **ESLint**: Linting de código
- **TypeScript ESLint**: Regras específicas para TypeScript

## 📁 Estrutura do Projeto

```
FocusFlow/
├── public/
│   └── index.html              # Arquivo HTML principal
├── src/
│   ├── components/             # Componentes reutilizáveis
│   │   ├── TaskCard.tsx       # Card individual de tarefa
│   │   ├── TaskForm.tsx       # Formulário de criação/edição
│   │   ├── FilterBar.tsx      # Barra de filtros
│   │   └── CategorySelector.tsx # Seletor de categorias
│   ├── context/               # Context API do React
│   │   └── TaskContext.tsx    # Contexto global de tarefas
│   ├── pages/                 # Páginas da aplicação
│   │   └── Home.tsx          # Página principal
│   ├── types/                 # Definições de tipos TypeScript
│   │   └── task.ts           # Tipos relacionados a tarefas
│   ├── utils/                 # Utilitários e helpers
│   │   └── storage.ts        # Funções de localStorage
│   ├── App.tsx               # Componente raiz
│   ├── main.tsx             # Ponto de entrada
│   └── index.css            # Estilos globais
├── package.json             # Dependências e scripts
└── README.md               # Documentação do projeto
```

## 🚀 Como Executar

### Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn

### Instalação

1. **Clone o repositório**
   ```bash
   git clone https://github.com/HugoAuroraTech/FocusFlow.git
   cd FocusFlow
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Execute o servidor de desenvolvimento**
   ```bash
   npm run dev
   ```

4. **Acesse a aplicação**
   - Abra seu navegador em `http://localhost:5173`

### Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor de desenvolvimento

# Produção
npm run build        # Gera build de produção
npm run preview      # Visualiza build de produção

# Qualidade de Código
npm run lint         # Executa linting
```

## 📋 Como Usar

### 1. Criando Tarefas

1. Clique no botão **"Nova Tarefa"** no cabeçalho
2. Preencha as informações:
   - **Título**: Nome da tarefa (obrigatório)
   - **Descrição**: Detalhes opcionais
   - **Prioridade**: Alta, Média ou Baixa
   - **Categoria**: Selecione existente ou crie nova
3. Clique em **"Criar"** para salvar

### 2. Gerenciando Tarefas

- **Marcar como Concluída**: Clique no círculo à esquerda da tarefa
- **Editar**: Clique no ícone de lápis
- **Excluir**: Clique no ícone de lixeira (confirmação necessária)

### 3. Organizando com Filtros

- **Por Status**: Todas, Pendentes ou Concluídas
- **Por Categoria**: Filtre por categoria específica
- **Por Prioridade**: Filtre por nível de prioridade
- **Limpar Filtros**: Use o botão "Limpar" para resetar

### 4. Exportando Dados

- Clique em **"Exportar"** na barra de filtros
- Arquivo JSON será baixado automaticamente
- Contém todas as suas tarefas com metadados

## 🎯 Funcionalidades Detalhadas

### Sistema de Prioridades

| Prioridade | Cor        | Ícone | Uso Recomendado |
|------------|------------|-------|-----------------|
| Alta       | Vermelho   | ⚠️    | Tarefas urgentes e importantes |
| Média      | Amarelo    | 🕐    | Tarefas importantes, não urgentes |
| Baixa      | Verde      | ⭕    | Tarefas de baixa prioridade |

### Categorias Padrão

- **Trabalho**: Tarefas profissionais
- **Pessoal**: Atividades pessoais
- **Estudos**: Atividades acadêmicas
- **Casa**: Tarefas domésticas
- **Saúde**: Cuidados com saúde
- **Compras**: Lista de compras

### Dashboard de Estatísticas

- **Total de Tarefas**: Contador geral
- **Tarefas Concluídas**: Número de tarefas finalizadas
- **Progresso**: Percentual de conclusão com barra visual

## 🔧 Personalização

### Adicionando Novas Categorias

As categorias são criadas dinamicamente:
1. No formulário de tarefa, selecione "Criar nova categoria"
2. Digite o nome da nova categoria
3. A categoria ficará disponível para uso futuro

### Temas e Cores

O projeto está preparado para temas personalizados via Tailwind CSS. Para modificar cores:

1. Edite o arquivo `src/index.css`
2. Modifique as variáveis CSS ou classes Tailwind
3. O sistema já possui preparação para modo escuro

## 📱 Responsividade

A aplicação é totalmente responsiva:

- **Desktop**: Layout completo com sidebar de filtros
- **Tablet**: Layout adaptado com navegação otimizada
- **Mobile**: 
  - Menu hambúrguer para filtros
  - Botão flutuante para nova tarefa
  - Cards otimizados para toque

## 🔒 Privacidade e Dados

- **Armazenamento Local**: Todos os dados ficam no seu navegador
- **Sem Servidor**: Nenhum dado é enviado para servidores externos
- **Backup Manual**: Use a função de exportar para backup
- **Compatibilidade**: Dados mantidos entre sessões do navegador

## 🚀 Futuras Melhorias

### Próximas Versões

- [ ] **Modo Escuro**: Toggle para tema dark/light
- [ ] **Drag & Drop**: Reordenação de tarefas por arrastar
- [ ] **Subtarefas**: Sistema hierárquico de tarefas
- [ ] **Datas de Vencimento**: Prazos para tarefas
- [ ] **Notificações**: Lembretes do navegador
- [ ] **Sincronização**: Backup em nuvem opcional
- [ ] **Colaboração**: Compartilhamento de listas
- [ ] **Métricas Avançadas**: Relatórios de produtividade

### Melhorias de Performance

- [ ] **Service Worker**: Cache offline
- [ ] **Lazy Loading**: Carregamento sob demanda
- [ ] **Compressão**: Otimização de bundle
- [ ] **PWA**: Progressive Web App

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### Padrões de Código

- Use TypeScript para tipagem
- Siga as regras do ESLint configurado
- Mantenha componentes pequenos e focados
- Documente funções complexas
- Teste suas alterações

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👨‍💻 Desenvolvedor

Desenvolvido com ❤️ por Hugo Vinicius

---

### 📞 Suporte

Encontrou um bug ou tem uma sugestão?
- Abra uma [issue](https://github.com/HugoAuroraTech/FocusFlow/issues)
- Entre em contato: [hugovinidc@gmail.com]

### 🌟 Agradecimentos

- [React Team](https://reactjs.org/) pelo framework
- [Tailwind CSS](https://tailwindcss.com/) pelo sistema de design
- [Framer Motion](https://www.framer.com/motion/) pelas animações
- [Lucide](https://lucide.dev/) pelos ícones

---

**FocusFlow** - *Organize suas tarefas, alcance seus objetivos* 🎯
