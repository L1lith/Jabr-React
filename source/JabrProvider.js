const React = require('react')
const createJabr = require('jabr')
const Jabr = require('jabr/source/Jabr')

const {Provider} = require('./globalJabrContext')

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

module.exports = JabrProvider
