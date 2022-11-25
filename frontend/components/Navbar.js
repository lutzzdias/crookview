import styles from '../styles/Navbar.module.css';

// TODO: Change navBar item color onClick
export default function Navbar() {
  return (
    <div>
      <nav className={styles.navbar}>
        <a href="#" className="logo">
          Logo
        </a>
        <div className={styles.navLinks}>
          <ul className={styles.navMenu}>
            <li className={styles.active}>
              <a href="">Home</a>
            </li>
            <li>
              <a href="">Movies</a>
            </li>
            <li>
              <a href="">Series</a>
            </li>
            <li>
              <a href="">Books</a>
            </li>
            <li>
              <a href="">Login</a>
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
