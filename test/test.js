const slate = require('slate')
const slateReact = require('slate-react')

slate.Text.prototype.getRanges = slate.Text.prototype.getLeaves;

let text = slate.Text.create({text: 'lorem', marks: []})
//let out = text.getRanges().toJSON()
//console.log(out)

console.log(slateReact)