import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Button, Alert, Container } from 'react-bootstrap';
import axios from 'axios';

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  // جلب المفضلات من الـ API عند تحميل الصفحة
  useEffect(() => {
    const fetchFavorites = async () => {
      if(token){
      try {
        
        const response = await axios.get('http://localhost:8000/api/favorites', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFavorites(response.data); // تعيين المفضلات
        setLoading(false);
      } catch (err) {
        setError('حدث خطأ أثناء جلب المفضلات');
        setLoading(false);
      }}
    };

    fetchFavorites();
  }, []);

  // إزالة السيارة من المفضلة عبر الـ API
  const handleRemoveFavorite = async (carId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:8000/api/favorites/${carId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // تحديث المفضلات بعد الحذف
      setFavorites(favorites.filter(car => car.car.id !== carId));
    } catch (err) {
      setError('حدث خطأ أثناء إزالة السيارة من المفضلة');
    }
  };

  if (loading && token) {
    return <div>جاري تحميل المفضلات...</div>;
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  if (favorites.length === 0 && token) {
    return <div>لا توجد سيارات مفضلة لديك حالياً.</div>;
  }
  if(!token){
    return <h3 className='text-center'>يرجى تسجيل الدخول اولا</h3>
  }

  return (
    <Container className="favorites mt-5">
      <h2 style={{ marginBottom:'75px' }} className='text-center'>المفضلة</h2>
      <Row >
        {favorites.map(car => (
          <Col key={car.car.id} md={4}>
            <Card className="mb-4">
              <Card.Img variant="top" style={{ width: '100%', height: '400px', objectFit: 'cover'}} src={`http://localhost:8000/storage/${car.car.image}`} />
              <Card.Body>
                <Card.Title>{car.car.name}</Card.Title>
                <Card.Text>
                  <strong>السعر:</strong> {car.car.price} ل.س
                  <br />
                  <strong>السنة:</strong> {car.car.year}
                </Card.Text>
                <span style={{ display:'flex',alignItems:'center',justifyContent:'space-between' }}>
                  <Button 
                  variant="danger" 
                  onClick={() => handleRemoveFavorite(car.car.id)}
                >
                  إزالة من المفضلة
                </Button>
                <Button 
                  variant="info" 
                  className="mt-2"
                  onClick={() => window.location.href = `/car/${car.car.id}`}
                >
                  عرض التفاصيل
                </Button>
                </span>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Favorites;
