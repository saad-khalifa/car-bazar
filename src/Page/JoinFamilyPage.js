import React, { useState } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';

function JoinFamilyPage() {
  const [showCarInstructions, setShowCarInstructions] = useState(false);
  const [showOfficeInstructions, setShowOfficeInstructions] = useState(false);

  // إظهار الخطوات الخاصة بالسيارة
  const handleCarClick = () => {
    setShowCarInstructions(true);
    setShowOfficeInstructions(false); // إخفاء التعليمات الأخرى عند الضغط على "عندي سيارة"
  };

  // إظهار الخطوات الخاصة بالمعرض أو المكتب
  const handleOfficeClick = () => {
    setShowOfficeInstructions(true);
    setShowCarInstructions(false); // إخفاء التعليمات الأخرى عند الضغط على "عندي معرض أو مكتب"
  };

  return (
    <Container>
    <div className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      {/* العنوان الرئيسي */}
      <h1 className="text-center mb-4" style={{ color: '#28292D' }}>
        انضم إلى عائلة كار بازار
      </h1>

      {/* النص التوضيحي */}
      <h5 className="text-center mb-5" style={{ color: '#555' }}>
        اختر ما يناسبك للانضمام إلى عائلتنا
      </h5>

      {/* الخيارات */}
      <Container>
        <Row className="justify-content-center">
          <Col md={4} className="mb-4">
            <Button variant="primary" className="w-100" size="lg" onClick={handleCarClick}>
              عندي سيارة
            </Button>
          </Col>
          <Col md={4} className="mb-4">
            <Button variant="success" className="w-100" size="lg" onClick={handleOfficeClick}>
              عندي معرض أو مكتب
            </Button>
          </Col>
        </Row>
      </Container>

      {/* عرض التعليمات عند الضغط على "عندي سيارة" */}
      {showCarInstructions && (
        <div className="text-center mt-5">
          <Button variant="secondary" onClick={() => setShowCarInstructions(false)} className="mb-4">
            إخفاء
          </Button>
          <h4>إعرض سيارتك عنا</h4>
          <ol className="text-left mt-3">
            <li><strong>بالبداية ستتواصل معنا على الرقم التالي :</strong> 0964367942 واتس أب</li>
            <li><strong>سيقدم لك الموظف استبيان حول جميع معلومات سيارتك</strong></li>
            <li><strong>بعد أن تقوم بملئه سنحتاج من 5 إلى 8 صور لسيارتك</strong></li>
            <li><strong>وبعض المعلومات من رقم ومكان تواجد السيارة</strong></li>
            <li><strong>بعد اتمام تلك العملية ستكون سيارتك خلال وقت قصير موجودة على موقعنا</strong></li>
            <li><strong>الخدمة مجانية حاليا ولا تحتاج إلى الدفع</strong></li>
          </ol>
        </div>
      )}

      {/* عرض التعليمات عند الضغط على "عندي معرض أو مكتب" */}
      {showOfficeInstructions && (
        <div className="text-center mt-5">
          <Button variant="secondary" onClick={() => setShowOfficeInstructions(false)} className="mb-4">
            إخفاء
          </Button>
          <h4>إعرض معرضك أو مكتبك عنا</h4>
          <ol className="text-left mt-3">
            <li><strong>بالبداية ستتواصل معنا على الرقم التالي :</strong> 0964367942 واتس أب</li>
            <li><strong>سيقدم لك الموظف استبيان لملئه</strong></li>
            <li><strong>وبعض المعلومات من رقم ومكان تواجد المعرض</strong></li>
            <li><strong>سيتم تحديد موعد لقدوم الفريق الى المكتب</strong></li>
            <li><strong>لتصوير السيارات بشكل كامل وأخذ معلومات السيارات</strong></li>
            <li><strong>سيتم اعطاؤك لوحة تحكم للتحكم بجميع السيارات الموجودة لديك واضافة سيارات وعروض ايضا</strong></li>
            <li><strong>الخدمة مجانية حاليا ولا تحتاج إلى الدفع</strong></li>
          </ol>
        </div>
      )}

      {/* نص إضافي أو تعليمات */}
      <div className="text-center mt-5">
        <p style={{ color: '#555' }}>
          إذا كنت تمتلك سيارة أو معرض، نحن هنا لدعمك. انضم الآن لبدء رحلة جديدة معنا!
        </p>
      </div>
    </div>
    </Container>
  );
}

export default JoinFamilyPage;
