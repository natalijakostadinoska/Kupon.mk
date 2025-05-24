import Header from '../../components/Header.js';
import Navbar from '../../components/Navbar.js';
import styles from '../../styles/CouponDetail.module.css'; 

// Server-side data fetching for coupon details based on URL param
export async function getServerSideProps({ params }) {
  // Example: Import local JSON data containing coupons
  const coupons = (await import('../../data/coupons.json')).default;
  
  // Find the coupon matching the id parameter from URL
  const coupon = coupons.find(c => c.id === params.id);

  // If no coupon found, return 404 page
  if (!coupon) {
    return { notFound: true };
  }

  // Return coupon data as props to component
  return {
    props: { coupon },
  };
}

export default function CouponDetail({ coupon }) {
  // List of payment method icons (replace URLs with your actual images)
  const paymentMethods = [
    '/images/payment-mastercard.png',
    '/images/payment-visa.png',
    '/images/payment-diners.png',
    '/images/payment-paypal.png',
    '/images/payment-googlepay.png',
  ];

  return (
    <>
      {/* Page Header */}
      <Header />

      {/* Navigation Bar */}
      <Navbar />

      {/* Breadcrumbs navigation showing user path */}
      <nav className={styles.breadcrumbs}>
        Почетна / Купони / {coupon.title}
      </nav>

      {/* Main content area with two columns: left (details) and right (purchase card) */}
      <main className={styles.mainContainer}>
        {/* Left Column with coupon details */}
        <div className={styles.leftColumn}>
          {/* Row containing coupon logo and company name */}
          <div className={styles.logoNameRow}>
            <img src={coupon.logo} alt={`${coupon.title} logo`} className={styles.logoImage} />
            <h2 className={styles.companyName}>{coupon.title}</h2>
          </div>

          {/* Section title for coupon headline */}
          <h3 className={styles.sectionTitle}>Наслов на купон</h3>

          {/* Coupon description */}
          <p className={styles.description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Curabitur vel sem at sapien convallis facilisis. Sed ut perspiciatis unde omnis iste natus
            error sit voluptatem accusantium doloremque laudantium.
          </p>

          {/* Section title for terms of use */}
          <h2 className={styles.sectionTitle}>Услови за користење</h2>

          {/* Terms and conditions description */}
          <p className={styles.description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Curabitur vel sem at sapien convallis facilisis. Sed ut perspiciatis unde omnis iste natus
            error sit voluptatem accusantium doloremque laudantium. Duis aute irure dolor in reprehenderit
            in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Curabitur vel sem at sapien convallis facilisis. Sed ut perspiciatis unde omnis iste natus
            error sit voluptatem accusantium doloremque laudantium. Duis aute irure dolor in reprehenderit
            in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </p>
        </div>

        {/* Right Column with purchase card */}
        <aside className={styles.rightColumn}>
          <div className={styles.card}>
            {/* Large image showcasing coupon offer */}
            <img src={coupon.image} alt={coupon.title} className={styles.largeImage} />

            {/* Payment method icons displayed in a row */}
            <div className={styles.paymentMethods}>
              {paymentMethods.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt="Payment method"
                  className={styles.paymentIcon}
                />
              ))}
            </div>

            {/* Separator line */}
            <div className={styles.separator}></div>

            {/* Buy button with dynamic price */}
            <button className={styles.buyButton}>
              Купи Купон: {coupon.newPrice} мкд
            </button>
          </div>
        </aside>
      </main>
    </>
  );
}
