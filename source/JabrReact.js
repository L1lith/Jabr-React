const {Component} = require('react')
const Jabr = require('jabr')
const findInObject = require('../functions/findInObject')

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
      const selections = findInObject(select, val => val === true, {onInvalid: ()=>{
        throw new Error("Invalid Select Object")
      }})
      console.log({selections})
    } else {
      throw new Error("Invalid Select Object")
    }
  }
  render() {

  }
}

module.exports = JabrReact
