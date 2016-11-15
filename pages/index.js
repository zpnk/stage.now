import React from 'react'
import {style, insertRule} from 'next/css'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default () => (
  <main>
    <Header title='STAGE' />
    
    <p className={styles.tagline}>
      > staging environments made <b>simple</b> and <b>realtime</b>.
    </p>
    <p>
      <b>Stage</b> is the fastest way for individuals, teams, and organizations
      to <b>QA and ship</b> apps.
    </p>
    <p>
      By harnessing the power of <b><a href="https://now.sh">now</a></b>,
      deployments are <b>fast</b> and <b>reliable</b>.
    </p>

    <h2 className={styles.h2}>## Instant environments for every PR </h2>
    <p>
      Open a <b><a href="https://github.com">GitHub</a></b> PR and
      instantly receive a unique url running that code.
    </p>
    <p>Push some changes and the environment updates itself.</p>
    <p>
      With full <b><a href="https://docker.com">Docker</a></b> support,
      staging environments mirror production perfectly.
    </p>
    <div className={styles.center}>
      <button className={styles.btn}>Start staging now</button>
    </div>

    <Footer />
  </main>
)

const styles = {
  h2: style({
    fontSize: '12px',
    fontWeight: 700,
    marginTop: '50px'
  }),
  center: style({
    textAlign: 'center'
  }),
  btn: style({
    background: '#fff',
    border: '2px solid #000',
    color: '#000',
    cursor: 'pointer',
    fontFamily: 'Menlo, Monaco, Lucida Console, Courier New, monospace, serif',
    fontSize: '12px',
    fontWeight: 700,
    textTransform: 'uppercase',
    textDecoration: 'none',
    lineHeight: 1,
    padding: '10px 15px',
    margin: '20px 0',
    display: 'inline-block',
    WebkitTransition: 'all .2s ease',
    transition: 'all .2s ease',
    ':hover': {
      background: '#000',
      border: '2px solid #000',
      color: '#fff'
    }
  }),
  tagline: style({
    marginBottom: '20px',
  })
}
