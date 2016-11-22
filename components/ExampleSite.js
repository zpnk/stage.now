import React, {Component} from 'react';
import {style} from 'next/css';
import Browser from './Browser';

export default class ExampleSite extends Component {
  state = {
    showSite: false
  };

  componentWillMount() {
    setTimeout(() => this.setState({showSite: true}), 0);
  }

  render() {
    const css = styles(this.state);

    return (
      <div className={css.fakeContainer}>
        <div className={css.fakeRow1} />
        <div className={css.fakeRow2} />
        <div className={css.fakeRow3} />
        <div className={css.fakeRow3} />
        <div className={css.fakeButtons}>
          <div className={css.fakeButton1} />
          <div className={css.fakeButton2} />
        </div>
      </div>
    );
  }
}

const styles = ({showSite}) => {
  return {
    fakeContainer: style({
      width: '80%',
      margin: '40px auto',
      opacity: (showSite) ? 1 : 0,
      transform: (showSite) ? 'translateY(0)' : 'translateY(-20px)',
      transition: 'opacity 600ms ease-out, transform 400ms ease-out'
    }),
    fakeRow1: style({
      width: '25%',
      height: 18,
      margin: '20px auto',
      backgroundColor: 'rgba(255, 255, 255, 0.4)'
    }),
    fakeRow2: style({
      width: '60%',
      height: 18,
      margin: '20px auto',
      backgroundColor: 'rgba(255, 255, 255, 0.4)'
    }),
    fakeRow3: style({
      width: '33%',
      height: 8,
      margin: '10px auto',
      backgroundColor: 'rgba(255, 255, 255, 0.4)'
    }),
    fakeButtons: style({
      display: 'flex',
      justifyContent: 'center',
      margin: 20
    }),
    fakeButton1: style({
      width: '33%',
      height: 20,
      margin: 5,
      borderRadius: 20,
      backgroundColor: 'rgba(255, 0, 0, 0.5)',
      border: '2px solid transparent'
    }),
    fakeButton2: style({
      width: '33%',
      height: 20,
      margin: 5,
      borderRadius: 20,
      border: '2px solid rgba(255, 255, 255, 0.4)'
    })
  };
};
