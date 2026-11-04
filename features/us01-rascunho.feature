# language: pt
Funcionalidade: Salvar rascunho automaticamente
  Como redatora
  Quero que meu texto seja salvo enquanto escrevo
  Para não perder trabalho caso precise recuperar uma versão anterior

  Contexto:
    Dado que existe a edição "Boletim de março" com o texto "Texto inicial"

  @feliz
  Cenário: Salvar uma versão após 30 segundos sem alterações
    Quando espero 30 segundos sem editar
    Então a quantidade de versões salvas deve ser 1

  @limite
  Esquema do Cenário: Salvar versões a cada 30 segundos
    Quando espero <segundos> segundos sem editar
    Então a quantidade de versões salvas deve ser <versoes>

    Exemplos:
      | segundos | versoes |
      | 29       | 0       |
      | 30       | 1       |
      | 60       | 2       |

  @feliz
  Cenário: Restaurar uma versão sem remover as posteriores
    Dado que a edição tem as versões 1 e 2 com textos diferentes
    Quando restauro a versão 1
    Então o texto da edição deve ser "Texto inicial"
    E a quantidade de versões salvas deve ser 2

  @excecao
  Cenário: Não restaurar uma versão fora das 20 mais recentes
    Dado que a edição tem 21 versões salvas
    Quando tento restaurar a versão 1
    Então devo ver a mensagem "A versão não está disponível"
    E a quantidade de versões salvas deve ser 20
