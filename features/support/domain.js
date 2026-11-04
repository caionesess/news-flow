const TIME_ZONE = 'America/Sao_Paulo'

class NewsFlow {
  constructor() {
    this.edition = null
    this.segments = new Map()
    this.now = new Date('2026-03-10T09:00:00-03:00')
    this.result = { message: '' }
  }

  createDraft(title, text, author = 'Redatora') {
    this.edition = {
      title,
      text,
      author,
      status: 'rascunho',
      versions: [],
      nextVersion: 1,
      elapsedSeconds: 0
    }
    return this.edition
  }

  advanceSeconds(seconds) {
    this.edition.elapsedSeconds += seconds
    while (this.edition.elapsedSeconds >= 30) {
      this.edition.elapsedSeconds -= 30
      this.saveVersion()
    }
  }

  saveVersion() {
    this.edition.versions.push({
      number: this.edition.nextVersion++,
      text: this.edition.text
    })
    if (this.edition.versions.length > 20) this.edition.versions.shift()
  }

  restoreVersion(number) {
    const version = this.edition.versions.find((item) => item.number === number)
    if (!version) {
      this.result = { message: 'A versão não está disponível' }
      return
    }
    this.edition.text = version.text
    this.result = { message: 'Versão restaurada' }
  }

  updateDraft(text) {
    this.edition.text = text
  }

  awaitReview(author) {
    this.edition = { author, status: 'aguardando revisão' }
    this.result = { message: '' }
    return this.edition
  }

  approve(reviewer) {
    if (reviewer === this.edition.author) {
      this.result = { message: 'A autora não pode aprovar a própria edição' }
      return
    }
    this.edition.status = 'aprovada'
    this.result = { message: 'Edição aprovada' }
  }

  reject(comment) {
    if (!comment.trim()) {
      this.result = { message: 'O comentário é obrigatório' }
      return
    }
    this.edition.status = 'rascunho'
    this.result = { message: 'Edição devolvida para rascunho' }
  }

  schedule(minutes) {
    if (minutes < 15) {
      this.result = { message: 'O envio precisa de ao menos 15 minutos' }
      return
    }
    this.edition = {
      status: 'agendado',
      scheduledAt: new Date(this.now.getTime() + minutes * 60_000),
      timeZone: TIME_ZONE
    }
    this.result = { message: 'Envio agendado' }
  }

  setPreviousReschedules(count) {
    this.edition = { status: 'agendado', reschedules: count }
  }

  reschedule() {
    if (this.edition.reschedules >= 2) {
      this.result = { message: 'O limite de reagendamentos foi atingido' }
      return
    }
    this.edition.reschedules += 1
    this.result = { message: 'Envio reagendado' }
  }

  cancel(minutesBefore) {
    if (minutesBefore < 5) {
      this.result = { message: 'Não é possível cancelar a menos de 5 minutos' }
      return
    }
    this.edition.status = 'cancelado'
    this.result = { message: 'Envio cancelado' }
  }

  addSegment(name, subscribers) {
    this.segments.set(name, subscribers)
  }

  createSegments(count) {
    for (let index = 1; index <= count; index += 1) {
      this.addSegment(`Segmento ${index}`, [`Assinante ${index}`])
    }
  }

  scheduleSegments(names) {
    const segments = names.map((name) => this.segments.get(name))
    if (names.length > 5) {
      this.result = { message: 'Um envio pode incluir no máximo 5 segmentos' }
      return
    }
    if (segments.some((subscribers) => !subscribers || subscribers.length === 0)) {
      this.result = { message: 'Um segmento sem assinantes impede o agendamento' }
      return
    }
    const recipients = new Set(segments.flat())
    this.result = { message: 'Disparo agendado', recipientCount: recipients.size }
  }
}

module.exports = NewsFlow
