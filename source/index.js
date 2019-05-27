const {createContext} = require('react')
const createReactConnector = require('./createReactConnector')
const createReactProvider = require('./createReactProvider')
const createConnectFunction = require('./createConnectFunction')

const context = createContext()

const Provider = createReactProvider(context)
const Connector = createReactConnector(context)
const connect = createConnectFunction(Connector)

module.exports = {
  Provider,
  Connector,
  connect
}
