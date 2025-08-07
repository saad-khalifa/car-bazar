import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

function WhyCarPage() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      {/* العنوان الرئيسي */}
      <h1 className="text-center mb-4" style={{ color: '#28292D' }}>
        لماذا CarBazar هو خيارك الأفضل؟
      </h1>

      {/* النص التوضيحي */}
      <h5 className="text-center mb-5" style={{ color: '#555' }}>
        CarBazar نوفر لك أفضل تجربة لشراء وبيع السيارات في سوريا بكل سهولة وأمان. سواء كنت تبحث عن سيارة جديدة أو مستعملة، نقدم لك مجموعة واسعة من الخيارات بأسعار تنافسية وعروض مميزة.
      </h5>

      {/* ما الذي يميزنا؟ */}
      <Container>
        <Row className="justify-content-center">
          <Col md={6} className="mb-4">
            <Card style={{ boxShadow: '0 4px 8px rgba(0,0,0,0.1)', borderRadius: '10px', transition: 'all 0.3s ease' }}>
              <Card.Body>
                <Card.Title className="text-center" style={{ fontSize: '1.5rem', color: '#007bff' }}>
                  ما الذي يميزنا في موقع CarBazar؟
                </Card.Title>
                <Card.Text className="mt-3">
                  <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
                    <li>تشكيلة متنوعة من السيارات تناسب جميع الاحتياجات والميزانيات.</li>
                    <li>تجربة استخدام سلسة تتيح لك البحث والمقارنة بسهولة.</li>
                    <li>عروض وأسعار تنافسية تضمن لك أفضل قيمة مقابل المال.</li>
                    <li>دعم متواصل لمساعدتك في كل خطوة من رحلتك.</li>
                  </ul>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* نص إضافي أو تعليمات */}
      <div className="text-center mt-5">
        <p style={{ color: '#555', fontSize: '1.2rem' }}>
          انضم إلى سيارتي Syarti اليوم واكتشف أفضل العروض التي تضمن لك تجربة شراء وبيع سيارات لا مثيل لها!
        </p>
      </div>
    </div>
  );
}

export default WhyCarPage;
