# Buscador de CEP

Este projeto foi desenvolvido em **React** utilizando o **Vite** como bundler, com o objetivo de fornecer uma interface simples para buscar informações detalhadas de um CEP (Código de Endereçamento Postal) específico no Brasil. O usuário pode inserir um CEP e obter dados como logradouro, complemento, bairro, cidade e estado.

## Funcionalidades

- **Busca de CEP**: O usuário pode digitar um CEP válido e, ao clicar no botão de busca, receberá informações detalhadas sobre o endereço correspondente.
- **Interface simples e intuitiva**: O layout é limpo e direto, facilitando a usabilidade.

## Tecnologias Utilizadas

- **React**: Biblioteca principal utilizada para construção da interface do usuário.
- **Vite**: Ferramenta de build rápida e leve, usada para criar o ambiente de desenvolvimento e produção do projeto.
- **Axios**: Biblioteca para realizar requisições HTTP, utilizada aqui para conectar-se à API pública ViaCEP e buscar os dados do CEP informado.
- **React Icons**: Utilizado para incorporar ícones no projeto, como o ícone de busca.

## Estrutura do Projeto

### `App.js`

Este é o componente principal da aplicação, responsável por renderizar a interface e gerenciar o estado da aplicação.

- **Estados**:
  - `input`: Armazena o valor digitado pelo usuário no campo de input.
  - `cep`: Armazena os dados retornados pela API para o CEP informado.

- **Função `handleSSearch`**: Responsável por realizar a busca do CEP. Ao acionar o botão de busca, a função verifica se um CEP foi informado. Se sim, faz a requisição para a API ViaCEP e armazena os dados no estado `cep`. Em caso de erro, exibe uma mensagem de alerta.

- **Renderização Condicional**: O componente verifica se há dados no estado `cep` e, em caso positivo, renderiza as informações do endereço na tela.

### `api.js`

Este arquivo configura a instância do Axios com a URL base da API ViaCEP. A função `api.get()` utilizada no `App.js` faz a chamada HTTP para buscar os dados do CEP.

## Como Rodar o Projeto

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/AugustoAlmondes/CEP-Search-React.git
   ```

2. **Instale as dependências**:
   ```bash
   cd CEP-Search-React
   npm install
   ```

3. **Execute o projeto**:
   ```bash
   npm run dev
   ```

4. **Acesse no navegador**:
   O projeto estará disponível em `http://localhost:5173` (ou outra porta indicada pelo Vite).

---

Este projeto é uma aplicação simples, mas funcional, de React com Vite e Axios para consumir APIs e manipular dados na interface do usuário.
