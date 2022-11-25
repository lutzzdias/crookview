import styles from '../styles/ItemList.module.css';
import ItemCard from './ItemCard';

export default function ItemList() {
  const items = [
    {
      id: 0,
      type: 'tipo',
      name: 'nome01',
      description: 'descrição',
    },
    {
      id: 1,
      type: 'tipo',
      name: 'nome02',
      description: 'descrição',
    },
    {
      id: 2,
      type: 'tipo',
      name: 'nome03',
      description: 'descrição',
    },
    {
      id: 3,
      type: 'tipo',
      name: 'nome04',
      description: 'descrição',
    },
    {
      id: 4,
      type: 'tipo',
      name: 'nome05',
      description: 'descrição',
    },
    {
      id: 5,
      type: 'tipo',
      name: 'nome06',
      description: 'descrição',
    },
  ];

  return (
    <div className={styles.containerListagem}>
      {items.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </div>
  );
}
