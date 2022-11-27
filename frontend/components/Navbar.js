import Link from 'next/link';
import styles from '../styles/Navbar.module.css';

// TODO: Change navBar item color onClick
export default function Navbar() {
  return (
    <div>
      <nav className={styles.navbar}>
        <a href="/" className="logo">
          Logo
        </a>
        <div className={styles.navLinks}>
          <ul className={styles.navMenu}>
            <li className={styles.active}>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href={{ pathname: 'items', query: { type: 'movies' } }}>
                Movies
              </Link>
            </li>
            <li>
              <Link href={{ pathname: 'items', query: { type: 'series' } }}>
                Series
              </Link>
            </li>
            <li>
              <Link href={{ pathname: 'items', query: { type: 'books' } }}>
                Books
              </Link>
            </li>
            <li>
              <Link href="login">Login</Link>
            </li>
          </ul>
        </div>
        <i
          className={`${styles.bx} ${styles.bxGridAlt} ${styles.menuHamburger}`}
        ></i>
      </nav>
    </div>
  );
}
