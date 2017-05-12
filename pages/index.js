import React from 'react';
import {style} from 'next/css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Hero from '../components/Hero';

const styles = {
  heroContainer: style({
    maxWidth: 1280,
    margin: '0px auto',
    padding: '100px 0px'
  }),
  h2: style({
    fontSize: '12px',
    fontWeight: 700,
    marginTop: 35
  }),
  ol: style({
    lineHeight: 2
  }),
  center: style({
    textAlign: 'center'
  }),
  btn: style({
    display: 'inline-block',
    lineHeight: 1,
    margin: '20px 0',
    border: 'none'
  }),
  tagline: style({
    marginBottom: '20px'
  })
};

export default () => (
  <div>
    <div className={styles.heroContainer}>
      <Hero />
    </div>
    <main>
      <Header title="STAGE" />
      <p className={styles.tagline}>
        &gt; staging environments made <b>simple</b> and <b>realtime</b>.
      </p>
      <p>
        <b>Stage</b> is the fastest way for individuals, teams, and organizations
        to <b>QA and ship</b> apps.
      </p>
      <p>
        By harnessing the power of <b><a href="https://now.sh">&#9651; now</a></b>,
        deployments are <b>fast</b> and <b>reliable</b>.
      </p>
      <h2 className={styles.h2}>&#35;&#35; Instant environments for every PR </h2>
      <p>
        Open a <b><a href="https://github.com">GitHub</a></b> PR and
        instantly receive a unique url running that code.
      </p>
      <p>Push some changes and the environment updates itself.</p>
      <p>
        With full <b><a href="https://docker.com">Docker</a></b> support,
        staging environments mirror production perfectly.
      </p>

      <h2 className={styles.h2}>&#35;&#35; Start staging now</h2>
      <p>Follow these steps to setup <b>stage</b> for your repo:</p>

      <ol className={styles.ol}>
        <li>
          Create a new <a href="https://github.com/settings/tokens/new">GitHub access token</a>
          {' '}with the <b>repo</b> scope. In the following steps this will be called GITHUB_TOKEN.
        </li>
        <li>
          Make up a very long secret security key. In the following steps this will be called GITHUB_WEBHOOK_SECRET.
        </li>
        <li>
          Deploy <b>stage</b> to your <b><a href="https://now.sh">&#9651; now</a></b> account using the deploy button below.
          <div className={styles.center}>
            <a href="https://deploy.now.sh?repo=https://github.com/zpnk/stage-ci&env=GITHUB_TOKEN&env=GITHUB_WEBHOOK_SECRET"
              className={styles.btn}
              target="_blank"
              rel="noopener noreferrer">
              <img src="/static/button.svg" />
            </a>
          </div>
        </li>
        <li>Once deployed, copy the url and go to your GitHub repo.</li>
        <li>On the repo, click &lsquo;Settings&rsquo;, then &lsquo;Webhooks&rsquo;. Add a new webhook.</li>
        <li>Set the Content type dropdown to application/json</li>
        <li>Set the secret to match your made up GITHUB_WEBHOOK_SECRET from above.</li>
        <li>
          Paste the url, and choose &lsquo;individual events&rsquo;.
          Select the &lsquo;Pull Request&rsquo; event, then add the webhook.
        </li>
      </ol>

      <p>That&#39;s it! You now have a shiny new <b>stage</b> server waiting to deploy your PRs.</p>
      <Footer />
    </main>
  </div>
);
