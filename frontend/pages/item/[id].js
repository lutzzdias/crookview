import Head from 'next/head';
import Image from 'next/image';
import Review from '../../components/Review';
import ItemList from '../../components/ItemList';
import styles from '../../styles/Item.module.css';
import itemImage from '../../images/shrek.jpg';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Info(props) {
  const [items, setItems] = useState([]);

  const getItems = async () => {
    const response = await axios.get('http://localhost:3060/api/item', {
      params: { type: 'all' },
    });
    return response.data;
  };

  useEffect(() => {
    getItems().then((res) => setItems(res));
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Crookview</title>
        <meta name="description" content="A review website for critics" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.itemInfo}>
          <div className={styles.row}>
            <Image
              src={itemImage}
              alt={props.item.title}
              className={styles.itemImg}
            />
            <div className={styles.column}>
              <h2>{props.item.title}</h2>
              <p>{props.item.description}</p>
            </div>
          </div>
        </div>

        <div className={styles.reviews}>
          <h3>Reviews:</h3>
          <ul>
            {props.item.reviews.map((review) => (
              <Review key={review.id} review={review} />
            ))}
          </ul>
        </div>

        <section className={styles.addReviewArea}>
          <h3>Add a review</h3>
          <form className={styles.addReviewForm} method="POST" action="">
            <div className={styles.row}>
              <input
                className={styles.title}
                type="text"
                defaultValue="Title"
              />
              <input className={styles.rating} type="number" defaultValue="5" />
            </div>
            <textarea
              className={styles.body}
              type="text"
              defaultValue="Description"
            />
            <button
              form="review_form"
              className={styles.addButton}
              type="submit"
            >
              ADD
            </button>
          </form>
        </section>

        <section className={styles.similarMovies}>
          <ItemList sectionName="Recommended" items={items} />
        </section>
      </main>
    </div>
  );
}

export async function getStaticPaths() {
  const allItems = await axios.get('http://localhost:3060/api/item', {
    params: { type: 'all' },
  });

  const itemsIds = allItems.data.map((item) => {
    return {
      params: {
        id: item.id,
      },
    };
  });

  return { paths: itemsIds, fallback: true };
}

export async function getStaticProps({ params }) {
  const item = await axios.get(`http://localhost:3060/api/item/${params.id}`);
  const result = {
    props: {
      item: item.data,
    },
  };

  return result;
}
