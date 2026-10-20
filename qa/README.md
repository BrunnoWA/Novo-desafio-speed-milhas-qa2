# Speed Milhas — Entrega de QA

## Objetivo

Avaliar o comportamento da aplicação, criar cenários automatizados,
registrar divergências e documentar os bloqueios encontrados durante
a tentativa de validação.

A análise prioriza evidências reproduzíveis e preserva o código do
produto, sem incorporar correções funcionais como parte do QA.

## Documentos

- `cenarios-de-teste.md`: cenários executados e pendentes.
- `relatorio-de-defeitos.md`: achados, evidências e limitações.
- `relatorio-de-execucao.md`: histórico da análise e bloqueios técnicos.
- `relatorio-qa.md`: relatório inicial produzido durante a investigação.
- `evidencias/`: saídas de comandos e arquivos de referência.

## Resultado da automação

Execução registrada: `npm test -- --runInBand`

- 3 suítes executadas.
- 2 suítes aprovadas.
- 1 suíte reprovada.
- 10 testes aprovados.
- 2 testes reprovados.
- Código de saída: 1.

Consulte `evidencias/jest-resultados.txt`.

## Limitação principal

Não foi possível concluir os testes integrados porque os containers
PostgreSQL e mock-suppliers apresentaram `exec format error`.

Não há evidência suficiente para afirmar que o fluxo completo de busca
e reserva foi validado.

## Como reproduzir os testes unitários

Na pasta `api`, com as dependências instaladas e o ambiente Node.js
configurado:

```powershell
npm test -- --runInBand
```

A geração do Prisma Client requer `DATABASE_URL`. Para os testes
unitários, não se deve presumir que um banco de dados esteja disponível.

## Integridade

O arquivo `api/src/pricing/service-fee.ts` possui uma alteração local
durante a investigação. Consulte o diff e a versão original registrados
nas evidências antes de avaliar o resultado financeiro.

Os testes criados durante a análise verificam cenários específicos e
não representam cobertura completa do produto.
