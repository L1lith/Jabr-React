const { Component } = require('react')

function isClassComponent(component) {
  //console.log(Object.getPrototypeOf(component).prototype, Component.prototype)
  try {
    const classPrototype = Object.getPrototypeOf(component).prototype
    return classPrototype === Component.prototype
  } catch(error) {
    return false
  }
}

module.exports = isClassComponent
