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
  const [formData, setFormData] = useState({ title: '', body: '', rating: 5 });
  const [item, setItem] = useState(props.item);

  const getItems = async () => {
    const response = await axios.get('http://localhost:3060/api/item', {
      params: { type: 'all' },
    });
    return response.data;
  };

  useEffect(() => {
    getItems().then((res) => setItems(res));
  }, []);

  // TODO: Fix setFormData
  const handleChange = (event) => {
    const target = event.target.name;
    setFormData((prevData) => {
      return {
        ...prevData,
        [target]: event.target.value.trim(),
      };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    (async () => {
      const updatedItem = await axios.post('http://localhost:3060/api/review', {
        likeCount: 0,
        itemId: props.item.id,
        userId: localStorage.getItem('user'),
        ...formData,
      });
      console.log(updatedItem.data);
      setItem(updatedItem.data);
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
        <div className={styles.itemInfo}>
          <div className={styles.row}>
            <Image
              src={itemImage}
              alt={item.title}
              className={styles.itemImg}
            />
            <div className={styles.column}>
              <h2>{item.title}</h2>
              <p>{item.description}</p>
            </div>
          </div>
        </div>

        <div className={styles.reviews}>
          <h3>Reviews:</h3>
          <ul>
            {item.reviews.map((review) => (
              <Review key={review.id} review={review} />
            ))}
          </ul>
        </div>

        <section className={styles.addReviewArea}>
          <h3>Add a review</h3>
          <form
            className={styles.addReviewForm}
            name="review_form"
            method="POST"
            action=""
          >
            <div className={styles.row}>
              <input
                className={styles.title}
                name="title"
                type="text"
                placeholder="Title"
                onChange={handleChange}
              />
              <input
                className={styles.rating}
                name="rating"
                type="number"
                defaultValue="5"
                onChange={handleChange}
              />
            </div>
            <textarea
              className={styles.body}
              name="body"
              type="text"
              placeholder="Description"
              onChange={handleChange}
            />
            <button
              form="review_form"
              className={styles.addButton}
              type="submit"
              onClick={handleSubmit}
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
