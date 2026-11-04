# language: pt
Funcionalidade: Aprovar uma edição
  Como revisora
  Quero aprovar ou reprovar uma edição escrita por outra pessoa
  Para garantir a qualidade do conteúdo antes do envio

  @feliz
  Cenário: Aprovar uma edição de outra pessoa
    Dado que a edição aguarda revisão e foi criada por "Redatora"
    Quando a revisora "Revisora" aprova a edição
    Então devo ver a mensagem "Edição aprovada"
    E a edição deve estar "aprovada"

  @excecao
  Cenário: Impedir que a autora aprove a própria edição
    Dado que a edição aguarda revisão e foi criada por "Redatora"
    Quando a revisora "Redatora" aprova a edição
    Então devo ver a mensagem "A autora não pode aprovar a própria edição"
    E a edição deve estar "aguardando revisão"

  @feliz
  Cenário: Reprovar uma edição com um comentário
    Dado que a edição aguarda revisão e foi criada por "Redatora"
    Quando a revisora "Revisora" reprova a edição com o comentário "Revisar os dados"
    Então devo ver a mensagem "Edição devolvida para rascunho"
    E a edição deve estar "rascunho"

  @excecao
  Cenário: Exigir um comentário para reprovar
    Dado que a edição aguarda revisão e foi criada por "Redatora"
    Quando a revisora "Revisora" reprova a edição sem comentário
    Então devo ver a mensagem "O comentário é obrigatório"
    E a edição deve estar "aguardando revisão"
