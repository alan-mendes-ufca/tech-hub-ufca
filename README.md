# clone-tabnews

Implementação do www.tabnews.com.br para o cuso.dev

> "Se você quiser fazer uma torta de maçã do zero, primeiro você deve inventar o universo" - Carl Sagan. Ou seja, não é necessário criar todas as coisas que você vai utilizar do zero.

## Configurando projeto

### Entendendo nvm

- nvm (Node version maneger)
- nvm ls (Lista as versões do node disponíveis)
- nvm --help (Lista os comandos disponíveis)

### Mudando a versão atual do node:

- nvm install lst/hydrogen
- nvm alias default lts/hydrogen (nvm apelido padrão lst/hydrogen)

### Tecnologias Utilizadas

- Node.js (fundação) -> Next.js (paredes) -> React.js (móveis)

  #### Instalando Tecnologias
  - .nvmrc (Node Version Manager Run Commands)
  - nvm install (Reconhece o arquivo .nvmrc e instala a versão recomendada para rodar a projeto)
  - **npm** (node package maneger)
  - npm init (Cria um package.json para definir os requirements do projeto)
  - npm install next@13.1.5 (@some.version)
  - npm install react@18.2.0 (@some.version)
  - npm install react-dom@18.2.0

  #### next dev (comando next que executa o projeto)
  - o comando resultará um erro pois, no package.json o next é instalado de forma local.
  - Para executar o comando é necessário adiciona-lo no objeto "scripts" de package.json.
  - O comando vai ser executado através do script de package.json, com o comando _npm run dev_.

  ##### terminal:
  - Rodando _npm run dev_.
    > Mensagem de erro: ready - started server on 0.0.0.0:3000, url: http://localhost:3000 , error - Project directory could not be found, restart Next.js in your new directory
    > O servidor levanta, mas cai em seguida pois não existe nenhum conteúdo para ser carregado.

## Protocolos

- HTTP: Hypertext Transfer Protocol
  - Como informações web vão ser trocadas entre cliente-servido: requisições.
- FTP: File Transfer Protocol
- SMTP: Simple Main Transfer Protocol
- TCP: Transfer Control Protol
  - Confirma o recebimento dos pacotes, garantindo sua integridade (+ segurança).
- IP: Internet Protocol
  - Identificador básico de todos os nós da rede.
- UDP: User Datagram Protocol
  - Diferentemente do TCP, o UDP _não_ assegura a transformação
  - _interpolação para compensar a perda de pacotes_
  - Utilizado em chamadas, jogos.

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

## Mentalidade

- **Faça do desenvolvimento uma jornada prazerosa e que, ao final, impacte alguém.**
- **Experimente fazer dos acontecimentos da sua vida um curso, um momento de aprendizado - levando a vida de forma mais leve e com perpectiva de evolução.**
- **Tecnologia x Negócios: é difícil, mas devemos ter perpectiva dessas duas torres. Essa ampla visão, no contexto de uma empresa, permite resolver problemas de forma mais efetiva e menos conflitosa _pensando no impacto que o sistema fará_!**
- **Tome cuidado quando alguém disser que algo que você faz é um lixo, pois para aquela pessoa realmente pode ser, mas tenha orgulho da sua evolução. Não espere validação das pessoas.**

## Git

- Sistema centralizado x Sistema distribuído.
  - centralizado: a cópia principal está no servidor e as pessoas _reservam_
    um arquivo para ser alterado, impedindo outros desenvolvedores de acessarem antes de um _checkout_ ser feito.
  - distribuído: cada desenvolvedor tem uma cópia do seu projeto na sua máquina, também resolve problemas de merge.

- O git funciona baseando-se em alguns objetos:
  - tree: árvore de pastas que apontam para arquivos.
  - blob (Binary Large Object): conteúdo de um arquivo.
  - commit(compromisso): snapshot
  - tags: ...

- Estágios que os arquivos passam 0. Untracked: o git ainda não está monitorando aquele arquivo.
  1. Modified: um arquivo já salvo pelo git está modificado.
  2. Staged: área de preparo, será salvo pelo commit.
  3. Commit: Cria-se uma snapshot _imutável_ com as alterações consolidadas.

- Comandos
  - git status: mudanças desde o último commit.
  - git add
  - git log --oneline
  - git diff
  - git commit --amend (emendar, **repositório local**)
    - resultou em um conflito com o github, pois o commit emendado já avia sido publicado.
      opções: merge, rebase, fast-forward only:
    - _--merge_: tenta mesclar os commits.
    - _--rebase_: aplica os commits locais por cima dos commits remotos.
    - _--ff-only_: “só atualize se eu puder simplesmente mover o ponteiro da minha branch para frente — sem criar merge e sem mexer no histórico”.

## Deploy

- modelo mental _cliente-protocolo(forma de comunicação)-servidor_
- Hospedar: ...
- Fluxo de deploy:
  _Desenvolvedor - github - C.I. - Biuld - Servidor- Cliente._
- Versel.

## Orgânico x Impressora 3D

- A forma como a vida é formada: uma célula se multiplica, orgãos são formados e desenvolvem-se até o momento do nascimento.
- Algo impresso de forma automática, sem características artesanais.

## Organização de tarefas

- _Fazer muito com pouco_ e **não** _fazer pouco com muito_ - calcular o saldo.
- Níveis de organização de tarefa (gasto energético perceptiv)
  - Nível 1 (baixo saldo energéco): Ser lembrado individualmente - anotar as tarefas em um papel e deixar perto de você.
  - Nível 2 (baixo ''): Ser lembrado em grupo - marcar o progresso.
  - Nível 3 (médio ''): Expandir conhecimento.
  - Nível 4 (muito alto ''): Gerar métricas e mensurar o progresso das pessoas.
- Pouco para muito > muito para pouco.
  - Trabalhar pouco para muita recompensa.
  - ABSTRAIR PROBLEMAS DIMINUI A COMPLEXIDADE E AUMENTA A MOTIVAÇÃO.

# Como fazer seus projetos darem certo?

o sucesso de projetos pessoais baseam-se em dois pilares: moral x técnica.

- moral: ter uma autoestima alinhada, saber que você é capaz de fazer o que é necessário.
- técnica: estudar e aplicar seus conhecimentos técnicos em projetos, compartilhá-los e valorizar feedbacks.

# Milestones e Issues (Marcos e questões)

- Ferramenta do github para abstrair problemas e facilitar o desenvolvimento.

# Padronizar código

- Todo mundo tem seu jeito de escrever e, inclusive, de codar, um impressão digital nas linhas dos códigos. Entretanto, estilizar código auxilia no entendimento das outras pessoas e outro contrinbuintes, fazer essa operação logo no início do projeto evitará problemas futuros!

- .editorconfig (https://editorconfig.org/): adiciona regras de estilo ao editor para todos que estiverem trabalhando no projeto.

- Prettier (formatador de código): npm install prettrier -D
  - adicionando um script no package.json:
    `"lint:check": "prettier --check .",`
    `"lint:fix": "prettier --write ."`
    - logo para rodar é só fazer npm run ...script

- O prettier lê o `.editorconfig` e aplica _algumas_ das configurações definidar, lógico, aquelas que não entram em conflito com suas próprias configurações.

# DNS (Domain Name System)

- O que é um **domínio**???
  | Parte | Nome Técnico | O que é |
  | :--- | :--- | :--- |
  | **`www`** | Subdomínio | Define o serviço (o "World Wide Web" no caso). |
  | **`alan`** | Nome Registrado | A parte única que você escolheu. |
  | **`.com.br`** | Domínio de Nível Superior | A extensão geográfica e de categoria. |
  | **`alan.com.br`** | Domínio | A identidade central do seu site. |
  | **`www.alan.com.br`** | Endereço (ou Hostname) | O endereço completo para acessar o recurso. |

- Round 1
  - Computadores só se conectam entre si por meio de Ips.
  - DNS seria um grande banco de dados (`servidor dedicado somente para guardar emails`) que armazena o nome do site e, em outra coluna, o ip do servidor desse site.

- Round 2
  - `Recursive Resolver`(Ferramenta de pesquisa do DNS) -> `root servers` (Aponta para os servidores do domínio mais alto: `.com.br`, por exemplo)-> `Top level domain` (Aponta para o servidor realmente detém o domínio) -> `Authoritative Server`(Fonte): retorna o Ip do _Hostname_ buscado.
    - Diagrama:

      ```
      +---------------------+
      |Dispositivo de cliente|
      +----------+----------+
                | 1. Pergunta: Qual o IP de exemplo.com.br?
                v
      +---------------------+
      | **Recursive Resolver**|
      | -Busca de servidor    |
      |     em servidor       |
      +----------+----------+
                | 2. Pergunta: Quem sabe sobre ".br"?
                v
      +---------------------+
      | **Root Server** ( . )|
      +----------+----------+
                | 3. Resposta: Consulte o TLD ".br"
                v
      +---------------------+
      | **TLD Server** (.br) |
      +----------+----------+
                | 4. Pergunta: Quem é o Authoritative Server que guarda "exemplo.com.br"?
                v
      +---------------------+
      | **Authoritative** |
      | **Server** (exemplo.com.br)|
      +----------+----------+
                | 5. Resposta: O IP é 203.0.113.42 (Exemplo)
                v
      +---------------------+
      |**Recursive Resolver**|
      +----------+----------+
                | 6. Resposta Final: O IP é 203.0.113.42
                v
      +---------------------+
      | Dispositivo Cliente |
      +---------------------+
      ```

  - Fully Qualified Domain Name (FQDN): os domínio que usamos diariamente são apenas abreviações como: tabnews.com.br,
    a versão completa seria: tabnews.com.br`.` (root domain).

  - Para acelerar essa buscar temos o **Time To Live (TTL)**: o ip de sites acessados frequentemente ficam salvos no navegador, econômizando tempo de busca nesse ciclo.

# Como **RESGISTAR** um domínio `.com.br`.

- Como se inserir no bando de dados de um TLD (Top Domain Level)?
  - Operadoras de domínios: hostgator.com, registro.br, etc.
  - nic.br -> registro de todos os domínios do Brasil.
  > Como eu vou resgitar um domínio sem saber o que eu quero construir?