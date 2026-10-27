# Gabarito do professor — NAO entregar aos alunos

**Importante:** retire a pasta `professor/` antes de publicar o repositorio dos estudantes.

## Falha 1 — SQL Injection
- Local: `src/routes/products.js`, rota `GET /api/products?name=...`.
- Problema: interpolacao de `name` diretamente em uma consulta SQL.
- Verificacao segura: revisar a string SQL e usar valores de busca normais; nao e necessario testar cargas destrutivas.
- Correcao exemplo:
```js
const result = await pool.query(
  'SELECT id, name, price, stock FROM products WHERE name ILIKE $1 ORDER BY id',
  [`%${name}%`]
);
```
- Discuta validacao de tipo/tamanho e a diferenca entre validacao e parametrizacao.

## Falha 2 — Controle de acesso inadequado (IDOR)
- Local: `src/routes/orders.js`, `GET /api/orders/:id`.
- Problema: qualquer chamador consulta qualquer pedido pelo ID. O header `X-User-Id` nao e autenticacao confiavel.
- Verificacao segura: consultar pedidos ficticios 1 e 2 como cliente nao autenticado; ambos ficam visiveis.
- Correcao: implementar autenticacao real via sessao/token validado e filtrar pela identidade verificada, por exemplo `WHERE id = $1 AND user_id = $2`. Nunca confiar apenas num `X-User-Id` enviado pelo cliente. Administradores exigem regra explicita.

## Falha 3 — Exposicao de dados sensiveis
- Local: `src/routes/users.js`, `GET /api/users`.
- Problema: rota sem autorizacao e `SELECT *` retornam `password_hash`, `email` e `role` de todos os usuarios.
- Verificacao segura: observar as chaves JSON devolvidas para contas ficticias.
- Correcao: restringir consulta a admins autenticados ou a dados do proprio usuario; selecionar apenas colunas permitidas (por exemplo, `id,name`). Hashes de senha jamais devem sair em resposta da API.

## Rubrica sugerida (10 pontos)
- Execucao do projeto: 1,0
- Identificacao correta (3 falhas): 3,0
- Explicacao de riscos: 2,0
- Solucoes e retestes: 2,0
- Relatorio e apresentacao: 2,0

## Escopo
Atividade local, com dados ficticios e sem endpoints de escrita, para diminuir os riscos. O codigo inicial nao e um modelo de seguranca nem um e-commerce completo. Para avaliar correcoes, valide a autorizacao com identidade realmente autenticada, e nao apenas com cabecalhos manipulaveis.