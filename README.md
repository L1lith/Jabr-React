# Jabr-React
## Basics
At the top level of your React app simply wrap it in the Provider class. Not providing a store prop will make it automatically initiate an empty store. Additionally you can instead provide an object to initialize the store's contents.
```js
const {Provider} = require('jabr-react')
// ... in your rendering code
<Provider store={{loggedIn: false}}>
    //React Components
</Provider>
```

Next in your descendant children simply import the connect function, then provide it first a function to retrieve the data from the store, then your component you would like to connect, then inside your component retrieve the store data from this.props.store.
```js
const React = require('react')
const {connect} = require('jabr-react')

class MyClass extends React.Component {
    render() {
        return <p>{this.props.store.loggedIn.toString()} // renders <p>false</p>
    }
}

module.exports = connect(store => ({loggedIn: store.loggedIn}), MyClass)
```
