const { Controller } = require('cores/Controller')
const { View } = require('cores/View')

class HomeRoute extends Controller {
  constructor() {
    super()
    this.view = new View()
  }
  route() {
    const { view } = this
    return this.get('/home', (req, res) => {
      view.render(res, 'home.views/index', {
        name: 'Aswin'
      })
    })
  }
}

module.exports = { HomeRoute }
