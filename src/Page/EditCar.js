import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Form, Button, Col, Row, Image } from 'react-bootstrap';

function EditCar() {
  const [car, setCar] = useState({
    name: '',
    price: '',
    year: '',
    mileage: '',
    condition: '',
    engine: '',
    image: null,
  });
  const [error, setError] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);

  const { carId } = useParams();  // الحصول على معرّف السيارة من URL
    const token = localStorage.getItem('token');

  useEffect(() => {
    const token = localStorage.getItem('token');
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

    // جلب بيانات السيارة من الـ API
    axios.get(`http://localhost:8000/api/cars/${carId}`, config)
      .then((response) => {
        setCar(response.data);
        setImagePreview(`http://localhost:8000/storage/${response.data.image}`);
      })
      .catch((err) => {
        setError('فشل في جلب بيانات السيارة');
      });
  }, [carId]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCar({ ...car, image: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append('name', car.name);
  formData.append('price', car.price);
  formData.append('year', car.year);
  formData.append('mileage', car.mileage);
  formData.append('condition', car.condition);
  formData.append('engine', car.engine);

  if (car.image) {
    formData.append('image', car.image);
  }
console.log(formData)
  try {
    const response = await axios.put(`http://localhost:8000/api/cars/${car.id}`, formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('تم التعديل بنجاح:', response.data);
  } catch (error) {
    if (error.response && error.response.status === 422) {
      const errors = error.response.data.errors;
      let errorMessage = 'يرجى التحقق من الحقول التالية: ';
      for (const key in errors) {
        errorMessage += `${key}: ${errors[key].join(', ')}. `;
      }
      setError(errorMessage);
    } else {
      setError('حدث خطأ غير متوقع.');
    }
  }
};




  return (
    <div className="edit-car">
      <h2>تعديل الإعلان</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group controlId="name">
              <Form.Label>اسم السيارة</Form.Label>
              <Form.Control
                type="text"
                value={car.name}
                onChange={(e) => setCar({ ...car, name: e.target.value })}
                required
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="price">
              <Form.Label>السعر</Form.Label>
              <Form.Control
                type="text"
                value={car.price}
                onChange={(e) => setCar({ ...car, price: e.target.value })}
                required
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="year">
              <Form.Label>السنة</Form.Label>
              <Form.Control
                type="text"
                value={car.year}
                onChange={(e) => setCar({ ...car, year: e.target.value })}
                required
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="mileage">
              <Form.Label>المسافة المقطوعة</Form.Label>
              <Form.Control
                type="text"
                value={car.mileage}
                onChange={(e) => setCar({ ...car, mileage: e.target.value })}
                required
              />
            </Form.Group>
          </Col>

          <Col md={6}>
      <Form.Group controlId="condition">
        <Form.Label>الحالة</Form.Label>
        <Form.Control
          as="select"
          value={car.condition}
          onChange={(e) => setCar({ ...car, condition: e.target.value })}
          required
        >
          <option value="">اختر الحالة</option>
          <option value="جديد">جديد</option>
          <option value="مستعمل">مستعمل</option>
        </Form.Control>
      </Form.Group>
    </Col>

          <Col md={6}>
            <Form.Group controlId="engine">
              <Form.Label>المحرك</Form.Label>
              <Form.Control
                type="text"
                value={car.engine}
                onChange={(e) => setCar({ ...car, engine: e.target.value })}
                required
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="image">
              <Form.Label>الصورة</Form.Label>
              <Form.Control
                type="file"
                onChange={handleImageChange}
              />
            </Form.Group>

            {imagePreview && (
              <Image src={imagePreview} alt="Preview" width="100%" height="auto" />
            )}
          </Col>
        </Row>

        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? 'جارٍ الحفظ...' : 'حفظ التعديلات'}
        </Button>
      </Form>
    </div>
  );
}

export default EditCar;
