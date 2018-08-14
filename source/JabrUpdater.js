const React = require('react')
const autoBind = require('auto-bind')
const clone = require('clone')
const equal = require('deep-equal')
const createJabr = require('jabr')

class JabrUpdater extends React.Component {
  constructor(props) {
    super(props)

    autoBind(this)
    this.listening = false
    this.listeners = new Map()
    this.lastStore = createJabr(clone(this.props.jabr.valueOf()))
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
      const callback = (...args)=>this.onChange(path, ...args)
      this.listeners.set(callback, path)
      this.props.jabr.on(...path, callback)
    })

    this.listening = true
  }
  removeJabrListeners() {
    if (this.listening !== true) throw new Error("Cannot Remove Jabr Listeners, Not Listening")

    this.listeners.forEach((path, listener) => {
      this.props.jabr.removeListener(...path, listener)
    })
    this.listeners = new Map()

    this.listening = false
  }
  onChange(listenPath, value, targetPath) {
    if (this.shouldUpdate(listenPath, targetPath)) {
      this.forceUpdate()
    }
  }
  shouldUpdate(listenPath, targetPath) {
    if (targetPath.some((value, index) => listenPath.hasOwnProperty(index) && listenPath[index] !== value)) return false // Ignore paths that cannot affect ours
    const oldVal = this.lastStore._Jabr.get(...listenPath)
    const newVal = this.props.jabr._Jabr.get(...listenPath)
    this.lastStore = createJabr(clone(this.props.jabr.valueOf()))
    return !equal(newVal, oldVal)
  }
  render() {
    const childProps = {...this.props}

    delete childProps.select
    delete childProps.children
    const childrenWithStore = React.Children.map(this.props.children, child =>
      React.cloneElement(child, {...childProps, store: this.props.jabr}))
    return childrenWithStore
  }
}

module.exports = JabrUpdater
