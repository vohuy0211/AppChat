import React from 'react';
import { Link } from 'react-router-dom';
import styles from './HomeChat.module.css';

const HomeChat = () => {
  return (
    <div className={styles.container}>
      <h1>App Chat</h1>
      <div className={styles.options}>
        <Link to="/register" className={styles.option}>
          Register
        </Link>
        <Link to="/Login" className={styles.option}>
          Log In
        </Link>
      </div>
    </div>
  );
};

export default HomeChat;
