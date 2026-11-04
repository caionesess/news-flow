const { Given, When, Then } = require('@cucumber/cucumber')
const assert = require('node:assert/strict')

Given('que existe a edição {string} com o texto {string}', function (title, text) {
  this.edition = this.service.createDraft(title, text)
})

Given('que a edição tem {int} versões salvas', function (count) {
  this.service.advanceSeconds(count * 30)
})

Given('que a edição tem as versões 1 e 2 com textos diferentes', function () {
  this.service.advanceSeconds(30)
  this.service.updateDraft('Texto atualizado')
  this.service.advanceSeconds(30)
})

When('espero {int} segundos sem editar', function (seconds) {
  this.service.advanceSeconds(seconds)
})

When('restauro a versão {int}', function (number) {
  this.service.restoreVersion(number)
  this.result = this.service.result
})

When('tento restaurar a versão {int}', function (number) {
  this.service.restoreVersion(number)
  this.result = this.service.result
})

Then('a quantidade de versões salvas deve ser {int}', function (count) {
  assert.equal(this.edition.versions.length, count)
})

Then('o texto da edição deve ser {string}', function (text) {
  assert.equal(this.edition.text, text)
})

Given('que a edição aguarda revisão e foi criada por {string}', function (author) {
  this.edition = this.service.awaitReview(author)
})

When('a revisora {string} aprova a edição', function (reviewer) {
  this.service.approve(reviewer)
  this.result = this.service.result
})

When('a revisora {string} reprova a edição com o comentário {string}', function (reviewer, comment) {
  assert.notEqual(reviewer, this.edition.author)
  this.service.reject(comment)
  this.result = this.service.result
})

When('a revisora {string} reprova a edição sem comentário', function (reviewer) {
  assert.notEqual(reviewer, this.edition.author)
  this.service.reject('')
  this.result = this.service.result
})

Then('a edição deve estar {string}', function (status) {
  assert.equal(this.edition.status, status)
})

When('agendo o envio para daqui a {int} minutos no fuso de São Paulo', function (minutes) {
  this.edition = this.service.createDraft('Boletim', 'Conteúdo aprovado')
  this.service.schedule(minutes)
  this.edition = this.service.edition
  this.result = this.service.result
})

Then('o disparo deve estar agendado no fuso de São Paulo', function () {
  assert.equal(this.edition.timeZone, 'America/Sao_Paulo')
  const localTime = new Intl.DateTimeFormat('en-GB', {
    timeZone: this.edition.timeZone,
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23'
  }).format(this.edition.scheduledAt)
  assert.equal(localTime, '09:30')
})

Given('que o envio tem {int} reagendamentos anteriores', function (count) {
  this.service.setPreviousReschedules(count)
})

When('reagendo o envio', function () {
  this.service.reschedule()
  this.result = this.service.result
})

When('tento cancelar o envio faltando {int} minutos', function (minutes) {
  this.service.edition = { status: 'agendado' }
  this.service.cancel(minutes)
  this.result = this.service.result
})

Given('que o segmento {string} tem os assinantes {string}', function (name, subscribers) {
  this.service.addSegment(name, subscribers.split(',').map((item) => item.trim()))
})

Given('que o segmento {string} não tem assinantes', function (name) {
  this.service.addSegment(name, [])
})

When('agendo o envio para os segmentos {string}', function (names) {
  this.service.scheduleSegments(names.split(',').map((item) => item.trim()))
  this.result = this.service.result
})

Given('que existem {int} segmentos com assinantes', function (count) {
  this.service.createSegments(count)
})

When('agendo o envio para todos os segmentos', function () {
  const names = [...this.service.segments.keys()]
  this.service.scheduleSegments(names)
  this.result = this.service.result
})

Then('o envio deve alcançar {int} assinantes únicos', function (count) {
  assert.equal(this.result.recipientCount, count)
})

Then('devo ver a mensagem {string}', function (message) {
  assert.equal(this.result.message, message)
})
