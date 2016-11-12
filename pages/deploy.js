import React from 'react'
import {style, insertRule} from 'next/css'
import axios from 'axios'
import isRepoUrl from '../lib/is-repo-url'
import Header from '../components/Header'
import Footer from '../components/Footer'
import DeployForm from '../components/DeployForm'

export default class extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      deploying: false,
      deployedUrl: null,
      _errors: {}
    }
  }

  static async getInitialProps() {
    return {
      deployService: process.env.DEPLOY_SERVICE
    }
  }

  componentWillMount() {
    const {query} = this.props.url

    if (query.repo && !isRepoUrl(query.repo)) {
      this.setState({_errors: {
        repo: 'Cannot build that repo, please enter one'
      }})
    }
  }

  deploy = async ({repo, zeitToken, envs}) => {
    this.setState({deploying: true})

    const { deployService, url: {query} } = this.props

    if (isRepoUrl(query.repo)) {
      repo = url.query.repo
    }

    const deploy = await axios.post(deployService, {repo, zeitToken, envs})

    this.setState({deployedUrl: deploy.data.url, deploying: false})
  }

  render() {
    const { query } = this.props.url
    const { deploying, deployedUrl, _errors } = this.state

    return (
      <main>
        <Header title='Deploy to now' />
        <div className={styles.container}>
          <h2 className={styles.title}>
            ## Deploy to <a href="https://now.sh">now</a>
          </h2>

          <div className={styles.message}>
            { query.repo && !_errors.repo ?
              <span>
                Deploying <a href={query.repo}>{query.repo.split('.com/')[1]}</a>
              </span>
            : null
            }
            { deploying ? 'Initialising...' : _errors.repo}
          </div>

          { deployedUrl ?
            <div>
              <p>Your deployment has been queued!</p>
              <p>
                Your app will be available at
                {' '}<a href={deployedUrl}>{deployedUrl}</a>
              </p>
            </div>
          : null }

          { !deployedUrl && !deploying ?
            <DeployForm initialEnvs={query.env}
              needRepo={!query.repo || _errors.repo}
              onSubmit={this.deploy} />
          : null
          }
        </div>

        <Footer />
      </main>
    )
  }
}

const styles = {
  title: style({
    fontSize: '12px',
    fontWeight: 700,
  }),
  message: style({
    margin: '20px 0'
  })
}
