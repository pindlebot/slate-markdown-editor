
export default {
  unordered_list: { 
    type: 'list_item', 
    data: { wrapper: 'unordered_list' } 
  },
  blockquote: { 
    type: 'blockquote', 
    data: { inner: 'paragraph', split: false } 
  },
  header_one: { 
    type: 'header_one', 
    data: { depth: 1, split: true } 
  },
  header_two: {
    type: 'header_two', 
    data: { depth: 2, split: true } 
  },
  header_three: {
    type: 'header_three', 
    data: { depth: 3, split: true } 
  },
  header_four: {
    type: 'header_four', 
    data: { depth: 4, split: true } 
  },
  header_five: {
    type: 'header_five', 
    data: { depth: 5, split: true } 
  },
  header_six: { 
    type: 'header_six', 
    data: { depth: 6, split: true } 
  },
  code: { 
    type: 'code', 
    data: { wrapper: 'pre' } 
  }
}