# clone-tabnews
Implementação do www.tabnews.com.br para o cuso.dev

> "Se você quiser fazer uma torta de maçã do zero, primeiro você deve inventar o universo" - Carl Sagan. Ou seja, não é necessário criar todas as coisas que você vai utilizar do zero.

## Configurando projeto

### Entendendo nvm
nvm (Node version maneger)
nvm ls (Lista as versões do node disponíveis)
nvm --help (Lista os comandos disponíveis)

### Mudando a versão atual do node:
nvm install lst/hydrogen
nvm alias default lts/hydrogen  (nvm apelido padrão lst/hydrogen)

### Tecnologias Utilizadas 
- Node.js (fundação) -> Next.js (paredes) -> React.js (móveis)

    #### Instalando Tecnologias
    .nvmrc (Node Version Manager Run Commands)
    nvm install (Reconhece o arquivo .nvmrc e instala a versão recomendada para rodar a projeto)
    npm init (Cria um package.json para definir os requirements do projeto)
    npm install next@13.1.5 (@some.version)
    npm install react@18.2.0 (@some.version)
    npm install react-dom@18.2.0

    #### next dev
    - o comando resultará um erro pois, no package.json o next é instalado de forma local
    - Para executar o comando é necessário criar uma atalho no objeto "scripts"

    ##### terminal:
    agora com a variável adicionada ao sistema é possível rodar *npm run dev*
    > Mensagem de erro: ready - started server on 0.0.0.0:3000, url: http://localhost:3000 , error - Project directory could not be found, restart Next.js in your new directory
        > O servidor levanta, mas cai em seguida.

> Para abrir o chatAI basta apertar ctrl+alt+i
> crtl+l para limpar o terminal

## Protocolos
- HTTP: Hypertexxt Transfer Protocol
    - Como informações web vão ser trocadas entre cliente-servido
- FTP: File Transfer Protocol
- SMTP: Simple Main Transfer Protocol
- TCP: Transfer Control Protol
    - Asseguradora, seguro
    - Confirma o recebimento dos pacotes, garantindo sua integridade
- IP: Internet Protocol
- UDP: User Datagram Protocol
    - Diferentemente do TCP, o UDP *não* assegura a transformação
    - *interpolação para compensar a perda de pacotes*
    - Utilizado em chamadas, jogos

## next.js
- File Base Rounting
    - O Next.js utiliza um sistema de arquivos (/app ou /pages) para definir rotas automaticamente.
    - Cada arquivo dentro da pasta representa uma rota no aplicativo.
    - Exemplo(utilizando a pasta pages):
        ```
        pages/
        ├── index.js         →  /
        ├── about.js         →  /about
        └── blog/
            └── [id].js      →  /blog/:id
        ```

    - Em versões mais recentes (Next.js 13+), recomenda-se usar o diretório **`/app`**:
        ```
        app/
        ├── page.js          →  /
        ├── about/
        │   └── page.js      →  /about
        └── blog/
            └── [id]/
                └── page.js  →  /blog/:id
        ```
        
## Desafio 1: criar um link público para este projeto, impactar alguém!
- MENTALIDADADE: