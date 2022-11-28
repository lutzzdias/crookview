import Head from 'next/head';
import UploadAndDisplayImage from '../components/UploadAndDisplayImage';

import styles from '../styles/AddItem.module.css';

export default function AddItem() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Crookview</title>
        <meta name="description" content="A review website for critics" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.box}>
          <div className={styles.row}>
            <div className={styles.column}>
              <UploadAndDisplayImage />
            </div>
            <div className={styles.column}>
              <input
                className={styles.title}
                type="text"
                name="title"
                placeholder="Title"
                required
              />
              <textarea
                className={styles.description}
                type="text"
                name="description"
                placeholder="Description"
                required
              />
              <input
                className={styles.createButton}
                type="submit"
                name="Create"
                value="Create"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
