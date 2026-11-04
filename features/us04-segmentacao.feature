# language: pt
Funcionalidade: Direcionar um envio para segmentos
  Como gestora
  Quero escolher os segmentos que receberão uma edição
  Para enviar conteúdo relevante ao público certo sem duplicar mensagens

  @feliz
  Cenário: Enviar uma única mensagem a quem pertence a segmentos sobrepostos
    Dado que o segmento "Clientes Premium" tem os assinantes "Ana, Bruno"
    E que o segmento "Leitores semanais" tem os assinantes "Ana, Carla"
    Quando agendo o envio para os segmentos "Clientes Premium, Leitores semanais"
    Então devo ver a mensagem "Disparo agendado"
    E o envio deve alcançar 3 assinantes únicos

  @excecao
  Cenário: Impedir o agendamento para um segmento sem assinantes
    Dado que o segmento "Clientes Premium" tem os assinantes "Ana, Bruno"
    E que o segmento "Segmento vazio" não tem assinantes
    Quando agendo o envio para os segmentos "Clientes Premium, Segmento vazio"
    Então devo ver a mensagem "Um segmento sem assinantes impede o agendamento"

  @limite
  Esquema do Cenário: Selecionar no máximo cinco segmentos
    Dado que existem <quantidade> segmentos com assinantes
    Quando agendo o envio para todos os segmentos
    Então devo ver a mensagem "<mensagem>"

    Exemplos:
      | quantidade | mensagem                                         |
      | 4          | Disparo agendado                                  |
      | 5          | Disparo agendado                                  |
      | 6          | Um envio pode incluir no máximo 5 segmentos      |
