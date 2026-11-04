const { setWorldConstructor } = require('@cucumber/cucumber')
const NewsFlow = require('./domain')

class NewsFlowWorld {
  constructor() {
    this.service = new NewsFlow()
    this.edition = null
    this.result = null
  }
}

setWorldConstructor(NewsFlowWorld)
