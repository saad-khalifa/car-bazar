import React, { useState } from 'react';
import { Container, Button, Card, Col, Row, Form, Alert } from 'react-bootstrap';
import axios from 'axios';

const ContactUs = () => {
  const [contactMethod, setContactMethod] = useState(null); // حالة للاختيار بين طرق التواصل
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [responseMessage, setResponseMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showLoginAlert, setShowLoginAlert] = useState(false); // حالة لإظهار إشعار تسجيل الدخول

  // التعامل مع التغييرات في المدخلات
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // التعامل مع إرسال النموذج
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const token = localStorage.getItem('token'); // التوكن المخزن في الـ localStorage

    // التحقق مما إذا كان المستخدم قد سجل الدخول
    if (!token) {
      setShowLoginAlert(true); // عرض إشعار بتسجيل الدخول
      setIsSubmitting(false);  // إيقاف حالة الإرسال
      return; // إيقاف تنفيذ إرسال الرسالة
    }

    try {
      const response = await axios.post(
        'http://localhost:8000/api/contact',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setResponseMessage(response.data.message); // رسالة النجاح أو الفشل
      setFormData({ name: '', email: '', message: '' }); // إعادة تعيين النموذج بعد الإرسال
    } catch (error) {
      setResponseMessage('حدث خطأ أثناء إرسال الرسالة.');
    }
    setIsSubmitting(false);
  };

  // دالة لعرض تفاصيل التواصل بناءً على الاختيار
  const renderContactDetails = () => {
    switch (contactMethod) {
      case 'email':
        return (
          <Card.Body>
            <Card.Title>البريد الإلكتروني</Card.Title>
            <Card.Text>
              يمكنك إرسال رسالة إلى بريدنا الإلكتروني: <a href="saadkh55.net@gmail.com">saadkh55.net@gmail.com</a>
            </Card.Text>
          </Card.Body>
        );
      case 'phone':
        return (
          <Card.Body>
            <Card.Title>الهاتف</Card.Title>
            <Card.Text>
              يمكنك الاتصال بنا على الرقم: <strong>963964367942+</strong>
            </Card.Text>
          </Card.Body>
        );
      case 'website':
        return (
          <Card.Body>
            <Card.Title>موقعنا</Card.Title>
            <Card.Text>
              <Button variant="primary" onClick={() => setContactMethod('form')}>
                إرسال رسالة عبر الموقع
              </Button>
            </Card.Text>
          </Card.Body>
        );
      case 'form':
        return (
          <Card.Body>
            <Card.Title>نموذج التواصل</Card.Title>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formName">
                <Form.Label>الاسم الكامل</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formEmail">
                <Form.Label>البريد الإلكتروني</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formMessage">
                <Form.Label>الرسالة</Form.Label>
                <Form.Control
                  as="textarea"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  required
                />
              </Form.Group>

              {responseMessage && (
                <Alert variant={responseMessage.includes('حدث خطأ') ? 'danger' : 'success'}>
                  {responseMessage}
                </Alert>
              )}

              <Button
                variant="primary"
                type="submit"
                disabled={isSubmitting}
                block
              >
                {isSubmitting ? 'جاري الإرسال...' : 'إرسال'}
              </Button>
            </Form>
          </Card.Body>
        );
      default:
        return <Card.Body>يرجى اختيار طريقة للتواصل معنا.</Card.Body>;
    }
  };

  return (
    <Container className="mt-5">
      <h2>تواصل معنا</h2>
      <Row className="mb-4">
        <Col md={4}>
          <Button
            variant="info"
            onClick={() => setContactMethod('email')}
            className="mb-3"
            block
          >
            عبر البريد الإلكتروني
          </Button>
        </Col>
        <Col md={4}>
          <Button
            variant="info"
            onClick={() => setContactMethod('phone')}
            className="mb-3"
            block
          >
            عبر الهاتف
          </Button>
        </Col>
        <Col md={4}>
          <Button
            variant="info"
            onClick={() => setContactMethod('website')}
            className="mb-3"
            block
          >
            عبر موقعنا
          </Button>
        </Col>
      </Row>

      {/* عرض إشعار تسجيل الدخول إذا كان المستخدم غير مسجل دخول */}
      {showLoginAlert && (
        <Alert variant="warning" onClose={() => setShowLoginAlert(false)} >
          يرجى تسجيل الدخول أولاً قبل إرسال الرسالة.
        </Alert>
      )}

      {/* عرض التفاصيل بناءً على الاختيار */}
      <Card>
        {renderContactDetails()}
      </Card>
    </Container>
  );
};

export default ContactUs;
