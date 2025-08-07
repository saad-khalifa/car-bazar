import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Form } from 'react-bootstrap';

function NewCarsPage() {
  const [cars, setCars] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [showDetails, setShowDetails] = useState({}); // تعديل ليكون كائن 
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

    // جلب السيارات الجديدة فقط التي تم الموافقة عليها (approved=1)
    axios
      .get('http://localhost:8000/api/admin/cars/new?approved=1', config)
      .then((response) => {
        setCars(response.data || []);
        setLoading(false);
      })
      .catch((error) => {
        setError('فشل في جلب البيانات الخاصة بالسيارات الجديدة');
        setLoading(false);
      });
  }, []);

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

  const handleShowDetails = (carId) => {
    // عكس الحالة عند الضغط على الزر
    setShowDetails(prevState => ({
      ...prevState,
      [carId]: !prevState[carId],
    }));
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter({
      ...filter,
      [name]: value
    });
  };

  // تصفية البيانات بناءً على الفلاتر
  const filteredCars = cars.filter((car) => {
    return (
      (filter.id ? car.id.toString().includes(filter.id) : true) &&
      (filter.name ? car.name.toLowerCase().includes(filter.name.toLowerCase()) : true) &&
      car.approved === 1 // إضافة شرط الفلتر الخاص بالموافقة
    );
  });

  return (
    <div className="new-cars-page">
      <h2>إدارة السيارات الجديدة</h2>
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
              <React.Fragment key={car.id}>
                <tr>
                  <td>{car.id}</td>
                  <td>{car?.name || 'غير محدد'}</td>
                  <td>{car?.price || 'غير محدد'}</td>
                  <td>{car?.year || 'غير محدد'}</td>
                  <td>{car?.mileage || 'غير محدد'}</td>
                  <td>{car?.user?.name || 'غير محدد'}</td>
                  <td>
                    <Button
                      variant="info"
                      onClick={() => handleShowDetails(car.id)}
                      className="me-2"
                    >
                      تفاصيل الإعلان
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(car.id)}
                    >
                      حذف
                    </Button>
                  </td>
                </tr>

                {/* عرض التفاصيل أسفل الصف */}
                {showDetails[car.id] && (
                  <tr>
                    <td colSpan="7">
                      <div className="car-details">
                        <ul>
                          <li><strong>اسم السيارة:</strong> {car.name}</li>
                          <li><strong>السعر:</strong> {car.price}</li>
                          <li><strong>السنة:</strong> {car.year}</li>
                          <li><strong>المسافة المقطوعة:</strong> {car.mileage}</li>
                          <li><strong>المالك:</strong> {car.user?.name}</li>
                          {car.image && (
                            <li>
                              <strong>الصورة:</strong>
                              <img
                                src={`http://localhost:8000/storage/${car.image}`}
                                alt="Car"
                                style={{ width: '300px', height: 'auto', marginTop: '10px' }}
                              />
                            </li>
                          )}
                        </ul>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                لا توجد إعلانات حالياً
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}

export default NewCarsPage;
