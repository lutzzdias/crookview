import Image from 'next/image';
import styles from '../styles/ItemCard.module.css';
import itemImage from '../images/shrek.jpg';

export default function ItemCard(props) {
  return (
    <div className={styles.item}>
      <div className={styles.containerImg}>
        <Image src={itemImage} className={styles.itemImg} />
      </div>

      <div className={styles.itemInfo}>
        <span className={styles.itemType}>{props.item.type}</span>
        <a className={styles.itemName}>{props.item.name}</a>
        <span className={styles.itemDescription}>{props.item.description}</span>
      </div>
    </div>
  );
}
