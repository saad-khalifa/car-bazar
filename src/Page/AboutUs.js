import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

function AboutUs() {
  return (
    <div style={{ backgroundColor: '#f8f9fa', padding: '40px 0' }}>
      <Container>
        {/* العنوان */}
        <Row className="text-center mb-5">
          <Col>
            <h1 style={{ color: '#333', fontWeight: 'bold' }}>من نحن</h1>
            <h5 style={{ color: '#555' }}>
              تعرف على منصة CarBazar  المتخصصة في بيع وشراء السيارات في سوريا
            </h5>
          </Col>
        </Row>

        {/* النص التوضيحي */}
        <Row className="mb-5">
          <Col>
            <p style={{ color: '#555', fontSize: '18px', lineHeight: '1.6' }}>
              منصة CarBazar  هي منصة متميزة لبيع وشراء السيارات الجديدة والمستعملة في سوريا. نسعى لتوفير أفضل
              العروض للمستخدمين مع واجهة استخدام بسيطة وسهلة. نحن نقدم لك فرصة رائعة للبحث عن السيارة التي
              تبحث عنها أو بيع سيارتك بسرعة وأمان. بغض النظر عن نوع السيارة أو الميزانية، لدينا مجموعة كبيرة من
              السيارات لتناسب احتياجاتك.
            </p>

            <p style={{ color: '#555', fontSize: '18px', lineHeight: '1.6' }}>
              نحن في CarBazar  ملتزمون بتوفير تجربة سلسة لعملائنا، حيث نتيح لك مقارنة السيارات، التواصل مع
              المعارض، وأفضل العروض. نقدم لك جميع الأدوات التي تحتاجها لإتمام عملية الشراء أو البيع بكل سهولة
              وأمان.
            </p>
          </Col>
        </Row>

        {/* فريق العمل */}
        <Row className="mb-5">
          <Col>
            <h3 style={{ color: '#333', fontWeight: 'bold' }}>فريق العمل</h3>
            <p style={{ color: '#555', fontSize: '18px', lineHeight: '1.6' }}>
              لدينا فريق محترف يعمل بكل شغف لتقديم أفضل تجربة للمستخدم. نعمل على توفير الدعم الكامل لعملائنا
              من خلال استشارات متخصصة ومساعدة في جميع مراحل العملية من البحث إلى الشراء.
            </p>
          </Col>
        </Row>

        {/* مهمتنا */}
        <Row className="mb-5">
          <Col>
            <h3 style={{ color: '#333', fontWeight: 'bold' }}>مهمتنا</h3>
            <p style={{ color: '#555', fontSize: '18px', lineHeight: '1.6' }}>
              مهمتنا هي تسهيل تجربة شراء وبيع السيارات في سوريا من خلال توفير منصة موثوقة وآمنة. نحن نسعى
              لأن نكون الخيار الأول للمستخدمين الذين يبحثون عن سيارة جديدة أو مستعملة بأسعار منافسة وبجودة
              عالية.
            </p>
          </Col>
        </Row>

        {/* رؤيتنا */}
        <Row className="mb-5">
          <Col>
            <h3 style={{ color: '#333', fontWeight: 'bold' }}>رؤيتنا</h3>
            <p style={{ color: '#555', fontSize: '18px', lineHeight: '1.6' }}>
              رؤيتنا هي أن نكون المنصة الأكثر شمولًا وتنوعًا لبيع وشراء السيارات في سوريا. نهدف إلى أن نصبح
              الخيار الأول للمستخدمين من خلال تقديم تجربة فريدة ودعماً مستمراً من خلال منصتنا.
            </p>
          </Col>
        </Row>

        {/* دعوة للتواصل */}
        <Row className="text-center">
          <Col>
            <Button variant="primary" href="/contact-us" size="lg">
              تواصل معنا
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AboutUs;
