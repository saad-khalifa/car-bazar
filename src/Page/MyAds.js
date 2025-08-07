import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';

function MyAds() {
  const [cars, setCars] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // جلب التوكن من localStorage أو من الـ session
    const token = localStorage.getItem('token');  // أو يمكنك استخدام sessionStorage.getItem('token')

    if (!token) {
      setError('الرجاء تسجيل الدخول أولاً');
      return;
    }

    // إعداد الهيدر مع التوكن
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // إرسال طلب GET لجلب الإعلانات الخاصة بالمستخدم
    axios.get('http://localhost:8000/api/user-cars', config)
      .then(response => {
        setCars(response.data);
      })
      .catch(error => {
        setError('حدث خطأ أثناء جلب الإعلانات.');
        console.log(error);
      });
  }, []);

  const deleteCar = (carId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('الرجاء تسجيل الدخول أولاً');
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // طلب حذف الإعلان
    axios.delete(`http://localhost:8000/api/cars/${carId}`, config)
      .then(response => {
        // تحديث الإعلانات بعد الحذف
        setCars(cars.filter(car => car.id !== carId));
      })
      .catch(error => {
        setError('حدث خطأ أثناء حذف الإعلان.');
        console.log(error);
      });
  };

  return (
    <div className="my-ads mt-5">
      <h2>إعلاناتي</h2>

      {error && <div className="alert alert-danger">{error}</div>}

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
                    <br />
                    {/* عرض حالة الموافقة أو الرفض */}
                    {car.approved === 1 ? (
                      <span className="badge bg-success">تمت الموافقة</span>
                    ) : car.approved === 0 ? (
                      <div>
                        <span className="badge bg-danger">مرفوض</span>
                        <br />
                        <strong>سبب الرفض: </strong>{car.rejection_reason}
                      </div>
                    ) : (
                      <span className="badge bg-warning">قيد المراجعة</span>
                    )}
                  </Card.Text>

                  {/* أزرار تعديل وحذف */}
                  <Link to={`/car/edit/${car.id}`}>
                    <Button variant="warning" className="me-2">تعديل الإعلان</Button>
                  </Link>
                  <Button 
                    variant="danger" 
                    onClick={() => deleteCar(car.id)} 
                    className="me-2"
                  >
                    حذف الإعلان
                  </Button>
                  
                  {/* زر تفاصيل الإعلان */}
                  <Link to={`/car/${car.id}`}>
                    <Button variant="primary">تفاصيل الإعلان</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <div>لا توجد إعلانات خاصة بك حالياً.</div>
        )}
      </Row>
    </div>
  );
}

export default MyAds;
