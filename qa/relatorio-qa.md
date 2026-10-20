# Relatório de QA — Speed Milhas

**Data:** 20/10/2026  
**Objetivo:** identificar e evidenciar defeitos sem corrigir o produto.

## 1. Testes automatizados

Execução: `npm test -- --runInBand`

- Suítes aprovadas: 2
- Suítes reprovadas: 1
- Testes aprovados: 10
- Testes reprovados: 2
- Código de saída: 1

Evidência: `evidencias/jest-resultados.txt`

## 2. QA-001 — Divergência no cálculo da taxa de serviço

**Área:** Pricing  
**Entrada:** R$ 39,76 em taxas, percentual de 7%.

Resultado observado:
- Taxa de serviço: R$ 2,78
- Total: R$ 42,54

Resultado esperado nos testes:
- Taxa de serviço: R$ 2,79
- Total: R$ 42,55

**Status:** divergência reproduzida; regra de arredondamento a confirmar na especificação oficial.

Dois testes financeiros falharam. A implementação local utiliza `Math.ceil`, mas o resultado observado foi compatível com a versão original arredondada com `Math.round`. Investigar qual arquivo foi efetivamente carregado e preservar as evidências antes de qualquer alteração.

Evidências:
- `evidencias/service-fee-original.txt`
- `evidencias/service-fee-diff.txt`
- `evidencias/jest-resultados.txt`

## 3. Testes aprovados

- Validação de criação de reserva: suíte aprovada.
- Validação dos dados da busca: suíte aprovada.

A aprovação refere-se apenas aos cenários cobertos, não a todos os fluxos funcionais.

## 4. QA-002 — Infraestrutura Docker indisponível

PostgreSQL e mock-suppliers apresentaram `exec format error` no entrypoint.

**Impacto:** testes integrados e fluxo ponta a ponta ainda não foram validados.

**Status:** bloqueado; causa raiz não confirmada.

## 5. Limitações

- A suíte de testes original não existia ou não foi encontrada na primeira execução.
- Os testes atuais foram adicionados durante a investigação.
- A expectativa financeira ainda precisa ser comparada à especificação oficial.
- Os testes de API não substituem a validação integrada de reservas.

## 6. Integridade do produto

Nenhuma correção funcional deve ser incorporada como parte da investigação. As alterações locais devem ser preservadas e identificadas no Git.
