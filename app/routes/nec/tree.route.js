const { Controller } = require('cores/Controller')
const { View } = require('cores/View')
const { TreeController } = require('controllers/nec/tree.controller')

class TreeRoute extends Controller {
  constructor() {
    super()
    this.view = new View()
  }
  route() {
    const { view } = this
    return this.get('/', async(req, res) => {
      view.render(res, 'nec.views/tree', {
        output: await new TreeController().controller(req, res)
      })
    })
  }  
}

module.exports = { TreeRoute }
