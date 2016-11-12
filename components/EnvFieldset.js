import React from 'react'
import {style} from 'next/css'
import Field from '../components/Field'
import Label from '../components/Label'
import Input from '../components/Input'
import Hint from '../components/Hint'
import Button from '../components/Button'

export default ({env, index, onChange, onRemove, error}) => (
  <div>
    <Field error={error}>
      <Input name={`${index}.key`}
        value={env.key}
        onChange={onChange}
        placeholder={`ENV_VAR_${index+1}`}
        error={error}
        {...styles.key({error})} />

      <div {...styles.equals}>=</div>

      <Input name={`${index}.value`}
        value={env.value}
        onChange={onChange}
        placeholder='value'
        error={error}
        {...styles.value} />
    </Field>

    <Button onClick={onRemove} {...styles.btn}>-</Button>

    <Hint error={error} />
  </div>
)

const styles = {
  key: ({error}) => style({
    color: error ? '#f00' : '#dbcb00',
    fontSize: '11px',
    fontWeight: 700,
    width: '100px',
    '::-webkit-input-placeholder': {
      color: error ? '#f00' : '#dbcb00'
    }
  }),
  value: style({
    width: '222px !important'
  }),
  equals: style({
    width: '30px',
    display: 'inline-block'
  }),
  btn: style({
    position: 'absolute !important',
    display: 'inline !important',
    padding: '5px 10px !important',
    margin: '5px 0 0 10px !important'
  })
}
