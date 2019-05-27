const deepEql = require("deep-eql")
const React = require('react')
const {Component, createElement} = React
const Jabr = require('jabr/source/Jabr')

class ComponentUpdater extends Component {
  constructor() {
    super()
    this.state = {}
  }
  static getDerivedStateFromProps(props, state) {
    if (typeof props.mapStateToProps != 'function') throw new Error("Expected a map state to props function.")
    const oldState = state.hasOwnProperty('store') ? state.store : null
    const newState = props.mapStateToProps(props.store)
    if (typeof newState != 'object') throw new Error("mapStateToProps did not return an object or null.")
    console.log(JSON.stringify(props.store), newState)
    if (!oldState || !deepEql(oldState, newState)) {
      return {store: newState}
    } else {
      return null
    }
  }
  render() {
    const props = {...this.props}
    props.jabrStore = props.store
    delete props.children
    delete props.store
    props.store = this.state.store
    return React.cloneElement(this.props.children, props)
  }
}

module.exports = ComponentUpdater
