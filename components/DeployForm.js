import React from 'react'
import {style, merge} from 'next/css'
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
    const {repo, zeitToken, envs, _errors: err} = this.state

    return (
      <div>
        { needRepo ?
          <div>
            <div className={styles.field(err.repo)}>
              <label htmlFor='repo' className={styles.label(err.repo)}>
                GITHUB REPO:
              </label>
              <input name='repo'
                className={styles.input(err.repo)}
                value={repo}
                onChange={onChange}
                type='text'
                placeholder="https://github.com/zeit/zeitgram" />
            </div>
            <div className={styles.hint(err.repo)}>
              {err.repo ?
                err.repo
              :
                <span>
                  URL to a GitHub repo
                </span>
              }
            </div>
          </div>
          : null
        }
        
        <div>
          <div className={styles.field(err.zeitToken)}>
            <label htmlFor='zeitToken' className={styles.label(err.zeitToken)}>
              ZEIT TOKEN:
            </label>
            <input name='zeitToken'
              className={styles.input(err.zeitToken)}
              value={zeitToken}
              onChange={onChange}
              type='text'
              placeholder="xxxxxxxxxxxxxxxxxxxxxxxx"
              maxLength="24" />
          </div>
          <div className={styles.hint(err.zeitToken)}>
            {err.zeitToken ?
              err.zeitToken
            :
              <span>
                Create a new API token <a href="https://zeit.co/account#api-tokens">here</a>
              </span>
            }
          </div>
        </div>

        {envs.map((env, i) => {
          const envErr = err['env'+i]
          return (
            <div key={i}>
              <div className={styles.field(envErr)}>
                <input name={`${i}.key`}
                  className={merge(styles.input(envErr), styles.envKey(envErr))}
                  value={envs[i].key}
                  onChange={setEnv}
                  placeholder={`ENV_VAR_${i+1}`} />
                <div className={styles.envEql}>=</div>
                <input name={`${i}.value`}
                  className={merge(styles.input(envErr), styles.envVal)}
                  value={envs[i].value}
                  onChange={setEnv}
                  placeholder='value' />
              </div>
              <button className={merge(styles.btn, styles.btnRemove)}
                onClick={removeEnvField(i)}>
                -
              </button>
              <div className={styles.hint(envErr)}>
                {envErr}
              </div>
            </div>
          )
        })}

        <button className={styles.btn}
          onClick={addEnvField}>
          Add environment variable
        </button>

        <button className={styles.btn}
          onClick={submit}>
          DEPLOY
        </button>
      </div>
    )
  }
}

const styles = {
  field: (error) => style({
    display: 'inline-block',
    borderBottom: `2px solid ${error ? '#f00' : '#d8d8d8'}`,
    marginBottom: '10px'
  }),
  label: (error) => style({
    color: error ? '#f00' : '#dbcb00',
    display: 'inline-block',
    fontSize: '11px',
    fontWeight: 700,
    marginRight: '2px',
    width: '100px'
  }),
  input: (error) => style({
    WebkitAppearance: 'none',
    MozAppearance: 'none',
    appearance: 'none',
    background: 'rgba(0, 0, 0, 0)',
    border: 'none',
    color: error ? '#f00' : '#000',
    fontFamily: 'Menlo, Monaco, Lucida Console, Courier New, monospace, serif',
    fontSize: '13px',
    outline: 'none',
    width: '252px',
    height: '35px'
  }),
  envKey: (error) => style({
    color: error ? '#f00' : '#dbcb00',
    width: '100px',
    '::-webkit-input-placeholder': {
      color: error ? '#f00' : '#dbcb00'
    }
  }),
  envVal: style({
    width: '222px'
  }),
  envEql: style({
    width: '30px',
    display: 'inline-block'
  }),
  hint: (error) => style({
    display: 'inline-block',
    marginLeft: '50px',
    color: error ? '#f00' :'#ababab',
    fontSize: '11px',
    marginBottom: '10px'
  }),
  btn: style({
    background: '#fff',
    border: '2px solid #000',
    color: '#000',
    cursor: 'pointer',
    fontFamily: 'Menlo, Monaco, Lucida Console, Courier New, monospace, serif',
    fontSize: '12px',
    fontWeight: 700,
    lineHeight: 1,
    display: 'block',
    padding: '10px 15px',
    margin: '10px 0 20px',
    WebkitTransition: 'all .2s ease',
    transition: 'all .2s ease',
    ':hover': {
      background: '#000',
      color: '#fff'
    }
  }),
  btnRemove: style({
    position: 'absolute',
    display: 'inline',
    padding: '5px 10px',
    margin: '5px 0 0 10px'
  })
}
