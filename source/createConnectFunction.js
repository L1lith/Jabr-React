const React = require('react')
const {Children, Component, createElement, cloneElement} = React
const ComponentUpdater = require('./ComponentUpdater')
const isClassComponent = require('./functions/isClassComponent')
const createReactConnector = require('./createReactConnector')

function createConnectFunction(TrueConnector) {
  function connect(mapStateToProps, component) {
    console.log(mapStateToProps, component)
    if (typeof mapStateToProps != 'function' || isClassComponent(mapStateToProps)) throw new Error("Expected the first argument to be a Map State to Props function.")
    if (!isClassComponent(component)) throw new Error("Expected the second argument to be a React Component Class")
    class Connector extends Component {
      render() {
        return React.createElement(TrueConnector, {...this.props, mapStateToProps, children: React.createElement(component)})
      }
    }
    return Connector
  }
  return connect
}

module.exports = createConnectFunction
