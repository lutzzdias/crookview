import Head from 'next/head';
import Link from 'next/link';
import ItemList from '../components/ItemList';
import styles from '../styles/Items.module.css';

import { items } from '../constants';

export default function Items(props) {
  const { type } = props;

  const casedType = type.charAt(0).toUpperCase() + type.slice(1);
  return (
    <div className={styles.container}>
      <Head>
        <title>Crookview</title>
        <meta name="description" content="A review website for critics" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.row}>
          <h2 className={styles.title}>{casedType}</h2>
          <Link
            href={{ pathname: 'add-item', query: { type: type } }}
            className={styles.addButton}
          >
            New {type.slice(0, -1)}
          </Link>
        </div>
        <ItemList className="" title="" items={items} />
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { type } = context.query;
  return {
    props: { type: type },
  };
}
