import React from 'react';
import injectSheet from 'react-jss'

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  }
}

let Toolbar = props => (
  <div className={props.classes.root}>{props.toolbar}</div>
)

export default injectSheet(styles)(Toolbar) 