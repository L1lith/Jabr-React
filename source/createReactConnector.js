const React = require('react')
const {Children, Component, createElement, cloneElement} = React
const ComponentUpdater = require('./ComponentUpdater')

function createReactConnector(context) {
  const {Consumer} = context
  class Connector extends Component {
    render() {
      return React.createElement(context.Consumer, {}, store => {
        const props = {...this.props}
        props.store = store
        Children.only(props.children)
        return React.createElement(ComponentUpdater, props)
      })
    }
  }
  return Connector
}

module.exports = createReactConnector
