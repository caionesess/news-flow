# language: pt
Funcionalidade: Agendar um envio
  Como gestora
  Quero agendar o envio de uma edição aprovada
  Para alcançar os assinantes no momento planejado

  @feliz
  Cenário: Agendar um envio com antecedência suficiente
    Quando agendo o envio para daqui a 30 minutos no fuso de São Paulo
    Então devo ver a mensagem "Envio agendado"
    E o disparo deve estar agendado no fuso de São Paulo

  @limite
  Esquema do Cenário: Respeitar a antecedência mínima de 15 minutos
    Quando agendo o envio para daqui a <minutos> minutos no fuso de São Paulo
    Então devo ver a mensagem "<mensagem>"

    Exemplos:
      | minutos | mensagem                                  |
      | 14      | O envio precisa de ao menos 15 minutos    |
      | 15      | Envio agendado                            |
      | 16      | Envio agendado                            |

  @limite
  Esquema do Cenário: Permitir no máximo dois reagendamentos
    Dado que o envio tem <vezes> reagendamentos anteriores
    Quando reagendo o envio
    Então devo ver a mensagem "<mensagem>"

    Exemplos:
      | vezes | mensagem                           |
      | 0     | Envio reagendado                    |
      | 1     | Envio reagendado                    |
      | 2     | O limite de reagendamentos foi atingido |

  @limite
  Esquema do Cenário: Cancelar até cinco minutos antes do envio
    Quando tento cancelar o envio faltando <minutos> minutos
    Então devo ver a mensagem "<mensagem>"

    Exemplos:
      | minutos | mensagem                                  |
      | 6       | Envio cancelado                           |
      | 5       | Envio cancelado                           |
      | 4       | Não é possível cancelar a menos de 5 minutos |
