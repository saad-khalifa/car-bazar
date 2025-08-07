import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Footer from '../components/Footer';
import { FaFacebook, FaInstagram, FaWhatsapp, FaLinkedin } from 'react-icons/fa'; // استيراد الأيقونات


function FooterHeader() {
  return (
    <div style={{ backgroundColor: '#333', color: '#fff', padding: '40px 0' }}>
      <Container>
        {/* العنوان الرئيسي */}
        <Row className="text-center mb-5">
          <Col>
            <h1 style={{ color: '#fff', fontWeight: 'bold' }}>
              CarBazar - منصة لبيع وشراء السيارات المستعملة والجديدة في سوريا
            </h1>
            <h5 style={{ color: '#ccc' }}>
              CarBazar المنصة الأولى في سوريا لبيع وشراء السيارات المستعملة والجديدة، مع أفضل العروض وأسعار تنافسية.
            </h5>
          </Col>
        </Row>

        {/* تواصل معنا */}
        <Row className="mb-5">
          <Col className="col-md-3 p-3 text-center">
            <h5 style={{ color: '#fff' }}>تواصل معنا</h5>
            <p><strong>البريد الإلكتروني:</strong> <a href="mailto:saadkh55.net@gmail.com" style={{ color: '#ccc' }}>saadkh55.net@gmail.com</a></p>
            <p><strong>الهاتف:</strong> <a href="tel:+963964367942" style={{ color: '#ccc' }}>00963964367942</a></p>
            <p><strong>العنوان:</strong> سوريا - حمص</p>
          </Col>

          {/* روابط سريعة */}
          <Col className="col-md-3 p-3 text-center">
            <h5 style={{ color: '#fff' }}>روابط سريعة</h5>
            <ul style={{ listStyleType: 'none', paddingLeft: '0' }}>
              <li><Button variant="link" href="/" style={{ color: '#ccc' }}>ابحث عن سيارتك</Button></li>
              <li><Button variant="link" href="/car-dealers" style={{ color: '#ccc' }}>معارض السيارات</Button></li>
              <li><Button variant="link" href="/special-offers" style={{ color: '#ccc' }}>العروض</Button></li>
              <li><Button variant="link" href="/favorites" style={{ color: '#ccc' }}>السيارات المفضلة</Button></li>
            </ul>
          </Col>

          {/* اتصل بنا */}
          <Col className="col-md-3 p-3 text-center">
            <h5 style={{ color: '#fff' }}>اتصل بنا</h5>
            <ul style={{ listStyleType: 'none', paddingLeft: '0' }}>
              <li><Button variant="link" href="/faq" style={{ color: '#ccc' }}>الاسئلة الشائعة</Button></li>
              <li><Button variant="link" href="/about-us" style={{ color: '#ccc' }}>من نحن</Button></li>
            </ul>
          </Col>

          {/* وسائل التواصل */}
              <Col className="col-md-3 p-3 text-center">
      <h5 style={{ color: '#fff' }}>وسائل التواصل</h5>
      <ul style={{ listStyleType: 'none', paddingLeft: '0' }}>
        <li>
          <Button variant="link" href="https://www.facebook.com/saad.al.khalifa.705540" target="_blank" style={{ color: '#ccc' }}>
            <FaFacebook size={30} />
          </Button>
        </li>
        <li>
          <Button variant="link" href="https://www.instagram.com/saad_khalifa_12221?igsh=MXM2a2VqY29kbDNnYw==" target="_blank" style={{ color: '#ccc' }}>
            <FaInstagram size={30} />
          </Button>
        </li>
        <li>
          <Button variant="link" href="https://wa.me/+963964367942" target="_blank" style={{ color: '#ccc' }}>
            <FaWhatsapp size={30} />
          </Button>
        </li>
        <li>
          <Button variant="link" href="https://www.linkedin.com/in/saad-kh-660a79372" target="_blank" style={{ color: '#ccc' }}>
            <FaLinkedin size={30} />
          </Button>
        </li>
      </ul>
    </Col>
        </Row>

        {/* حقوق النشر */}
        <Row className="text-center">
          <Col>
           <Footer/>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default FooterHeader;
