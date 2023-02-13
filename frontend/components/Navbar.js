import Link from 'next/link';
import styles from '../styles/Navbar.module.css';

// TODO: Change navBar item color onClick
export default function Navbar() {
  return (
    <div>
      <nav className={styles.navbar}>
        <a href="/" className="logo">
          Crookview
        </a>
        <div className={styles.navLinks}>
          <ul className={styles.navMenu}>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link
                href={{
                  pathname: 'http://localhost:3000/items',
                  query: { type: 'movies' },
                }}
              >
                Movies
              </Link>
            </li>
            <li>
              <Link
                href={{
                  pathname: 'http://localhost:3000/items',
                  query: { type: 'series' },
                }}
              >
                Series
              </Link>
            </li>
            <li>
              <Link
                href={{
                  pathname: 'http://localhost:3000/items',
                  query: { type: 'books' },
                }}
              >
                Books
              </Link>
            </li>
            <li>
              <Link href="http://localhost:3000/login">Login</Link>
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
