import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaHeart, FaRegHeart } from 'react-icons/fa'; // استيراد الأيقونات

function UsedCarListings() {
  const [cars, setCars] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState(null);

  // جلب السيارات المستعملة والمفضلات
  useEffect(() => {
    const token = localStorage.getItem('token'); // الحصول على التوكن من localStorage

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // طلب السيارات المستعملة
    axios.get('http://localhost:8000/api/used-cars', config)
      .then(response => {
        setCars(response.data);
      })
      .catch(error => setError('حدث خطأ أثناء جلب السيارات المستعملة'));

    // جلب المفضلات من الـ API
    if(token){
    axios.get('http://localhost:8000/api/favorites', config)
      .then(response => {
        setFavorites(response.data.map(fav => fav.car.id)); // تخزين معرّف السيارة فقط
      })
      .catch(error => setError('حدث خطأ أثناء جلب المفضلات'));
    }
  }, []);

  // إضافة سيارة إلى المفضلة
  const handleAddToFavorites = (carId) => {
    const token = localStorage.getItem('token');
    axios.post(`http://localhost:8000/api/favorites/${carId}`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      // إضافة السيارة إلى المفضلة في قاعدة البيانات
      setFavorites(prevFavorites => [...prevFavorites, carId]);
    })
    .catch(error => {
      console.log('حدث خطأ:', error.response);
    });
  };

  // إزالة سيارة من المفضلة
  const handleRemoveFromFavorites = (carId) => {
    const token = localStorage.getItem('token');
    axios.delete(`http://localhost:8000/api/favorites/${carId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      // إزالة السيارة من المفضلة في قاعدة البيانات
      setFavorites(prevFavorites => prevFavorites.filter(id => id !== carId));
    })
    .catch(error => {
      console.log('حدث خطأ:', error.response);
    });
  };

  return (
    <div className="used-car-listings mt-5">
      <h2>السيارات المستعملة</h2>

      {error && <Alert variant="danger">{error}</Alert>}

      <Row className="mt-4">
        {cars.length > 0 ? (
          cars.map(car => (
            <Col md={4} key={car.id}>
              <Card>
                <Card.Img variant="top" src={`http://localhost:8000/storage/${car.image}`} />
                <Card.Body>
                  <Card.Title>{car.name}</Card.Title>
                  <Card.Text>
                    <strong>السعر:</strong> {car.price} ل.س
                    <br />
                    <strong>السنة:</strong> {car.year}
                  </Card.Text>
                  <span style={{ display:'flex',alignItems:'center',justifyContent:'space-around' }}>
<span>
                  {/* زر تفاصيل الإعلان */}
                  <Link to={`/car/${car.id}`}>
                    <Button variant="primary" className="mt-2">تفاصيل الإعلان</Button>
                  </Link>
                  </span>
<span>
                  {/* زر المفضلة كأيقونة */}
                  {favorites.includes(car.id) ? (
                    <Button
                      variant="danger"
                      onClick={() => handleRemoveFromFavorites(car.id)}
                      className="mt-2"
                    >
                      <FaHeart /> {/* أيقونة مملوءة */}
                    </Button>
                  ) : (
                    <Button
                      variant="warning"
                      onClick={() => handleAddToFavorites(car.id)}
                      className="mt-2"
                    >
                      <FaRegHeart /> {/* أيقونة فارغة */}
                    </Button>
                  )}
                  </span>
                  </span>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <div>لا توجد سيارات مستعملة حالياً.</div>
        )}
      </Row>
    </div>
  );
}

export default UsedCarListings;
