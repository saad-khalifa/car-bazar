import React from 'react';
import { FaBullhorn } from 'react-icons/fa'; // أيقونة الميجافون
import { GiPriceTag } from 'react-icons/gi'; // أيقونة الوسم

const ExclusiveOffersPage = () => {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>عروض حصرية</h1>
        <p style={styles.subtitle}>بأسعار تنافسية</p>
      </header>
      
      <div style={styles.mainContent}>
        <div style={styles.noOffers}>
          <GiPriceTag style={styles.icon} />
          <span style={styles.noOffersText}>لا توجد عروض حالياً</span>
        </div>

        <div style={styles.subscribeReminder}>
          <FaBullhorn style={styles.icon} />
          <p>لا تنسى الاشتراك!</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#fff',
    padding: '30px',
    maxWidth: '600px',
    margin: '0 auto',
  },
  header: {
    marginBottom: '20px',
  },
  title: {
    fontSize: '2rem',
    color: '#6A4E98',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: '1.2rem',
    color: '#6A4E98',
  },
  mainContent: {
    marginTop: '30px',
  },
  noOffers: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  noOffersText: {
    fontSize: '1.5rem',
    color: '#333',
    marginLeft: '10px',
  },
  subscribeReminder: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: '2rem',
    color: '#6A4E98',
  }
};

export default ExclusiveOffersPage;
