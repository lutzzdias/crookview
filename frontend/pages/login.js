import axios from 'axios';
import Head from 'next/head';
import Router from 'next/router';
import { useState } from 'react';

import styles from '../styles/Login.module.css';

export default function Login() {
  const [userInfo, setUserInfo] = useState({ username: '', password: '' });

  const handleChange = (event) => {
    const target = event.target.name;
    setUserInfo((prevUserInfo) => {
      return { ...prevUserInfo, [target]: event.target.value.trim() };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    (async () => {
      const result = await axios({
        method: 'post',
        url: 'http://localhost:3060/api/user/login',
        data: userInfo,
      });
      if (result.status == 200) {
        localStorage.setItem('user', result.data);
        Router.push('/');
      }
    })();
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Crookview</title>
        <meta name="description" content="A review website for critics" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <form className={styles.loginForm} method="POST" name="login-form">
          <h1 className={styles.title}>Login</h1>
          <input
            className={styles.username}
            name="username"
            type="text"
            placeholder="Username"
            onChange={handleChange}
            required
          />
          <input
            className={styles.password}
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          <a className={styles.register} href="register">
            Register
          </a>
          <button
            className={styles.submitButton}
            type="submit"
            form="login-form"
            onClick={handleSubmit}
          >
            Login
          </button>
        </form>
      </main>
    </div>
  );
}
