import React, { useEffect, useState } from 'react';
import { Row, Col, Card, ListGroup, Button, Alert, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function CarDetail() {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true); // حالة تحميل البيانات
  const [showPhone, setShowPhone] = useState(false); // حالة لعرض الرقم
  const [showEntertainment, setShowEntertainment] = useState(false); // حالة لعرض الترفيه
  const [showComfort, setShowComfort] = useState(false); // حالة لعرض الراحة
  const [showSecurity, setShowSecurity] = useState(false); // حالة لعرض الأمان
  const [showSeats, setShowSeats] = useState(false); // حالة لعرض المقاعد
  const [showSpecifications, setShowSpecifications] = useState(false); // حالة لعرض مواصفات السيارة
  const [user, setUser] = useState(null); // لتخزين بيانات المستخدم
   const token = localStorage.getItem('token'); 
  useEffect(() => {

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // جلب بيانات المستخدم
    if(token){
    axios.get('http://localhost:8000/api/user', config)
      .then(response => {
        setUser(response.data); // تخزين بيانات المستخدم
      })
      .catch(error => {
        console.log(error);
      });
    }
    // طلب تفاصيل السيارة
    axios.get(`http://localhost:8000/api/car/${id}`, config)
      .then(response => {
        setCar(response.data);
        setLoading(false); // عند اكتمال التحميل، نغير حالة التحميل
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
        <p>جارِ تحميل التفاصيل...</p>
      </div>
    );
  }

  if (!car) {
    return <div>السيارة غير موجودة.</div>;
  }

  // تحويل القيم إلى مصفوفات إذا كانت بتنسيق JSON
  const comfortList = car.comfort ? JSON.parse(car.comfort) : [];
  const entertainmentList = car.entertainment ? JSON.parse(car.entertainment) : [];
  const securityList = car.security ? JSON.parse(car.security) : [];
  const seatsList = car.seats ? JSON.parse(car.seats) : [];

  return (
    <div className="car-detail mt-5">
      <Row>
        <Col md={6} className="mb-4">
          <Card>
            <Card.Img
              variant="top"
              src={`http://localhost:8000/storage/${car.image}`}
              style={{ width: '100%', height: '500px', objectFit: 'contain' }} // تعديل حجم الصورة
            />
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              {/* عرض اسم المالك */}
              {user && token (
                <Card.Text>
                  <strong>اسم المالك:</strong> {user['user'].name}
                </Card.Text>
              )}
             <strong>السيارة :</strong> {car.name}
              <Card.Text>
                <strong>السعر:</strong> {car.price} ل.س
                <br />
                <strong>السنة:</strong> {car.year}
                <br />
                <strong>المسافة المقطوعة:</strong> {car.mileage}
                <br />
                <strong>الحالة:</strong> {car.condition}
                <br />
                <strong>المحرك:</strong> {car.engine}
              </Card.Text>

              {/* زر الاتصال بالمالك */}
              <Button
                variant="primary"
                className="w-100"
                onClick={() => setShowPhone(!showPhone)} // عند النقر نقوم بتغيير الحالة
              >
                {showPhone ? 'إخفاء رقم الهاتف' : 'اتصل بالمالك'}
              </Button>

              {/* عرض رقم الهاتف إذا كانت الحالة مفعلة */}
              {showPhone && (
                <Alert variant="info" className="mt-3">
                  <strong>رقم الهاتف:</strong> {car.phone_number}
                </Alert>
              )}

              {/* نص لذكر رقم الإعلان عند الاتصال مع خدمة العملاء */}
              <div className="mt-3">
                <h4>رقم الاعلان : <strong>{car.id}</strong></h4>
                <h4>اذكر رقم الإعلان عند الاتصال مع خدمة العملاء</h4>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-4">
        {/* مواصفات السيارة */}
        <Col md={6}>
          <Card>
            <Card.Header as="h5" onClick={() => setShowSpecifications(!showSpecifications)} style={{ cursor: 'pointer' }}>
              <strong className='d-flex justify-content-center align-items-center'>مواصفات السيارة</strong>
            </Card.Header>
            {showSpecifications && (
              <ListGroup variant="flush">
                <ListGroup.Item><strong>النوع:</strong> {car.type}</ListGroup.Item>
                <ListGroup.Item><strong>الماركة:</strong> {car.brand}</ListGroup.Item>
                <ListGroup.Item><strong>اللون الخارجي:</strong> {car.exterior_color}</ListGroup.Item>
                <ListGroup.Item><strong>اللون الداخلي:</strong> {car.interior_color}</ListGroup.Item>
                <ListGroup.Item><strong>عدد الأبواب:</strong> {car.doors_count}</ListGroup.Item>
                <ListGroup.Item><strong>عدد المقاعد:</strong> {car.seats_count}</ListGroup.Item>
                <ListGroup.Item><strong>عدد السلندرات:</strong> {car.cylinders_count}</ListGroup.Item>
                <ListGroup.Item><strong>حجم المحرك:</strong> {car.engine_size}</ListGroup.Item>
              </ListGroup>
            )}
          </Card>
        </Col>

        {/* المعلومات الإضافية */}
        <Col md={6}>
          <Card>
            <Card.Header as="h5" onClick={() => setShowEntertainment(!showEntertainment)} style={{ cursor: 'pointer' }}>
              <strong className='d-flex justify-content-center align-items-center'>الترفيه</strong>
            </Card.Header>
            {showEntertainment && (
              <ListGroup variant="flush">
                {entertainmentList.length > 0 ? (
                  entertainmentList.map((entertainment, index) => (
                    <ListGroup.Item key={index}>{entertainment}</ListGroup.Item>
                  ))
                ) : 'غير محدد'}
              </ListGroup>
            )}
          </Card>
        </Col>

        <Col md={6}>
          <Card>
            {/* إضافة حقل الراحة - قابل للإظهار والإخفاء */}
            <Card.Header as="h5" onClick={() => setShowComfort(!showComfort)} style={{ cursor: 'pointer' }}>
              <strong className='d-flex justify-content-center align-items-center'>مستوى الراحة</strong>
            </Card.Header>
            {showComfort && (
              <ListGroup variant="flush">
                {comfortList.length > 0 ? (
                  comfortList.map((comfort, index) => (
                    <ListGroup.Item key={index}>{comfort}</ListGroup.Item>
                  ))
                ) : 'غير محدد'}
              </ListGroup>
            )}
          </Card>
        </Col>

        <Col md={6}>
          <Card>
            {/* إضافة حقل الأمان - قابل للإظهار والإخفاء */}
            <Card.Header as="h5" onClick={() => setShowSecurity(!showSecurity)} style={{ cursor: 'pointer' }}>
              <strong className='d-flex justify-content-center align-items-center'>الأمان</strong>
            </Card.Header>
            {showSecurity && (
              <ListGroup variant="flush">
                {securityList.length > 0 ? (
                  securityList.map((security, index) => (
                    <ListGroup.Item key={index}>{security}</ListGroup.Item>
                  ))
                ) : 'غير محدد'}
              </ListGroup>
            )}
          </Card>
        </Col>

        <Col md={6}>
          <Card>
            {/* إضافة حقل المقاعد - قابل للإظهار والإخفاء */}
            <Card.Header as="h5" onClick={() => setShowSeats(!showSeats)} style={{ cursor: 'pointer' }}>
              <strong className='d-flex justify-content-center align-items-center'>المقاعد</strong>
            </Card.Header>
            {showSeats && (
              <ListGroup variant="flush">
                {seatsList.length > 0 ? (
                  seatsList.map((seat, index) => (
                    <ListGroup.Item key={index}>{seat}</ListGroup.Item>
                  ))
                ) : 'غير محدد'}
              </ListGroup>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default CarDetail;
