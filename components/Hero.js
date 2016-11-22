import React, {Component} from 'react';
import {style, keyframes} from 'next/css';
import Browser from './Browser';
import ExampleSite from './ExampleSite';

export default class Hero extends Component {
  state = {
    branchActive: false,
    stageActive: false,
    mainlineActive: false
  };

  static MEDIA_STACKED = '@media(max-width: 1280px)';
  static MEDIA_FLUID = '@media(max-width: 468px)';

  componentWillMount() {
    setTimeout(() => this.setState({branchActive: true}), 1000);
    setTimeout(() => this.setState({stageActive: true}), 1000);
    setTimeout(() => this.setState({stageReady: true}), 3000);
    setTimeout(() => this.setState({mainlineActive: true}), 4000);
  }

  render() {
    const {branchActive, stageActive, stageReady, mainlineActive} = this.state;
    const css = styles(this.state);

    return (
      <div className={css.container}>
        <div className={css.leftMessage}>
          <div>red-button 634023f</div>
          <div><a href="https://github.com/zpnk" target="_blank">@zpnk</a> Change button color to red</div>
        </div>
        <div className={css.leftCommit} />
        <div className={css.leftLine} />
        <div className={css.stageBrowser}>
          {stageActive && (
            <Browser address="https://my-project-red-button.now.sh">
              <ExampleSite />
              {stageReady && (
                <div className={css.stageReady} />
              )}
            </Browser>
          )}
        </div>
        <div className={css.rightLine} />
        <div className={css.rightCommit} />
        <div className={css.rightMessage}>
          <div>master fab0f32</div>
          <div><a href="https://github.com/amccloud" target="_blank">@amccloud</a> Merged: "Change button color to red"</div>
        </div>
      </div>
    );
  }
}

const bounce = keyframes({
  '0%': {transform: 'scale(0.1)', opacity: 0},
  '60%': {transform: 'scale(1.2)', opacity: 1},
  '100%': {transform: 'scale(1)'}
});

const styles = ({
  branchActive,
  stageActive,
  stageReady,
  mainlineActive
}) => {
  const commit = {
    flex: '0 0 auto',
    width: 30,
    height: 30,
    border: `${30/2}px solid #eee`,
    borderRadius: '50%'
  };

  const line = {
    flex: 1,
    margin: -1, // allows lines to connect without gaps
    zIndex: -1, // lines should always be below
    height: commit.width/2,
    width: commit.width/2,
    backgroundColor: '#eee',
    [Hero.MEDIA_STACKED]: {
      minHeight: commit.width*2
    }
  };

  const message = {
    margin: 10,
    padding: 20,
    border: '2px solid black',
    transition: 'opacity 400ms ease-out, transform 200ms ease-out'
  };

  return {
    container: style({
      display: 'flex',
      alignItems: 'center',
      [Hero.MEDIA_STACKED]: {
        flexDirection: 'column'
      },
      [Hero.MEDIA_FLUID]: {
        padding: 10
      }
    }),
    stageBrowser: style({
      position: 'relative',
      width: 448,
      height: 311,
      borderRadius: 5,
      backgroundColor: (stageActive) ? 'black' : '#eee',
      color: 'white',
      [Hero.MEDIA_FLUID]: {
        width: '100%'
      }
    }),
    stageReady: style({
      animation: `${bounce} 500ms`,
      position: 'absolute',
      bottom: 20,
      right: 20,
      width: 60,
      height: 60,
      fontSize: 60,
      border: '2px solid #3ac547',
      borderRadius: '50%',
      backgroundColor: '#3ac547',
      color: 'black'
    }),
    leftCommit: style({
      ...commit,
      borderColor: (branchActive) ? 'black' : commit.color
    }),
    leftLine: style({
      ...line,
      backgroundColor: (branchActive) ? 'black' : line.backgroundColor
    }),
    leftMessage: style({
      ...message,
      opacity: (branchActive) ? 1 : 0,
      transform: (branchActive) ? 'scale(1, 1)' : 'scale(0, 0)'
    }),
    rightCommit: style({
      ...commit,
      backgroundColor: (mainlineActive) ? '#3ac547' : commit.backgroundColor,
      borderColor: (mainlineActive) ? 'black' : commit.color
    }),
    rightLine: style({
      ...line,
      backgroundColor: (mainlineActive) ? 'black' : line.backgroundColor
    }),
    rightMessage: style({
      ...message,
      opacity: (mainlineActive) ? 1 : 0,
      transform: (mainlineActive) ? 'scale(1, 1)' : 'scale(0, 0)'
    })
  };
}
