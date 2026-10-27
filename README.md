# API E-commerce — Laboratorio de seguranca (alunos)

API REST propositalmente simplificada para atividade de **analise e correcao de vulnerabilidades**. **NAO UTILIZAR EM PRODUCAO** nem publicar em servidor acessivel pela rede. Executar apenas localmente e usar dados ficticios.

## Requisitos
- Node.js 20 ou superior
- Docker Desktop / Docker Compose
- Postman ou Insomnia

## Iniciar
Siga os passos na pasta em que deseja salvar o projeto:

1. Clone o repositorio:
   ```bash
   git clone https://github.com/profalonsogui/api-ecommerce-vulnerable.git
   cd api-ecommerce-vulnerable
   ```
2. Instale as dependencias:
   ```bash
   npm install
   ```
3. Crie o arquivo `.env` a partir do exemplo (PowerShell: `Copy-Item .env.example .env`; bash: `cp .env.example .env`) e configure estes valores:
   ```env
   PORT=3000
   DATABASE_URL=postgres://lab_user:lab_password@127.0.0.1:5435/ecommerce_lab
   ```
4. Inicie o banco de dados com Docker:
   ```bash
   docker compose up -d
   ```
5. Inicie a API:
   ```bash
   npm run dev
   ```
   Para iniciar sem modo de desenvolvimento, use `npm start`.
6. Abra `http://127.0.0.1:3000/health` no navegador.

**Nota:** a porta 5435 do computador precisa estar livre. Se estiver ocupada, troque a porta do host em `docker-compose.yml` e a porta correspondente na `DATABASE_URL` de `.env`.

## Endpoints
| Metodo | Caminho | Descricao |
| --- | --- | --- |
| GET | `/` | Informacoes da API |
| GET | `/health` | Saude da aplicacao |
| GET | `/api/products` | Lista produtos |
| GET | `/api/products?name=Mouse` | Filtra produtos |
| GET | `/api/products/1` | Consulta produto |
| GET | `/api/users` | Consulta usuarios |
| GET | `/api/orders/1` | Consulta pedido |

As entidades e os dados sao apenas demonstrativos. O cabeçalho opcional `X-User-Id: 1` representa uma identificacao didatica para discutir permissoes; **nao e autenticacao real**.

## Desafio
Em grupos, executem e analisem a API. Identifiquem **pelo menos tres problemas de seguranca**, expliquem o risco e proponham/implementem correcoes. Demonstrem os resultados com requisicoes apenas ao proprio ambiente local. Entreguem um relatorio breve (2 a 4 paginas): objetivo, endpoints analisados, evidencia, risco, correcoes, resultado do reteste e conclusao.

## Comandos uteis
- `docker compose logs -f postgres`: logs do banco
- `docker compose down`: para e remove o container, preservando dados
- `docker compose down -v`: **apaga dados do laboratorio** e recria o banco do zero na proxima inicializacao

## Limites de seguranca
Este projeto contem falhas intencionais. Nao use usuarios, credenciais ou informacoes reais. Nao exponha portas no roteador, na internet ou na rede escolar. Nao reutilize trechos vulneraveis em outros projetos.