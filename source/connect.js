const React = require('react')
const Jabr = require('jabr/source/Jabr')
const findInObject = require('./functions/findInObject')
const JabrUpdater = require('./JabrUpdater')
const {Consumer} = require('./globalJabrContext')

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
        return React.createElement(JabrUpdater, {...this.props, jabr, select}, Component)
      })
    }
  }
  return JabrConsumer
}

module.exports = connect
