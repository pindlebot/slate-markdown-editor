const React = require('react');
const inject = require('react-jss').default

let fn = () => {
  let elem = () => React.createElement('div', { })
  elem = inject({root: {color: 'red'}})(elem)
  return elem;
}
console.log(fn())