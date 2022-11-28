import Head from 'next/head';
import { useEffect, useState } from 'react';
import axios from 'axios';

import ItemList from '../components/ItemList';

import styles from '../styles/Home.module.css';

export default function Home() {
  const [trendingItems, setTrendingItems] = useState([]);
  const [latestItems, setLatestItems] = useState([]);

  const getTrendingItems = async () => {
    const response = await axios.get('http://localhost:3060/api/item/trending');
    return response.data;
  };
  const getLatestItems = async () => {
    const response = await axios.get('http://localhost:3060/api/item/latest');
    return response.data;
  };

  useEffect(() => {
    getTrendingItems().then((res) => setTrendingItems(res));
    getLatestItems().then((res) => setLatestItems(res));
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Crookview</title>
        <meta name="description" content="A review website for critics" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>Crookview</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut non nunc
          ultricies, imperdiet lectus non, accumsan felis. Nulla ornare
          tincidunt fringilla. Vestibulum ante ipsum primis in faucibus orci
          luctus et ultrices posuere cubilia curae; Cras ac ligula nec velit
          pulvinar consequat. Pellentesque tincidunt, augue ac mattis euismod,
          arcu massa venenatis massa, a commodo ipsum massa vitae enim. Ut a
          elit in dui efficitur tincidunt. Maecenas posuere non ex et hendrerit.
          Suspendisse varius est sapien, ut iaculis sapien auctor eu. Nam vitae
          felis eget lorem maximus consectetur. Nam vehicula sem vitae enim
          interdum mattis. Curabitur elementum, sem eget mollis mattis, felis
          orci varius ipsum, nec placerat ligula massa in nulla. Phasellus sit
          amet ligula eget turpis imperdiet finibus sed at neque. Fusce
          pellentesque, diam sed finibus gravida, diam purus lobortis nulla, a
          luctus massa nisl vel lectus. Etiam ut metus non odio bibendum
          iaculis. Nam luctus arcu felis, ut eleifend felis pulvinar a. Etiam at
          risus efficitur, efficitur ante eget, finibus odio.
        </p>
        <ItemList sectionName="Trending" items={trendingItems} />
        <ItemList sectionName="Latest" items={latestItems} />
      </main>
    </div>
  );
}
