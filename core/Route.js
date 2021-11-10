//route home
const { HomeRoute } = require('routes/home/home.route')
const { AboutRoute } = require('routes/home/about.route')

//route NEC
const { TreeRoute } = require('routes/nec/tree.route')
const { TreeApiRoute } = require('routes/nec/tree.api.route')

class Route {
  init() {
    return [
      //init home route
      new HomeRoute().route(),
      new AboutRoute().route(),

      //NEC
      new TreeRoute().route(), //Route to view output in GUI
      new TreeApiRoute().route(), //Route to return API response
    ]
  }
}

module.exports = { Route }
