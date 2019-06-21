import React from 'react';

const TenthFrame = (props) => (
  <div className="Frame" style={styles.frame}>
    <div className="frame-header" style={styles.frameHeader}>{props.number}</div>
    <div className="first-throw" style={styles.firstThrow}>{(props.firstThrow === 10) ? "X" : props.firstThrow}</div>
    <div className="second-throw" style={styles.secondThrow}>{props.secondThrow === 10 ? "X" : (props.firstThrow !== 10 && (props.firstThrow + props.secondThrow === 10)) ? "/" : props.secondThrow}</div>
    <div className="last-throw" style={styles.lastThrow}>{(props.lastThrow === 10) ? "X" : props.lastThrow}</div>
    <div className="frame-total" style={styles.frameTotal}>{props.frameTotal}</div>
  </div>
);

const styles = {
  frame: {
    border: '2px solid black',
    listStyle: 'none',
    display: 'inline-block',
    padding: '45px',
    background: 'white',
    position: 'relative',
  },
  frameHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    fontSize: '16px',
    width: '100%',
    color: 'black',
    textAlign: 'center',
    borderBottom: '2px solid black'
  },

  firstThrow: {
    position: 'absolute',
    top: '20px',
    right: 58,
    color: 'black',
    padding: '3px',

  },
  secondThrow: {
    position: 'absolute',
    top: '20px',
    right: 28,
    border: '1px solid black',
    color: 'black',
    padding: '2px',
    height: '28px',
    width: '22px',
  },
  lastThrow: {
    position: 'absolute',
    border: '1px solid black',
    top: '20px',
    right: 0,
    color: 'black',
    padding: '2px',
    height: '28px',
    width: '22px',
  },
  frameTotal: {
    position: 'absolute',
    bottom: '2px',
    right: '3px',
    color: 'black'
  }
}


export default TenthFrame;
