import * as slate from 'slate'

for(let key in slate) {
  exports[key] = slate[key]
}
export default slate;

