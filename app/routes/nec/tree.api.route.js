const { Controller } = require('cores/Controller')
const { View } = require('cores/View')
const { TreeController } = require('controllers/nec/tree.controller')

class TreeApiRoute extends Controller {
  constructor() {
    super()
    this.view = new View()
  }
  route() {
    return this.get('/tree', (req, res) => new TreeController().controllerApi(req, res))
  }  
}

module.exports = { TreeApiRoute }
