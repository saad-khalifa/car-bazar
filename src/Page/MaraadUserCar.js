import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

function MaraadUserCar() {
  const [cars, setCars] = useState([]);
  const [favorites, setFavorites] = useState([]); // لتخزين المفضلة
  const { id } = useParams();  // جلب المعرف من الرابط

  useEffect(() => {
    // جلب السيارات الخاصة بالمستخدم
    axios.get(`http://localhost:8000/api/users/${id}/cars`)
      .then(response => {
        setCars(response.data);
      })
      .catch(error => {
        console.error('هناك خطأ في جلب السيارات:', error);
      });

    // جلب المفضلات الخاصة بالمستخدم
    const fetchFavorites = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get('http://localhost:8000/api/favorites', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setFavorites(response.data.map(fav => fav.car_id)); // تعيين المفضلات
        } catch (error) {
          console.error('خطأ في جلب المفضلات:', error);
        }
      }
    };

    fetchFavorites();
  }, [id]);  // تحديث البيانات عند تغيير الـ id

  const handleAddToFavorites = (carId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('يرجى تسجيل الدخول أولاً');
      return;
    }

    axios.post(`http://localhost:8000/api/favorites/${carId}`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        setFavorites(prevFavorites => [...prevFavorites, carId]);
      })
      .catch(error => {
        console.log('حدث خطأ:', error.response);
      });
  };

  const handleRemoveFromFavorites = (carId) => {
    const token = localStorage.getItem('token');
    axios.delete(`http://localhost:8000/api/favorites/${carId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        setFavorites(prevFavorites => prevFavorites.filter(id => id !== carId));
      })
      .catch(error => {
        console.log('حدث خطأ:', error.response);
      });
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">السيارات الخاصة بالمعرض</h2>
      <Row className="mt-4">
        {cars.length > 0 ? (
          cars.map(car => (
            <Col md={4} key={car.id}>
              <Card style={{ boxShadow: '0 4px 8px rgba(0,0,0,0.1)', borderRadius: '10px', transition: 'all 0.3s ease' }}>
                {/* صورة السيارة */}
                <Card.Img 
                  variant="top" 
                  src={`http://localhost:8000/storage/${car.image}`} 
                  style={{ borderRadius: '10px 10px 0 0' }} 
                />
                <Card.Body>
                  <Card.Title>{car.name}</Card.Title>
                  <Card.Text>
                    <strong>السعر:</strong> {car.price} ل.س
                    <br />
                    <strong>السنة:</strong> {car.year}
                    <br />
                    <strong>الحالة:</strong> {car.condition}
                  </Card.Text>
                  {/* رابط تفاصيل السيارة */}
                  <Link to={`/car/${car.id}`}>
                    <Button variant="primary" className="w-100 mb-2">تفاصيل الإعلان</Button>
                  </Link>

                  {/* إضافة أو إزالة من المفضلة */}
                  {favorites.includes(car.id) ? (
                    <Button
                      variant="danger"
                      onClick={() => handleRemoveFromFavorites(car.id)}
                      className="w-100"
                    >
                      <span>ازالة من المفضلة </span><FaHeart /> {/* أيقونة مملوءة */}
                    </Button>
                  ) : (
                    <Button
                      variant="warning"
                      onClick={() => handleAddToFavorites(car.id)}
                      className="w-100"
                    >
                      <span>اظافة الى المفضلة  </span><FaRegHeart /> {/* أيقونة فارغة */}
                    </Button>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <div className="col-12 text-center">
            <p>لا توجد سيارات لهذا المعرض.</p>
          </div>
        )}
      </Row>
    </div>
  );
}

export default MaraadUserCar;
