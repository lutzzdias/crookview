import Head from 'next/head';

import styles from '../styles/Register.module.css';

export default function Register() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Crookview</title>
        <meta name="description" content="A review website for critics" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <form className={styles.loginForm}>
          <h1 className={styles.title}>Register</h1>
          <input
            className={styles.username}
            type="text"
            name="email"
            placeholder="Email"
            required
          />
          <input
            className={styles.username}
            type="text"
            name="username"
            placeholder="Username"
            required
          />
          <input
            className={styles.password}
            type="password"
            name="password"
            placeholder="Password"
            required
          />
          <a className={styles.register} href="login">
            Login
          </a>
          <input
            className={styles.submitButton}
            type="submit"
            name="Register"
            value="Register"
          />
        </form>
      </main>
    </div>
  );
}
