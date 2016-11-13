import React from 'react';
import {style} from 'next/css';
import Browser from './Browser';

export default function Hero({
  branchActive=true,
  stageActive=true,
  mainlineActive=true,
  browserSize={width: 450, height: 313}
}) {
  const css = styles({branchActive, stageActive, mainlineActive});

  return (
    <div className={css.container}>
      <div className={css.mainline}>
        <div className={css.mainlineLine} />
        <div className={css.newCommit} />
        <div className={css.oldCommit} />
      </div>
      <div className={css.branch}>
        <div className={css.branchMergeLeftLine} />
        <div className={css.branchMergeUpLine} />
        <div className={css.stageBrowser} style={browserSize}>
          {stageActive && (
            <Browser {...browserSize} address="https://my-project-red-button.now.sh">

            </Browser>
          )}
        </div>
        <div className={css.stageLine} />
        <div className={css.branchCommit} />
        <div className={css.branchCommitLabel}>
          <div>red-button 634023f</div>
          <div><a href="#">@zpnk</a> Change primary button color</div>
        </div>
      </div>
    </div>
  );
}

const styles = ({
  height=500,
  width='100%',
  commitSize=30,
  branchActive,
  stageActive,
  mainlineActive
}) => {
  const commit = {
    position: 'relative',
    width: commitSize,
    height: commitSize,
    margin: '0px auto',
    borderRadius: '50%',
    backgroundColor: 'white',
    boxShadow: `0 0 0 ${commitSize/2}px`,
    color: '#eee'
  };

  const line = {
    width: commit.width/2,
    height: commit.width/2,
    margin: '0px auto',
    backgroundColor: '#eee'
  };

  return {
    container: style({
      width,
      height,
      display: 'table',
      tableLayout: 'fixed',
      position: 'relative',
      padding: commit.width
    }),
    mainline: style({
      display: 'table-cell',
      width: line.width/2,
      position: 'relative',
      height: '100%',
      zIndex: 1
    }),
    branch: style({
      position: 'relative',
      display: 'table-cell',
      width: 'auto',
      verticalAlign: 'middle'
    }),
    newCommit: style({
      ...commit,
      transform: 'translate(-50%, -50%)',
      position: 'absolute',
      top: 0,
      left: 0,
      color: (mainlineActive) ? 'black' : commit.color,
      backgroundColor: '#3ac547'
    }),
    oldCommit: style({
      ...commit,
      transform: 'translate(-50%, 50%)',
      position: 'absolute',
      bottom: 0,
      left: 0,
      color: (mainlineActive) ? 'black' : commit.color
    }),
    branchCommit: style({
      ...commit,
      transform: 'translate(-50%, 0)',
      position: 'absolute',
      left: '50%',
      bottom: -commit.height/2,
      color: (branchActive) ? 'black' : commit.color
    }),
    mainlineLine: style({
      ...line,
      transform: 'translate(-50%, 0)',
      height: '100%',
      backgroundColor: (mainlineActive) ? 'black' : line.backgroundColor
    }),
    branchMergeLeftLine: style({
      ...line,
      position: 'absolute',
      width: '50%',
      top: -line.width/2,
      left: line.width/2,
      backgroundColor: (mainlineActive) ? 'black' : line.backgroundColor
    }),
    branchMergeUpLine: style({
      ...line,
      transform: 'translate(-50%, 0)',
      position: 'absolute',
      margin: '0px auto',
      height: '50%',
      top: 0,
      left: '50%',
      backgroundColor: (mainlineActive) ? 'black' : line.backgroundColor
    }),
    stageLine: style({
      ...line,
      transform: 'translate(-50%, 0)',
      position: 'absolute',
      margin: '0px auto',
      height: '50%',
      bottom: 0,
      left: '50%',
      backgroundColor: (branchActive) ? 'black' : line.backgroundColor
    }),
    stageBrowser: style({
      position: 'absolute',
      zIndex: 1,
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      borderRadius: 5,
      backgroundColor: (stageActive) ? 'black' : '#eee',
      color: 'white'
    }),
    stageBrowserNav: style({
      padding: 10,
      textAlign: 'center',
      color: 'white'
    }),
    branchCommitLabel: style({
      transform: `translate(${commit.width}px, 50%)`,
      visibility: (branchActive) ? 'visible' : 'hidden',
      position: 'absolute',
      bottom: 0,
      left: '50%',
      padding: 20
    })
  };
}
