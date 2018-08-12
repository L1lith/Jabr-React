const {Component} = require('react')
const Jabr = require('jabr')
const findInObject = require('../functions/findInObject')
const PropTypes = require('prop-types')

class JabrReact extends Component {
  constructor(props) {
    super(props)
    const {store, select} = props
    if (!props.hasOwnProperty('store') || store === null) {
      this.store = Jabr()
    } else if (store instanceof Jabr) {
      this.store = store
    } else {
      throw new Error("You must supply a Jabr instance")
    }
    if (!props.hasOwnProperty('select')) {
      throw new Error("You must supply a Select Object")
    } else if (typeof select == 'object' && select !== null) {
      this.selections = findInObject(select, val => val === true, {onInvalid: ()=>{
        throw new Error("Invalid Select Object")
      }})
      console.log({selections})
    } else {
      throw new Error("Invalid Select Object")
    }

    this.componentId = ++totalComponents
  }
  getChildContext() {
    return {jabrStore: this.store, jabrSelections: this.selections}
  }
  render() {
    return React.Children.only(this.props.children)
  }
}

JabrReact.childContextTypes = {
  jabrStore: PropTypes.object,
  jabrSelections: PropTypes.array
}

module.exports = JabrReact
