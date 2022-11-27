import styles from '../styles/ItemList.module.css';
import ItemCard from './ItemCard';

export default function ItemList(props) {
  return (
    <>
      <div className={styles.sectionName}>
        <h2>{props.sectionName}</h2>
      </div>
      <div className={styles.containerListagem}>
        {props.items.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </>
  );
}
