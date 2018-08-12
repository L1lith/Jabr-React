function findInObject(object, compare, {deep=true, onInvalid}, currentObjectPath=[]) {
	let output = []
	Object.entries(object).forEach(([key, value]) => {
		const propertyObjectPath = currentObjectPath.concat(key)

		if (typeof value == 'object' && value !== null) {
			if (deep === true) output = output.concat(findInObject(value, compare, deep, propertyObjectPath))
		} else if (compare(value, propertyObjectPath, object) === true) {
			output.push([propertyObjectPath, value, object])
		} else if (typeof onInvalid == 'function') {
      onInvalid(propertyObjectPath, value, object)
    }
	})
	return output
}

module.exports = findInObject
