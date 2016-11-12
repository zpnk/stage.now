import React from 'react'
import Head from 'next/head'
import {style, insertRule} from 'next/css'
import axios from 'axios'
import isRepoUrl from '../lib/is-repo-url'
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
      <div className={styles.container}>
        <Head>
          <title>Stage: realtime staging environments</title>
        </Head>

        <h2 className={styles.title}># Deploy to <a href="https://now.sh">now</a></h2>

        <div className={styles.message}>
          {deploying ? 'Deploying...' : _errors.repo}
        </div>

        { deployedUrl ?
          <div>
            <p>Your deployment has been queued!</p>
            <p>Your app will be available at <a href={deployedUrl}>{deployedUrl}</a></p>
          </div>
        : null }

        { !deployedUrl && !deploying ?
          <DeployForm initialEnvs={query.env}
            needRepo={!query.repo || _errors.repo}
            onSubmit={this.deploy} />
        : null
        }
      </div>
    )
  }
}

insertRule(`
  *, *:before, *:after {
    box-sizing: inherit;
  }

  body {
    position: relative;
    min-height: 100%;
    margin: 0;
    padding: 0;
    color: #424242;
    font-size: 12px;
    font-family: Menlo, Monaco, Lucida Console, Courier New, monospace, serif;
    text-rendering: geometricPrecision;
  }
`);

const styles = {
  container: style({
    maxWidth: '800px',
    margin: '0 auto'
  }),
  title: style({
    fontSize: '12px',
    fontWeight: 700,
  }),
  message: style({
    margin: '20px 0'
  })
}
