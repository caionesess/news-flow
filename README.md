# NewsFlow — BDD com Cucumber.js

Exercício de histórias de usuário, cenários Gherkin em português e automação do domínio em memória.

**Alunos: Caio Fernandes e Vitor Oliveira**

## Como executar

`npm install` instala as dependências.  
`npm test` executa a suíte e gera `relatorios/cucumber-report.html`.  
`npm run test:dry` valida a sintaxe e confirma que não há passos pendentes.

## Histórias e rastreabilidade

As quatro histórias, critérios de aceitação, regras de negócio cobertas e prioridades estão em [docs/historias.md](docs/historias.md). Cada uma tem um arquivo `.feature` correspondente em `features/`.

## Fora de escopo

- **RN05 — Frequência:** limites semanais e fila dependem do histórico de entregas por assinante, comportamento fora das quatro histórias selecionadas.
- **RN06 — Descadastro:** opt-out e duplo opt-in exigem fluxos de consentimento próprios, não necessários para validar o recorte de edição e agendamento.
- **RN07 — Falha de entrega:** retentativas e bounces pertencem ao processamento posterior ao disparo, não ao fluxo editorial coberto.
- **RN08 — Notificações:** janela de silêncio e limite diário são regras de push, enquanto este recorte valida newsletters por e-mail.

## Última execução de `npm test`

```text
> newsflow-bdd@1.0.0 test
> cucumber-js

................................................................................

25 scenarios (25 passed)
80 steps (80 passed)
0m00.154s (executing steps: 0m00.031s)
```
