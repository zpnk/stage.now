import React from 'react';
import {style} from 'next/css';

export default function Browser({width, height, address='https://example.com', children}) {
  return (
    <div className={styles.container} style={{width, height}}>
      <div className={styles.navigation}>
        <div className={styles.controls} />
        <div className={styles.address}>
          {address}
        </div>
      </div>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
}

const styles = {
  container: style({
  }),
  navigation: style({
    padding: 10,
    textAlign: 'center'
  }),
  controls: style({
    backgroundColor: 'red',
    position: 'absolute',
    left: 10,
    width: 40
  }),
  address: style({
    fontSize: 12
  }),
  content: style({

  })
}
