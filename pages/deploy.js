import React from 'react'
import Head from 'next/head'
import axios from 'axios'
import isRepoUrl from '../lib/is-repo-url'
import DeployForm from '../components/DeployForm'

export default class extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
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
        repo: 'Cannot build that repo, please enter one below:'
      }})
    }
  }

  deploy = async ({repo, zeitToken, envs}) => {
    const { deployService, url } = this.props

    repo = url.query.repo || repo

    const deploy = await axios.post(deployService, {repo, zeitToken, envs})

    this.setState({deployedUrl: deploy.data.url});
  }

  render() {
    const { query } = this.props.url
    const { deployedUrl, _errors } = this.state

    return (
      <div>
        <Head>
          <title>Stage: realtime staging environments</title>
        </Head>

        { deployedUrl ?
          <div>
            <p>Your deployment has been queued!</p>
            <p>Your app will be available at <a href={deployedUrl}>{deployedUrl}</a></p>
          </div>
        :
          <div>
            {_errors.repo}
            <DeployForm initialEnvs={query.env}
              needRepo={!query.repo || _errors.repo}
              onSubmit={this.deploy} />
          </div>
        }
      </div>
    )
  }
}
