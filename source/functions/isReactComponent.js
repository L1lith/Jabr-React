const isFunctionComponent = require('./isFunctionComponent')
const isClassComponent = require('./isClassComponent')

function isReactComponent(component) {
    return (
        isClassComponent(component) ||
        isFunctionComponent(component)
    ) ? true : false;
}

module.exports = isReactComponent
