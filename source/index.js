const React = require('react')
const createJabr = require('jabr')
const Jabr = require('jabr/source/Jabr')
const findInObject = require('./functions/findInObject')
const autoBind = require('auto-bind')

const globalJabrContext = React.createContext()
const {Provider, Consumer} = globalJabrContext

class JabrProvider extends React.Component {
  constructor(props) {
    super(props)
    if (this.props.hasOwnProperty('store')) {
      if (this.props.store instanceof Jabr) {
        this.jabr = this.props.store
      } else {
        this.jabr = createJabr(this.props.store)
      }
    } else {
      this.jabr = createJabr()
    }
  }
  render() {
    return React.createElement(Provider, {value: this.jabr}, React.Children.only(this.props.children))
  }
}

function connect(Component, select, options={}) {
  if (typeof options != 'object' || options === null) throw new Error('Options must be an object')
  if (typeof select != 'object') throw new Error("Select Prop is Not an Object.")
  if (select === null) select = {}

  select = findInObject(select, val => val === true, {onInvalid: () => {
    throw new Error("Invalid Select Object")
  }}).map(result => result[0])

  class JabrConsumer extends React.Component {
    render() {
      return React.createElement(Consumer, null, jabr => {
        if (!(jabr instanceof Jabr)) throw new Error("Jabr Context Not a Jabr Instance!")
        return React.createElement(JabrUpdater, {jabr, select}, Component)
      })
    }
  }
  return JabrConsumer
}

class JabrUpdater extends React.Component {
  constructor(props) {
    super(props)
    autoBind(this)
    this.listening = false
    this.listeners = new Map()
    this.childProps = {...this.props}
    delete this.childProps.select
    delete this.childProps.children
  }
  componentWillMount() {
    this.setupJabrListeners()
  }
  componentWillUnmount() {
    this.removeJabrListeners()
  }
  setupJabrListeners() {
    if (this.listening !== false) throw new Error('Cannot Setup Jabr Listeners, Already Listening')

    this.props.select.forEach(path => {
      const callback = ()=>{
        this.forceUpdate()
      }
      this.listeners.set(path, callback)
      this.props.jabr.on(...path, callback)
    })

    this.listening = true
  }
  removeJabrListeners() {
    if (this.listening !== true) throw new Error("Cannot Remove Jabr Listeners, Not Listening")

    this.listeners.forEach((listener, path) => {
      this.props.jabr.removeListener(...path, listener)
    })
    this.listeners = new Map()

    this.listening = false
  }
  render() {
    const childrenWithStore = React.Children.map(this.props.children, child =>
      React.cloneElement(child, {store: this.props.jabr}))
    return childrenWithStore
  }
}

module.exports = {Provider: JabrProvider, connect}
