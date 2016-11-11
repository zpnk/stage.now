import React from 'react'
import Head from 'next/head'
import axios from 'axios'
import DeployForm from '../components/DeployForm'

export default class extends React.Component {
  constructor(props) {
    super(props)

    const {query} = props.url

    this.state = {
      deployedUrl: null,
    }
  }

  static async getInitialProps() {
    return {
      deployService: process.env.DEPLOY_SERVICE
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
    const { deployedUrl } = this.state

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
        : <DeployForm initialEnvs={query.env}
            needRepo={!query.repo}
            onSubmit={this.deploy} />
        }
      </div>
    )
  }
}
