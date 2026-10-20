# Relatório de defeitos e achados — Speed Milhas

**Data da análise:** 20/10/2026  
**Abordagem:** investigação orientada por evidências, sem correção funcional.

## QA-001 — Divergência no arredondamento da taxa de serviço

**Área:** Pricing  
**Status:** divergência reproduzida; classificação como defeito de negócio pendente de confirmação.  
**Severidade:** a definir após confirmar a regra e o impacto.

### Condição testada

Taxas de R$ 39,76 e taxa de serviço de 7%.

### Resultado esperado pelo teste

- Taxa de serviço: R$ 2,79.
- Total: R$ 42,55.

### Resultado observado

- Taxa de serviço: R$ 2,78.
- Total: R$ 42,54.

### Evidência

- `evidencias/jest-resultados.txt`
- `evidencias/service-fee-original.txt`
- `evidencias/service-fee-diff.txt`

### Observação técnica

A implementação local foi alterada durante a análise de `Math.round`
para `Math.ceil`. Apesar disso, a execução do Jest retornou 278 centavos.
Essa inconsistência precisa ser investigada: não se deve atribuir o
resultado exclusivamente à implementação atual sem confirmar o arquivo
executado e seu conteúdo.

A versão original do Git deve ser usada para documentar o comportamento
de referência. A alteração local foi preservada e não deve ser descartada.

### Critério para conclusão

Comparar a regra de arredondamento com a especificação oficial e executar
o cenário contra uma versão identificada e reproduzível do código.

## QA-002 — Falha de inicialização dos containers

**Área:** Infraestrutura de testes  
**Status:** bloqueio confirmado; causa raiz não identificada.  
**Severidade:** bloqueador da validação integrada.

### Sintoma

Os logs de PostgreSQL e mock-suppliers exibiram repetidamente:

`exec /usr/local/bin/docker-entrypoint.sh: exec format error`

Também foi observada falha ao tentar executar `/bin/sh` na imagem
PostgreSQL, enquanto um container Alpine conseguiu executar um comando.

### Impacto

Não foi possível confirmar a inicialização saudável da infraestrutura
necessária para validar o banco de dados e os fornecedores simulados.
Os cenários integrados e ponta a ponta ficaram pendentes.

### Evidências

Os logs foram consultados durante a sessão. Para a entrega, devem ser
preservados em arquivos próprios caso estejam disponíveis no terminal:

- logs do PostgreSQL;
- logs do mock-suppliers;
- saída de `docker version`;
- saída de `docker image inspect`;
- resultado do teste de execução do container Alpine.

### Limitação

Os dados coletados não identificaram definitivamente a causa raiz.
Não afirmar que o problema foi corrigido ou que decorre de arquitetura
incompatível sem evidência adicional.

## QA-003 — Ausência de testes preexistentes encontrados

**Área:** Automação  
**Status:** observação de cobertura.

Na primeira tentativa, o Jest informou `No tests found`. Depois da
instalação das dependências e da criação de três arquivos de teste,
foram executadas 12 asserções/casos de teste.

Esse achado descreve o estado encontrado durante a análise. Não é
suficiente, isoladamente, para afirmar que o produto não possui qualquer
teste em outros diretórios, pipelines ou repositórios.

## Conclusão

Um conjunto limitado de testes unitários foi executado com 10 aprovações
e 2 reprovações. Há uma divergência financeira que precisa ser comparada
à regra oficial. A infraestrutura Docker bloqueou a validação integrada.

Nenhum desses resultados deve ser apresentado como prova de que todos
os fluxos de produção foram testados.
