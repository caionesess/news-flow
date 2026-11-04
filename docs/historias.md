# Histórias de usuário

## US01 — Salvar rascunho automaticamente

**Como** redatora  
**Quero** que meu texto seja salvo enquanto escrevo  
**Para** não perder trabalho caso precise recuperar uma versão anterior

**Critérios de aceitação**
- O rascunho é salvo automaticamente a cada 30 segundos sem alterações.
- Cada salvamento cria uma versão numerada com o conteúdo daquele instante.
- O sistema mantém as 20 versões mais recentes.
- Restaurar uma versão não remove as versões mais recentes.

**Regras cobertas:** RN01  
**Prioridade:** Alta — perder o texto de uma edição causa retrabalho e atrasa a comunicação.  
**Cenários:** `features/us01-rascunho.feature`

## US02 — Aprovar uma edição

**Como** revisora  
**Quero** aprovar ou reprovar uma edição escrita por outra pessoa  
**Para** garantir a qualidade do conteúdo antes do envio

**Critérios de aceitação**
- Uma edição aguardando revisão pode ser aprovada por uma revisora que não seja sua autora.
- A aprovação muda o estado da edição para aprovada.
- A autora não pode aprovar a própria edição.
- A reprovação exige um comentário e devolve a edição ao estado de rascunho.

**Regras cobertas:** RN02  
**Prioridade:** Alta — o conteúdo precisa de revisão antes de chegar aos assinantes.  
**Cenários:** `features/us02-aprovacao.feature`

## US03 — Agendar um envio

**Como** gestora  
**Quero** agendar o envio de uma edição aprovada  
**Para** alcançar os assinantes no momento planejado

**Critérios de aceitação**
- O agendamento aceita horários com pelo menos 15 minutos de antecedência no fuso de São Paulo.
- Um envio pode ser reagendado no máximo duas vezes.
- Um envio pode ser cancelado até cinco minutos antes do horário marcado.
- Agendamentos válidos registram o horário no fuso `America/Sao_Paulo`.

**Regras cobertas:** RN03  
**Prioridade:** Alta — o horário faz parte do planejamento das comunicações.  
**Cenários:** `features/us03-agendamento.feature`

## US04 — Direcionar um envio para segmentos

**Como** gestora  
**Quero** escolher os segmentos que receberão uma edição  
**Para** enviar conteúdo relevante ao público certo sem duplicar mensagens

**Critérios de aceitação**
- Um envio pode incluir no máximo cinco segmentos.
- Um segmento sem assinantes impede o agendamento.
- Uma edição enviada a segmentos sobrepostos gera uma única entrega por assinante.
- Um envio válido fica agendado para os segmentos selecionados.

**Regras cobertas:** RN04  
**Prioridade:** Alta — direcionar corretamente as campanhas evita comunicações irrelevantes e duplicadas.  
**Cenários:** `features/us04-segmentacao.feature`
