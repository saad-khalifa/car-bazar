import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function MyAccount() {
  const [user, setUser] = useState(null);
  const [cars, setCars] = useState([]);

  useEffect(() => {
    // فرضًا أن التوكن موجود في التخزين المحلي
    const token = localStorage.getItem('token');

    // جلب بيانات المستخدم والمركبات المعروضة
    axios.get('http://localhost:8000/api/user', {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then(response => {
        setUser(response.data.user);
        setCars(response.data.cars);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div className="my-account mt-5">
      <h2>حسابي</h2>
      {user && (
        <Card>
          <Card.Body>
  <Card.Title>{user.name}</Card.Title>
  <Card.Text>
    <strong>البريد الإلكتروني:</strong> {user.email}
  </Card.Text>
  <Link to="/profile-edit">
    <Button variant="primary">تعديل الملف الشخصي</Button>
  </Link>
</Card.Body>
        </Card>
      )}

      <h3 className="mt-4">سياراتي المعروضة</h3>
      {cars.length > 0 ? (
        cars.map(car => (
          <Card key={car.id} className="my-2">
            <Card.Body>
              <Card.Title>{car.name}</Card.Title>
              <Card.Text>
                <strong>السعر:</strong> {car.price} ل.س
                <br />
                <strong>السنة:</strong> {car.year}
              </Card.Text>
              <Button variant="danger">حذف السيارة</Button>
            </Card.Body>
          </Card>
        ))
      ) : (
        <p>لا توجد سيارات معروضة حالياً.</p>
      )}
    </div>
  );
}

export default MyAccount;
