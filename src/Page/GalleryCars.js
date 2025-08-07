import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Form } from 'react-bootstrap';

function GalleryCar() {
  const [cars, setCars] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedCar, setSelectedCar] = useState(null); // لحفظ تفاصيل السيارة التي تم اختيارها
  const [showDetails, setShowDetails] = useState(false); // لتحديد إذا كنا سنعرض تفاصيل السيارة أم لا
  const [filter, setFilter] = useState({
    id: '',
    name: ''
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('لم تقم بتسجيل الدخول كـ admin');
      setLoading(false);
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // جلب كل الإعلانات
    axios
      .get('http://localhost:8000/api/admin/cars', config)
      .then((response) => {
        setCars(response.data || []);
        setLoading(false);
      })
      .catch((error) => {
        setError('فشل في جلب البيانات الخاصة بالإعلانات');
        setLoading(false);
      });
  }, []);

  // دالة لحذف السيارة
  const handleDelete = (carId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('لم تقم بتسجيل الدخول كـ admin');
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // إرسال طلب حذف
    axios
      .delete(`http://localhost:8000/api/admin/cars/${carId}`, config)
      .then(() => {
        // تحديث البيانات بعد الحذف
        setCars(cars.filter((car) => car.id !== carId));
      })
      .catch((error) => {
        setError('فشل في حذف السيارة');
      });
  };

  // دالة لعرض تفاصيل السيارة
  const handleShowDetails = (car) => {
    setSelectedCar(car);
    setShowDetails(!showDetails); // إذا كانت التفاصيل مفتوحة نغلقها وإذا كانت مغلقة نفتحها
  };

  // دالة لتصفية السيارات بناءً على الرقم والاسم
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter({
      ...filter,
      [name]: value
    });
  };

  // تصفية البيانات لعرض السيارات التي تحتوي على role = 1 فقط
  const filteredCars = cars.filter((car) => {
    return (
      (filter.id ? car.id.toString().includes(filter.id) : true) &&
      (filter.name ? car.name.toLowerCase().includes(filter.name.toLowerCase()) : true) &&
      (car.role === 1) // عرض السيارات التي تحتوي على role = 1 فقط
    );
  });

  return (
    <div className="cars-page">
      <h2>إدارة الإعلانات</h2>
      {error && <div className="error">{error}</div>}
      {loading && <div>جاري تحميل البيانات...</div>}

      {/* فلتر البحث */}
      <div className="filters">
        <Form.Group controlId="filterId">
          <Form.Label>رقم الإعلان</Form.Label>
          <Form.Control
            type="text"
            placeholder="ابحث برقم الإعلان"
            name="id"
            value={filter.id}
            onChange={handleFilterChange}
          />
        </Form.Group>

        <Form.Group controlId="filterName">
          <Form.Label>اسم السيارة</Form.Label>
          <Form.Control
            type="text"
            placeholder="ابحث باسم السيارة"
            name="name"
            value={filter.name}
            onChange={handleFilterChange}
          />
        </Form.Group>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>رقم الإعلان</th>
            <th>اسم السيارة</th>
            <th>السعر</th>
            <th>السنة</th>
            <th>المسافة المقطوعة</th>
            <th>المالك</th>
            <th>الإجراء</th>
          </tr>
        </thead>
        <tbody>
          {filteredCars.length > 0 ? (
            filteredCars.map((car) => (
              <tr key={car.id}>
                <td>{car.id}</td> {/* عرض رقم الإعلان */}
                <td>{car?.name || 'غير محدد'}</td>
                <td>{car?.price || 'غير محدد'}</td>
                <td>{car?.year || 'غير محدد'}</td>
                <td>{car?.mileage || 'غير محدد'}</td>
                <td>{car?.user?.name || 'غير محدد'}</td>
                <td>
                  {/* حالة الإعلان */}
                  {car.role === 1 ? (
                    <span style={{ color: 'blue' }}>معرض</span>
                  ) : car.approved === null ? (
                    <span style={{ color: 'orange' }}>معلق</span>
                  ) : car.approved === 1 ? (
                    <span style={{ color: 'green' }}>مقبول</span>
                  ) : (
                    <span style={{ color: 'red' }}>مرفوض</span>
                  )}

                  {/* الإجراء */}
                  <Button
                    variant="info"
                    onClick={() => handleShowDetails(car)}
                    className="me-2"
                  >
                    تفاصيل الإعلان
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(car.id)} // عند الضغط يتم حذف السيارة
                  >
                    حذف
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                لا يوجد معارض حالياً
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* عرض التفاصيل إذا كانت متاحة */}
      {selectedCar && showDetails && (
        <div className="car-details">
          <h3>تفاصيل السيارة</h3>
          <ul>
            <li><strong>اسم السيارة:</strong> {selectedCar.name}</li>
            <li><strong>السعر:</strong> {selectedCar.price}</li>
            <li><strong>السنة:</strong> {selectedCar.year}</li>
            <li><strong>المسافة المقطوعة:</strong> {selectedCar.mileage}</li>
            <li><strong>المالك:</strong> {selectedCar.user?.name}</li>
            {/* عرض الصورة إذا كانت موجودة */}
            {selectedCar.image && (
              <li>
                <strong>الصورة:</strong>
                <img
                  src={`http://localhost:8000/storage/${selectedCar.image}`}
                  alt="Car"
                  style={{ width: '300px', height: 'auto', marginTop: '10px' }}
                />
              </li>
            )}
          </ul>
          <Button variant="secondary" onClick={() => setShowDetails(false)}>
            إخفاء التفاصيل
          </Button>
        </div>
      )}
    </div>
  );
}

export default GalleryCar;
