
export default {
  li: { 
    type: 'li', 
    data: { wrapper: 'ul' } 
  },
  blockquote: { 
    type: 'blockquote', 
    data: { inner: 'p', split: false } 
  },
  h1: { 
    type: 'heading', 
    data: { depth: 1, split: true } 
  },
  h2: {
    type: 'heading', 
    data: { depth: 2, split: true } 
  },
  h3: {
    type: 'heading', 
    data: { depth: 3, split: true } 
  },
  h4: {
    type: 'heading', 
    data: { depth: 4, split: true } 
  },
  h5: {
    type: 'heading', 
    data: { depth: 5, split: true } 
  },
  h6: { 
    type: 'heading', 
    data: { depth: 6, split: true } 
  },
  code: { 
    type: 'code', 
    data: { wrapper: 'pre' } 
  }
}