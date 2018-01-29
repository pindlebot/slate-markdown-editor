import * as React from 'react'

const Html = (props) => {
  let __html = props.node.data.get('openingTag') + props.node.data.get('closingTag')
  return (
    <div 
      {...props.attributes}
      contentEditable={false}    
      data-json={JSON.stringify(props.node.data.toJSON())}
      style={{backgroundColor: 'red'}}
      dangerouslySetInnerHTML={{ __html }}
    />
  )
}

export default Html