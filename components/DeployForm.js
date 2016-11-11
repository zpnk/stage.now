import React from 'react'
import isRepoUrl from '../lib/is-repo-url'

export default class DeployForm extends React.Component {
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
      if (defaults.length < 3) defaults.push({key:'', value:''})
    }

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
      _errors.repo = `Please enter a valid GitHub repo url in the format:
        https://github.com/{owner}/{repo}`
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
        _errors['env'+idx] = 'Key may only contain letters, numbers, an underscores'
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
    const {repo, zeitToken, envs, _errors} = this.state

    return (
      <div>
        { needRepo ?
          <div>
            <input name='repo'
              value={repo}
              onChange={onChange}
              type='text'
              placeholder="GitHub repo url" />
            {_errors.repo}
            <br />
          </div>
          : null
        }

        <input name='zeitToken'
          value={zeitToken}
          onChange={onChange}
          type='text'
          placeholder="Zeit API Token"
          maxLength="24" />
        <a href="https://zeit.co/account#api-tokens">?</a>
        {_errors.zeitToken}

        {envs.map((env, i) => {
          return (
            <div key={i}>
              <input name={`${i}.key`} value={envs[i].key} onChange={setEnv} placeholder='ENV_VAR' />
              {'='}
              <input name={`${i}.value`} value={envs[i].value} onChange={setEnv} placeholder='value' />
              <button onClick={removeEnvField(i)}>-</button>
              {_errors['env'+i]}
            </div>
          )
        })}

        <button onClick={addEnvField}>+</button>

        <br />
        <button onClick={submit}>Deploy!</button>
      </div>
    )
  }
}
