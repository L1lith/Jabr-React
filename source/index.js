const {createContext} = require('react')
const createReactConnector = require('./createReactConnector')
const createReactProvider = require('./createReactProvider')

const context = createContext()

module.exports = {
  Provider: createReactProvider(context),
  Connector: createReactConnector(context)
}
