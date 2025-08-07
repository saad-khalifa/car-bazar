import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

function FAQPage() {
  return (
    <div style={{ backgroundColor: '#f8f9fa', padding: '40px 0' }}>
      <Container>
        <Row className="text-center mb-5">
          <Col>
            <h1 style={{ color: '#333', fontWeight: 'bold' }}>الأسئلة الشائعة</h1>
            <h5 style={{ color: '#555' }}>إليك بعض الأسئلة التي قد تكون شائعة حول منصة CarBazar </h5>
          </Col>
        </Row>

        <Row>
          <Col md={6} className="mb-4">
            <Card>
              <Card.Header>
                <h5>مالذي يقدمه موقع CarBazar  ؟</h5>
              </Card.Header>
              <Card.Body>
                <p>
                  يوفر لك موقع CarBazar  إمكانية بيع وشراء السيارات الجديدة والمستعملة في سوريا مباشرةً بدون عمولة عبر التواصل المباشر بين البائع والشاري.
                </p>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} className="mb-4">
            <Card>
              <Card.Header>
                <h5>ماهي خدمة فحص السيارة الكامل ؟</h5>
              </Card.Header>
              <Card.Body>
                <p>
                  بالإضافة الى عمليتا بيع وشراء السيارات فإنه يقدم لك إمكانية الفحص الشامل والكامل للسيارة (ميكانيكيا وكهربائيا).
                </p>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} className="mb-4">
            <Card>
              <Card.Header>
                <h5>ماهي خدمة التزيين الخارجي للسيارة ؟</h5>
              </Card.Header>
              <Card.Body>
                <p>
                  هي خدمة مخصصة لتزيين السيارة بطريقة أنيقة ومميزة، تُستخدم في المناسبات والأفراح أو عند تقديم سيارة كهدية، حيث يتم تزيينها بتصاميم وزخارف تناسب الحدث وتعكس طابعًا احتفاليًا.
                </p>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} className="mb-4">
            <Card>
              <Card.Header>
                <h5>ماهي خدمة التدريب على القيادة ؟</h5>
              </Card.Header>
              <Card.Body>
                <p>
                  نقدم هذه الخدمة بالتعاون مع مكاتب متخصصة في تعليم السياقة، حيث نوفر لعملائنا دورات تدريبية احترافية تساعدهم على اكتساب مهارات القيادة بثقة وأمان.
                </p>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} className="mb-4">
            <Card>
              <Card.Header>
                <h5>كيف يمكنني بيع سيارتي عبر الموقع؟</h5>
              </Card.Header>
              <Card.Body>
                <p>
                  يوفر لك الموقع متجرًا خاصًا لعرض سيارتك للبيع مباشرةً. يمكنك إضافة سيارتك من خلال معرض CarBazar  مع تقديم معلومات مفصلة وصور واضحة لسيارتك ليتم عرضها في المعرض.
                </p>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} className="mb-4">
            <Card>
              <Card.Header>
                <h5>كيف يمكنني الانضمام الى عائلة CarBazar  ؟</h5>
              </Card.Header>
              <Card.Body>
                <p>
                  يمكنك الانضمام إلى عائلة CarBazar  من خلال الرابط التالي. <a href="/join-family">انضم الآن</a>
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="text-center mt-5">
          <Col>
            <h5>لم تجد جواباً لسؤالك؟</h5>
            <Button variant="primary" href="/contact-us" size="lg">
              تواصل معنا
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default FAQPage;
