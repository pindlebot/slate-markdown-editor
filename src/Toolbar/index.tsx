import * as React from 'react';

const styles : any = {
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  }
}

let Toolbar = props => (
  <div style={styles.root}>{props.toolbar}</div>
)

export default Toolbar