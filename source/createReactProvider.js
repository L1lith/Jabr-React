const React = require('react')
const {Component, createElement} = React
const Jabr = require('jabr/source/Jabr')

function createReactProvider(context) {
  class Provider extends Component {
    render() {
      const props = {...this.props}
      delete props.value
      delete props.store
      const {store} = this.props
      return React.createElement(context.Provider, {...props, value: store})
    }
  }
  return Provider
}

module.exports = createReactProvider
