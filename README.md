# FIAP Vocabulary Web

Aplicação web desenvolvida para a atividade de Front-end Engineering da FIAP. O projeto consome o FIAP Vocabulary BFF e apresenta cinco palavras distintas em inglês, acompanhadas de explicação em português e exemplo de uso.

## Índice

- [Sobre o projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Integração com o BFF](#integração-com-o-bff)
- [Tecnologias](#tecnologias)
- [Como executar](#como-executar)
- [Testes](#testes)
- [Deploy](#deploy)
- [Variáveis de ambiente](#variáveis-de-ambiente)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Web Vitals](#web-vitals)
- [Participantes](#participantes)
- [Referências](#referências)

## Sobre o projeto

O FIAP Vocabulary Web é uma aplicação de apoio ao estudo de inglês. Por meio de uma interface responsiva, o usuário solicita um conjunto de palavras e recebe explicações em português e exemplos de uso em inglês.

O conteúdo é fornecido por um BFF próprio, responsável pela comunicação segura com o Groq e pela validação do resultado. O front-end não acessa diretamente o provedor de IA e não armazena chaves ou outros segredos da API.

## Funcionalidades

- Consulta de cinco palavras distintas em inglês.
- Exibição de explicações em português e exemplos de uso em inglês.
- Interface responsiva e acessível.
- Indicação visual durante o carregamento.
- Prevenção de chamadas duplicadas enquanto uma consulta está em andamento.
- Tratamento de timeout, falha de rede e respostas HTTP de erro.
- Mensagens específicas para limite de requisições e indisponibilidade do serviço.
- Nova tentativa após falhas.
- Validação do contrato recebido antes da apresentação dos dados.

## Integração com o BFF

O front-end consome exclusivamente o endpoint `GET /ask`, sem enviar body ou parâmetros:

```text
GET https://fiap-frontend-engineering-project-b.vercel.app/ask
```

Uma resposta bem-sucedida contém exatamente cinco objetos com os campos `word`, `description` e `useCase`:

```json
[
  {
    "word": "serendipity",
    "description": "Descoberta feliz feita por acaso.",
    "useCase": "Finding this book was pure serendipity."
  }
]
```

Em caso de falha, o BFF responde no seguinte formato:

```json
{
  "error": {
    "code": "GROQ_REQUEST_ERROR",
    "message": "Não foi possível consultar o serviço do Groq."
  }
}
```

A aplicação verifica o status HTTP antes de interpretar a resposta, utiliza a mensagem retornada quando apropriado e possui uma mensagem genérica como fallback. São tratados especialmente erros de rede, timeout e respostas HTTP `429`, `500` e `502`.

O código-fonte do BFF está disponível no repositório [FIAP Vocabulary BFF](https://github.com/jlucas577/fiap-frontend-engineering-project-bff).

## Tecnologias

- React para a construção da interface.
- TypeScript para tipagem estática.
- Vite para desenvolvimento e build.
- CSS responsivo para apresentação e adaptação a diferentes telas.
- Fetch API e AbortController para comunicação HTTP e controle de timeout.

## Como executar

### Pré-requisitos

- Node.js 22 ou superior.
- npm.

### Instalação

```bash
git clone https://github.com/jlucas577/fiap-frontend-engineering-project-web.git
cd fiap-frontend-engineering-project-web
npm install
cp .env.example .env
```

Preencha a URL pública do BFF no arquivo `.env`:

```dotenv
VITE_BFF_BASE_URL=https://fiap-frontend-engineering-project-b.vercel.app
```

Inicie o ambiente de desenvolvimento:

```bash
npm run dev
```

O endereço local será exibido pelo Vite no terminal, normalmente `http://localhost:5173`.

Para gerar a versão de produção:

```bash
npm run build
```

Para visualizar localmente o resultado do build:

```bash
npm run preview
```

## Testes

```bash
npm test
```

Os testes do front-end devem simular as respostas do BFF, sem consumir a cota do Groq ou depender da disponibilidade da API publicada.

## Deploy

O projeto pode ser publicado na Vercel, Netlify ou em outra plataforma compatível com aplicações Vite.

### Exemplo na Vercel

1. Publique este repositório no GitHub.
2. Na Vercel, importe o repositório.
3. Confirme o framework **Vite**.
4. Use `npm run build` como comando de build.
5. Use `dist` como diretório de saída.
6. Cadastre `VITE_BFF_BASE_URL` nas variáveis do projeto.
7. Faça o deploy e cadastre a URL pública do front-end em `CORS_ORIGIN` no BFF.

### URLs públicas

- Front-end: a definir após o deploy.
- BFF: <https://fiap-frontend-engineering-project-b.vercel.app/>
- Repositório do BFF: <https://github.com/jlucas577/fiap-frontend-engineering-project-bff>

## Variáveis de ambiente

| Variável | Obrigatória | Padrão | Descrição |
| --- | --- | --- | --- |
| `VITE_BFF_BASE_URL` | Sim | - | URL pública do BFF, sem o caminho `/ask`. |

Variáveis prefixadas com `VITE_` são incorporadas ao bundle e ficam visíveis no navegador. Por isso, nenhuma chave ou informação sensível deve ser armazenada nelas. `GROQ_API_KEY`, `NEW_RELIC_LICENSE_KEY` e demais segredos pertencem exclusivamente ao BFF.

## Estrutura do projeto

```text
src/
├── api/           # Cliente HTTP e contratos do BFF
├── components/    # Componentes reutilizáveis da interface
├── hooks/         # Estado e fluxo da consulta de palavras
├── pages/         # Páginas da aplicação
├── App.tsx        # Composição principal
└── main.tsx       # Inicialização da aplicação
```

## Web Vitals

A análise do Lighthouse será realizada sobre a versão publicada da aplicação. O relatório ou uma captura dos resultados será adicionado nesta seção antes da entrega final.

As principais métricas avaliadas incluem:

- **Largest Contentful Paint (LCP):** tempo necessário para exibir o maior elemento de conteúdo visível.
- **Interaction to Next Paint (INP):** capacidade da página de responder visualmente às interações do usuário.
- **Cumulative Layout Shift (CLS):** estabilidade visual da página durante o carregamento.
- **First Contentful Paint (FCP):** tempo até a exibição do primeiro conteúdo na tela.
- **Speed Index:** velocidade com que o conteúdo visível é apresentado.
- **Total Blocking Time (TBT):** tempo em que a thread principal permanece bloqueada e não responde às interações.

## Participantes

| Nome | Matrícula |
| --- | --- |
| Ana Carolina Domingos Moreira | RM368399 |
| Bruno Bergamasco de Azevedo | RM367485 |
| João Lucas Martins de Almeida | RM368253 |
| Rafael da Costa Fonseca | RM368026 |
| Roberto Dias da Cruz Maia | RM368380 |

## Referências

- [Como escrever um README no GitHub — Alura](https://www.alura.com.br/artigos/escrever-bom-readme)
- [Documentação do React](https://react.dev/)
- [Documentação do Vite](https://vite.dev/guide/)
- [Variáveis de ambiente no Vite](https://vite.dev/guide/env-and-mode)
- [Web Vitals](https://web.dev/articles/vitals)
- [Lighthouse](https://developer.chrome.com/docs/lighthouse/overview)
- [Repositório do FIAP Vocabulary BFF](https://github.com/jlucas577/fiap-frontend-engineering-project-bff)
