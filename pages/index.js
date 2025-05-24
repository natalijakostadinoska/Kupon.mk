import Head from 'next/head';
import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';
import '../styles/Globals.css';
import coupons from '../data/coupons.json';
import Link from 'next/link';
import Header from '../components/Header';
import Navbar from '../components/Navbar';

export default function Home() {
  const [shuffledCoupons, setShuffledCoupons] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [locationFilter, setLocationFilter] = useState('');

  useEffect(() => {
    const array = [...coupons];
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    setShuffledCoupons(array);
  }, []);

  // Get unique locations from coupons for filter dropdown
  const uniqueLocations = Array.from(
    new Set(coupons.map(coupon => coupon.location.split(',')[0]))
  );

  // Filter coupons by search and location
  let filteredCoupons = shuffledCoupons.filter(coupon =>
    (coupon.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    coupon.description.toLowerCase().includes(searchTerm.toLowerCase()))
    && (locationFilter === '' || coupon.location.split(',')[0] === locationFilter)
  );

  // Sort coupons
  if (sortOption) {
    filteredCoupons.sort((a, b) => {
      if (sortOption === 'titleAsc') return a.title.localeCompare(b.title);
      if (sortOption === 'titleDesc') return b.title.localeCompare(a.title);
      if (sortOption === 'discountDesc') return (b.oldPrice - b.newPrice) - (a.oldPrice - a.newPrice);
      if (sortOption === 'discountAsc') return (a.oldPrice - a.newPrice) - (b.oldPrice - b.newPrice);
      return 0;
    });
  }

  const onSearchChange = (e) => setSearchTerm(e.target.value);

  return (
    <div>
      <Header onSearchChange={onSearchChange} />
      <Navbar />
      <Head>
        <title>Kupon.mk</title>
        <link rel="icon" href="/images/logo.png" />
      </Head>

      <div className={styles.container}>

        {/* Controls for sorting and filtering */}
        <div className={styles.controls}>
          <select
            className={styles.select}
            aria-label="Sort coupons"
            value={sortOption}
            onChange={e => setSortOption(e.target.value)}
          >
            <option value="">Сортирај по</option>
            <option value="titleAsc">Име (А → Ш)</option>
            <option value="titleDesc">Име (Ш → А)</option>
            <option value="discountDesc">Попуст (Висок → Низок)</option>
            <option value="discountAsc">Попуст (Низок → Висок)</option>
          </select>

          <select
            className={styles.select}
            aria-label="Filter by location"
            value={locationFilter}
            onChange={e => setLocationFilter(e.target.value)}
          >
            <option value="">Сите локации</option>
            {uniqueLocations.map(loc => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>

        <section className={styles.popularSection}>
          <div className={styles.popularHeader}>
            <div className={styles.popularRow}>
              <h2 className={styles.popularTitle}>
                <span className={styles.popularWord}>Популарни</span>{' '}
                <span className={styles.offerWord}>понуди</span>
              </h2>

              <div className={styles.locations}>
                {coupons.slice(0, 3).map(coupon => (
                  <img
                    key={coupon.id}
                    src={coupon.logo}
                    alt={`${coupon.title} logo`}
                    className={styles.logocircle}
                  />
                ))}
                <span className={styles.moreLocations}>+100</span>
              </div>

              <button className={styles.viewAllBtn}>Види ги сите</button>
            </div>
          </div>

          <div className={styles.grid}>
            {filteredCoupons.slice(0, 12).map(coupon => (
              <Link key={coupon.id} href={`/coupon/${coupon.id}`} className={styles.card}>
                <div className={styles.topImageWrapper}>
                  <img src={coupon.image} alt={coupon.title} className={styles.topImage} />
                </div>

                <div className={styles.middleRow}>
                  <img src={coupon.logo} alt={`${coupon.title} logo`} className={styles.logoImg} />
                  <div className={styles.textContent}>
                    <h3>{coupon.title}</h3>
                    <p>{coupon.description}</p>
                  </div>
                </div>

                <div className={styles.separator}></div>

                <div className={styles.bottomRow}>
                  <div className={styles.location}>
                    <p>
                      <img
                        src="/images/nearby-icon.png"
                        alt="Location Icon"
                        className={styles.nearbyIcon}
                      />
                      <strong>{coupon.location.split(',')[0]}</strong>
                    </p>
                    <p>{coupon.location.split(',')[1]?.trim()}</p>
                  </div>
                  <div className={styles.priceColumn}>
                    <p className={styles.oldPrice}><s>{coupon.oldPrice} МКД</s></p>
                    <p className={styles.newPrice}>{coupon.newPrice} МКД</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
