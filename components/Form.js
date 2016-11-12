import React from 'react'
import {style, merge} from 'next/css'
import TextFieldset from '../components/TextFieldset'
import EnvFieldset from '../components/EnvFieldset'
import Button from '../components/Button'
import isRepoUrl from '../lib/is-repo-url'

export default class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      repo: '',
      zeitToken: '',
      envs: this.buildEnvs(props.initialEnvs),
      _errors: {}
    };
  }

  buildEnvs = (initial='') => {
    let defaults = [{key:'', value:''}, {key:'', value:''}, {key:'', value:''}]

    if (initial.constructor === String) defaults[0].key = initial
    if (initial.constructor === Array) {
      defaults = initial.map((env) => {
        return {key: env, value: ''}
      })
    }
    if (defaults.length < 3) defaults.push({key:'', value:''})

    return defaults
  }

  onChange = (e) => {
    const {name, value} = e.target
    this.setState({[name]: value})
  }

  setEnv = (e) => {
    const {name, value} = e.target
    const {envs} = this.state
    const [index, field] = name.split('.')
    envs[index][field] = value
    this.setState({envs})
  }

  addEnvField = () => {
    let {envs} = this.state
    envs = envs.concat({key:'', value:''})
    this.setState({envs})
  }

  removeEnvField = (index) => () => {
    let {envs} = this.state
    envs = envs.filter((el, idx) => idx!==index)
    this.setState({envs})
  }

  submit = () => {
    const form = this.state
    const {needRepo} = this.props
    let _errors = {}

    if (needRepo && !isRepoUrl(form.repo)) {
      _errors.repo = 'Please enter a valid GitHub repo url'
    }

    if (!form.zeitToken || form.zeitToken.length < 24) {
      _errors.zeitToken = 'Please enter a valid token'
    }

    form.envs.forEach((env, idx) => {
      if (!env.value) {
        _errors['env'+idx] = 'Please enter a value, or remove this envar'
      }
      if (!env.key) {
        _errors['env'+idx] = 'Please enter a key, or remove this envar'
      }
      if (/[^A-z0-9_]/i.test(env.key)) {
        _errors['env'+idx] = 'Key may only contain letters, numbers, and underscores'
      }
    })

    this.setState({_errors})

    if (Object.keys(_errors).length === 0) {
      this.props.onSubmit(form)
    }
  }

  render() {
    const {onChange, setEnv, addEnvField, removeEnvField, submit} = this
    const {needRepo} = this.props
    const {repo, zeitToken, envs, _errors: err} = this.state

    return (
      <div>
        { needRepo ?
          <TextFieldset name='repo'
            label='github repo'
            value={repo}
            placeholder='https://github.com/zeit/zeitgram'
            onChange={onChange}
            error={err.repo}
            hint='URL to a GitHub repo' />
          : null
        }

        <TextFieldset name='zeitToken'
          label='zeit token'
          value={zeitToken}
          placeholder='xxxxxxxxxxxxxxxxxxxxxxxx'
          onChange={onChange}
          error={err.zeitToken}
          hint={
            <span>
              Create a new API token <a href="https://zeit.co/account#api-tokens">
              here</a>
            </span>
          } />

        {envs.map((env, index) => {
          return (
            <EnvFieldset env={env}
              key={index}
              index={index}
              onChange={setEnv}
              onRemove={removeEnvField(index)}
              error={err['env'+index]} />
          )
        })}

        <Button onClick={addEnvField}>
          Add environment variable
        </Button>

        <Button onClick={submit}>
          DEPLOY
        </Button>
      </div>
    )
  }
}
