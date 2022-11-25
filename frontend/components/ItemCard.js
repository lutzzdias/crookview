import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/ItemCard.module.css';
import itemImage from '../images/shrek.jpg';

export default function ItemCard(props) {
  return (
    <Link href={`/item/${props.item.id}`} className={styles.item}>
      <div className={styles.containerImg}>
        <Image src={itemImage} className={styles.itemImg} />
      </div>

      <div className={styles.itemInfo}>
        <span className={styles.itemType}>{props.item.type}</span>
        <span className={styles.itemName}>{props.item.name}</span>
        <span className={styles.itemDescription}>{props.item.description}</span>
      </div>
    </Link>
  );
}
