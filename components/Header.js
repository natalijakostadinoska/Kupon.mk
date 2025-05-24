import styles from '../styles/Home.module.css';

export default function Header({ onSearchChange }) {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.headerFlex}>

          <div className={styles.left}>
            <img src="/images/logo.png" alt="Logo" width="32" height="32" />
            <div className={styles.logo}>Kupon.mk</div>
          </div>

          <div className={styles.center}>
            <div className={styles.searchContainer}>
              <img src="/images/search-icon.png" alt="Search" className={styles.searchIcon} />
              <input
                type="text"
                className={styles.search}
                placeholder="Пребарај..."
                onChange={onSearchChange}  // <-- HERE
              />
            </div>
          </div>

          <div className={styles.right}>
            <img src="/images/cart-icon.png" alt="Cart" width="24" height="24" />
            <button className={styles.loginBtn}>
              <img src="/images/person-icon.png" alt="Profile" className={styles.loginIcon} />
              Најави се / Креирај Профил
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
