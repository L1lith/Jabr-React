const React = require('react')
const autoBind = require('auto-bind')

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
      this.listeners.set(path, this.onChange.bind(null, path))
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
  onChange(path) {

  }
  render() {
    const childrenWithStore = React.Children.map(this.props.children, child =>
      React.cloneElement(child, {...this.childProps, store: this.props.jabr}))
    return childrenWithStore
  }
}

module.exports = JabrUpdater
