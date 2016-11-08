import React from 'react'
import Head from 'next/head'
import axios from 'axios'

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      deployedUrl: null
    };
  }

  static async getInitialProps() {
    return {
      deployService: process.env.DEPLOY_SERVICE
    }
  }

  deploy = async () => {
    let { value: token } = this.refs.zeitToken;

    if (!token || token.length !== 24) return false;

    const { url, deployService } = this.props;
    const { query: { repo } } = url;

    const deploy = await axios.post(deployService, {repo, token});

    this.refs.zeitToken.value = null;

    this.setState({deployedUrl: deploy.data.url});
  }

  render() {
    const { query: { repo } } = this.props.url;
    const { deployedUrl } = this.state;

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
        : <div>
            <p>Please enter your Zeit <a href="https://zeit.co/account#api-tokens">API token</a>:</p>
            <input type="text" ref="zeitToken" placeholder="Paste token here" maxLength="24" />
            <button onClick={this.deploy}>Deploy!</button>
          </div>
        }
      </div>
    )
  }
}
