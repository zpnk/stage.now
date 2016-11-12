import React from 'react'
import {style} from 'next/css'

export default ({text, error}) => (
  <div className={styles({error})}>
    {error ? error : <span>{text}</span>}
  </div>
)

const styles = ({error}) => style({
  display: 'inline-block',
  marginLeft: '50px',
  color: error ? '#f00' :'#ababab',
  fontSize: '11px',
  marginBottom: '10px'
})
