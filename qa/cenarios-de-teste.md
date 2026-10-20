# Cenários de teste — Speed Milhas

## Legenda

- **APROVADO:** o resultado observado correspondeu à expectativa do teste.
- **REPROVADO:** o resultado observado divergiu da expectativa do teste.
- **PENDENTE:** cenário não executado ou sem evidência suficiente.
- **A VALIDAR:** resultado depende da especificação oficial.

## 1. Busca de passagens

| ID | Cenário | Resultado esperado | Resultado observado |
|---|---|---|---|
| BUS-001 | Buscar com origem e destino válidos | Aceitar a requisição e normalizar IATA para maiúsculas | APROVADO |
| BUS-002 | Utilizar campos alternativos em português | Aceitar origem, destino e data nos nomes alternativos | APROVADO |
| BUS-003 | Origem igual ao destino | Rejeitar a requisição | APROVADO |
| BUS-004 | Data inexistente no calendário | Rejeitar a requisição | APROVADO |
| BUS-005 | Campos obrigatórios ausentes | Rejeitar a requisição | APROVADO |

Observação: o teste usa uma data futura fixa (2099-12-31). Ele valida
o schema, mas não comprova a integração com fornecedores nem a busca real.

## 2. Criação de reserva

| ID | Cenário | Resultado esperado | Resultado observado |
|---|---|---|---|
| RES-001 | Passageiro com dados válidos e espaços excedentes | Aceitar e normalizar os dados | APROVADO |
| RES-002 | quoteId ausente | Rejeitar a requisição | APROVADO |
| RES-003 | idempotencyKey ausente | Rejeitar a requisição | APROVADO |
| RES-004 | Passageiro omitido | Aceitar, conforme o schema atual testado | APROVADO |

Esses testes validam o schema de entrada. Não comprovam a persistência,
a autorização da agência, a idempotência real nem a criação da reserva
no banco de dados.

## 3. Precificação

| ID | Cenário | Resultado esperado | Resultado observado |
|---|---|---|---|
| PRE-001 | Taxas de R$ 39,76, com taxa de serviço de 7% | Taxa de R$ 2,79, conforme expectativa escrita no teste | REPROVADO: R$ 2,78 |
| PRE-002 | Total para taxas de R$ 39,76 | R$ 42,55, conforme expectativa escrita no teste | REPROVADO: R$ 42,54 |
| PRE-003 | Taxas iguais a zero | Taxa e total iguais a zero | APROVADO |

**Atenção:** PRE-001 e PRE-002 são duas asserções reprovadas no mesmo
contexto financeiro. A regra de arredondamento precisa ser confirmada
na especificação oficial antes de classificar a divergência como defeito
de negócio confirmado.

## 4. Integração e ponta a ponta

| ID | Cenário | Resultado esperado | Resultado observado |
|---|---|---|---|
| INT-001 | Inicialização do PostgreSQL | Container saudável | PENDENTE: `exec format error` |
| INT-002 | Inicialização do mock-suppliers | Serviço saudável | PENDENTE: `exec format error` |
| INT-003 | Busca integrada com fornecedores | Retorno de cotações | PENDENTE |
| INT-004 | Criação e consulta de reserva persistida | Reserva acessível e consistente | PENDENTE |
| INT-005 | Repetição de reserva com chave idempotente | Comportamento idempotente conforme contrato | PENDENTE |
| INT-006 | Requisição sem agência válida | Rejeição de autorização conforme contrato | PENDENTE |

Os cenários pendentes não foram considerados aprovados nem reprovados.
O bloqueio de infraestrutura impediu a execução.

## Resumo

Foram adicionados 12 testes automatizados: 10 passaram e 2 falharam.
Os resultados representam apenas os cenários listados e não equivalem
a uma certificação funcional completa da aplicação.
