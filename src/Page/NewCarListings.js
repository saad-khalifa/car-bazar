import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';

function NewCarListings() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    // جلب التوكن من الـ localStorage أو الـ sessionStorage
    const token = localStorage.getItem('token'); // أو يمكنك استخدام sessionStorage.getItem('token')

    // إعداد الهيدر مع التوكن
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // طلب السيارات الجديدة مع إضافة التوكن في الهيدر
    axios.get('http://localhost:8000/api/new-cars', config)
      .then(response => {
        setCars(response.data);
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <div className="new-car-listings mt-5">
      <h2>السيارات الجديدة</h2>

      <Row className="mt-4">
        {cars.length > 0 ? (
          cars.map(car => (
            <Col md={4} key={car.id}>
              <Card>
                <Card.Img variant="top"
                  style={{ width: '100%', height: '400px', objectFit: 'cover' }} 
                src={`http://localhost:8000/storage/${car.image}`} />
                <Card.Body>
                  <Card.Title>{car.name}</Card.Title>
                  <Card.Text>
                    <strong>السعر:</strong> {car.price} ل.س
                    <br />
                    <strong>السنة:</strong> {car.year}
                  </Card.Text>
                  {/* زر تفاصيل الإعلان */}
                  <Link to={`/car/${car.id}`}>
                    <Button variant="primary">تفاصيل الإعلان</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <div>لا توجد سيارات جديدة حالياً.</div>
        )}
      </Row>
    </div>
  );
}

export default NewCarListings;
