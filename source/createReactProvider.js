const React = require('react')
const {Component, createElement} = React
const Jabr = require('jabr')

function createReactProvider(context) {
  class Provider extends Component {
    render() {
      const props = {...this.props}
      delete props.value
      delete props.store
      let store = this.props.store || new Jabr()
      if (typeof store == 'object' && store !== null && !(store instanceof Jabr)) store = new Jabr(store)
      if (!(store instanceof Jabr)) throw new Error("Expected the store prop to be a Jabr store instance")
      return React.createElement(context.Provider, {...props, value: store})
    }
  }
  return Provider
}

module.exports = createReactProvider
