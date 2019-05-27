const {isValidElement} = require('react')

function isFunctionComponent(component) {
  if (typeof component != 'function') return false
  const output = component()
  return isValidElement(output)
}

module.exports = isFunctionComponent
