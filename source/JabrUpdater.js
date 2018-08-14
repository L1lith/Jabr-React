const React = require('react')
const autoBind = require('auto-bind')
const clone = require('clone')
const equal = require('deep-equal')
const Jabr = require('jabr/source/Jabr')

class JabrUpdater extends React.Component {
  constructor(props) {
    super(props)
    autoBind(this)
    this.listening = false
    this.listeners = new Map()
    this.childProps = {...this.props}
    this.lastStore = new Jabr(this.props.jabr.valueOf())
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
      const callback = (...args)=>this.onChange(path, ...args)
      console.log(callback, this.onChange, this.props.jabr.on)
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
    if (targetPath.some((value, index) => listenPath.hasOwnProperty(index) && listenPath[index] !== value)) return // Ignore paths that cannot affect ours
    const newVal = this.props.jabr._Jabr.get(...listenPath)
    const oldVal = this.lastStore.get(...listenPath)
    this.lastStore = new Jabr(newVal)
    if (!equal(newVal, oldVal)) {
      this.forceUpdate()
    }
  }
  render() {
    const childrenWithStore = React.Children.map(this.props.children, child =>
      React.cloneElement(child, {...this.childProps, store: this.props.jabr}))
    return childrenWithStore
  }
}

module.exports = JabrUpdater
