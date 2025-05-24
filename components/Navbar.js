import { useState } from 'react';
import styles from '../styles/Home.module.css';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className={styles.nav}>
            <div className={styles.container}>
                {/* Hamburger Button - shows on small screens */}
                <button
                    className={styles.hamburger}
                    onClick={() => setIsOpen(prev => !prev)}
                    aria-label="Toggle menu"
                    aria-expanded={isOpen}
                    type="button"
                >
                    &#9776;
                </button>

                {/* Menu Items */}
                <ul className={`${styles.navList} ${isOpen ? styles.navListOpen : ''}`}>
                    <li>
                        <img src="/images/travel-icon.png" alt="Патувања" className={styles.navIcon} />
                        Патувања
                    </li>
                    <li>
                        <img src="/images/sport-icon.png" alt="Спорт" className={styles.navIcon} />
                        Спорт
                    </li>
                    <li>
                        <img src="/images/clothes-icon.png" alt="Облека" className={styles.navIcon} />
                        Облека
                    </li>
                    <li>
                        <img src="/images/health-icon.png" alt="Здравје" className={styles.navIcon} />
                        Здравје
                    </li>
                    <li>
                        <img src="/images/food-icon.png" alt="Храна" className={styles.navIcon} />
                        Храна
                    </li>
                    <li>
                        <img src="/images/experience-icon.png" alt="Искуства" className={styles.navIcon} />
                        Искуства
                    </li>
                    <li>
                        <img src="/images/entertainment-icon.png" alt="Забава" className={styles.navIcon} />
                        Забава
                    </li>
                    <li>
                        <img src="/images/nearby-icon.png" alt="Во близина" className={styles.navIcon} />
                        Во близина
                    </li>
                </ul>
            </div>
        </nav>
    );
}
