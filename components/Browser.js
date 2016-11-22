import React from 'react';
import {style} from 'next/css';

export default function Browser({address='https://example.com', children}) {
  return (
    <div className={styles.container}>
      <div className={styles.navigation}>
        <div className={styles.controls}>
          <div className={styles.closeControl} />
          <div className={styles.minimizeControl} />
          <div className={styles.maximizeControl} />
        </div>
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

const control = {
  display: 'inline-block',
  width: 12,
  height: 12,
  margin: '0px 4px',
  borderRadius: '50%'
};

const styles = {
  navigation: style({
    position: 'relative',
    padding: 10,
    textAlign: 'center'
  }),
  controls: style({
    position: 'absolute',
    left: 10
  }),
  closeControl: style({
    ...control,
    backgroundColor: '#ff5f56'
  }),
  minimizeControl: style({
    ...control,
    backgroundColor: '#ffbd2e'
  }),
  maximizeControl: style({
    ...control,
    backgroundColor: '#27c93f'
  }),
  address: style({
    fontSize: 12
  })
}
