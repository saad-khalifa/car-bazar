import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Alert, Card } from 'react-bootstrap';

function AddCar() {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    year: '',
    mileage: '',
    condition: '',
    engine: '',
    image: null,
    governorate: '', 
    brand: '',
    type: '',
    category: '',
    exterior_color: '',
    interior_color: '',
    imported_from: '',
    fuel_type: '',
    transmission_type: '',
    transmission_speeds: '',
    cylinders_count: '',
    engine_size: '',
    drivetrain_type: '',
    keys_count: '',
    seats_count: '',
    doors_count: '',
    phone_number: '',
    comfort: [],
    entertainment: [],
    security: [],
    seats: [],
    model: '',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const syrianGovernorates = [
    'دمشق', 'حلب', 'حمص', 'اللاذقية', 'طرطوس', 'دير الزور',
    'الرقة', 'حماة', 'إدلب', 'السويداء', 'درعا', 'القنيطرة',
    'بنياس', 'المحافظات الأخرى'
  ];

  const handleChange = (e) => {
    const { name, value, checked } = e.target;

    if (name === 'comfort' || name === 'entertainment' || name === 'security' || name === 'seats') {
      if (checked) {
        setFormData(prevState => ({
          ...prevState,
          [name]: [...prevState[name], value]
        }));
      } else {
        setFormData(prevState => ({
          ...prevState,
          [name]: prevState[name].filter(item => item !== value)
        }));
      }
    } else {
      const { type, files } = e.target;
      if (type === 'file') {
        setFormData({ ...formData, [name]: files[0] });
      } else {
        setFormData({ ...formData, [name]: value });
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const carFormData = new FormData();
    for (const key in formData) {
      if (Array.isArray(formData[key])) {
        formData[key].forEach(value => carFormData.append(key + '[]', value));
      } else {
        carFormData.append(key, formData[key]);
      }
    }

    const token = localStorage.getItem('token');

    axios.post('http://localhost:8000/api/car', carFormData, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then((response) => {
        setMessage(' تم ارسال الاعلان بنجاح سوف يتم نشر الإعلان عند الموافقة عليه');
        setError('');
        setFormData({
          name: '',
          price: '',
          year: '',
          mileage: '',
          condition: '',
          engine: '',
          image: null,
          governorate: '',
          brand: '',
          type: '',
          category: '',
          exterior_color: '',
          interior_color: '',
          imported_from: '',
          fuel_type: '',
          transmission_type: '',
          transmission_speeds: '',
          cylinders_count: '',
          engine_size: '',
          drivetrain_type: '',
          keys_count: '',
          seats_count: '',
          doors_count: '',
          phone_number: '',
          comfort: [],
          entertainment: [],
          security: [],
          seats: [],
        });
      })
      .catch((error) => {
        setError('حدث خطأ أثناء إضافة السيارة. يرجى المحاولة لاحقاً.');
        setMessage('');
      });
  };

  return (
    <div className="add-car mt-5">
      <h2>إضافة سيارة جديدة</h2>

      {/* عرض الإشعارات بناءً على حالة الإرسال */}
      {message && <Alert variant="success">{message}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

{/* نموذج إضافة السيارة */}
      <Card>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            {/* اسم السيارة */}
            <Form.Group controlId="formName">
              <Form.Label>اسم السيارة</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>


          <Form.Group controlId="formModel">
  <Form.Label>الموديل</Form.Label>
  <Form.Control
    type="text"
    name="model"
    value={formData.model}
    onChange={handleChange}
    placeholder="أدخل موديل السيارة"
    required
  />
</Form.Group>

            {/* سعر السيارة */}
            <Form.Group controlId="formPrice">
              <Form.Label>السعر</Form.Label>
              <Form.Control
                type="text"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {/* سنة السيارة */}
            <Form.Group controlId="formYear">
              <Form.Label>السنة</Form.Label>
              <Form.Control
                type="text"
                name="year"
                value={formData.year}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {/* المسافة المقطوعة */}
            <Form.Group controlId="formMileage">
              <Form.Label>المسافة المقطوعة</Form.Label>
              <Form.Control
                type="text"
                name="mileage"
                value={formData.mileage}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {/* حالة السيارة */}
            <Form.Group controlId="formCondition">
              <Form.Label>الحالة</Form.Label>
              <Form.Control
                type="text"
                name="condition"
                value={formData.condition}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {/* محرك السيارة */}
            <Form.Group controlId="formEngine">
              <Form.Label>المحرك</Form.Label>
              <Form.Control
                type="text"
                name="engine"
                value={formData.engine}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {/* إضافة المحافظة */}
            <Form.Group controlId="formGovernorate">
              <Form.Label>المحافظة</Form.Label>
              <Form.Control
                as="select"
                name="governorate"
                value={formData.governorate}
                onChange={handleChange}
                required
              >
                <option value="">اختر المحافظة</option>
                {syrianGovernorates.map((governorate, index) => (
                  <option key={index} value={governorate}>
                    {governorate}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            {/* الماركة */}
            <Form.Group controlId="formBrand">
              <Form.Label>الماركة</Form.Label>
              <Form.Control
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                placeholder="اختياري"
              />
            </Form.Group>

            {/* النوع */}
            <Form.Group controlId="formType">
              <Form.Label>النوع</Form.Label>
              <Form.Control
                type="text"
                name="type"
                value={formData.type}
                onChange={handleChange}
                placeholder="اختياري"
              />
            </Form.Group>

            {/* الفئة */}
            <Form.Group controlId="formCategory">
              <Form.Label>الفئة</Form.Label>
              <Form.Control
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="اختياري"
              />
            </Form.Group>

            {/* اللون الخارجي */}
            <Form.Group controlId="formExteriorColor">
              <Form.Label>اللون الخارجي</Form.Label>
              <Form.Control
                type="text"
                name="exterior_color"
                value={formData.exterior_color}
                onChange={handleChange}
                placeholder="اختياري"
              />
            </Form.Group>

            {/* اللون الداخلي */}
            <Form.Group controlId="formInteriorColor">
              <Form.Label>اللون الداخلي</Form.Label>
              <Form.Control
                type="text"
                name="interior_color"
                value={formData.interior_color}
                onChange={handleChange}
                placeholder="اختياري"
              />
            </Form.Group>

            {/* الوارد */}
            <Form.Group controlId="formImportedFrom">
              <Form.Label>الوارد</Form.Label>
              <Form.Control
                type="text"
                name="imported_from"
                value={formData.imported_from}
                onChange={handleChange}
                placeholder="اختياري"
              />
            </Form.Group>

            {/* نوع الوقود */}
            <Form.Group controlId="formFuelType">
              <Form.Label>نوع الوقود</Form.Label>
              <Form.Control
                type="text"
                name="fuel_type"
                value={formData.fuel_type}
                onChange={handleChange}
                placeholder="اختياري"
              />
            </Form.Group>

            {/* نوع القير */}
            <Form.Group controlId="formTransmissionType">
              <Form.Label>نوع القير</Form.Label>
              <Form.Control
                type="text"
                name="transmission_type"
                value={formData.transmission_type}
                onChange={handleChange}
                placeholder="اختياري"
              />
            </Form.Group>

            {/* سرعات القير */}
            <Form.Group controlId="formTransmissionSpeeds">
              <Form.Label>سرعات القير</Form.Label>
              <Form.Control
                type="text"
                name="transmission_speeds"
                value={formData.transmission_speeds}
                onChange={handleChange}
                placeholder="اختياري"
              />
            </Form.Group>

            {/* عدد السلندرات */}
            <Form.Group controlId="formCylindersCount">
              <Form.Label>عدد السلندرات</Form.Label>
              <Form.Control
                type="text"
                name="cylinders_count"
                value={formData.cylinders_count}
                onChange={handleChange}
                placeholder="اختياري"
              />
            </Form.Group>

            {/* حجم المحرك */}
            <Form.Group controlId="formEngineSize">
              <Form.Label>حجم المحرك</Form.Label>
              <Form.Control
                type="text"
                name="engine_size"
                value={formData.engine_size}
                onChange={handleChange}
                placeholder="اختياري"
              />
            </Form.Group>

            {/* نوع الدفع */}
            <Form.Group controlId="formDrivetrainType">
              <Form.Label>نوع الدفع</Form.Label>
              <Form.Control
                type="text"
                name="drivetrain_type"
                value={formData.drivetrain_type}
                onChange={handleChange}
                placeholder="اختياري"
              />
            </Form.Group>

            {/* عدد المفاتيح */}
            <Form.Group controlId="formKeysCount">
              <Form.Label>عدد المفاتيح</Form.Label>
              <Form.Control
                type="number"
                name="keys_count"
                value={formData.keys_count}
                onChange={handleChange}
                placeholder="اختياري"
              />
            </Form.Group>

            {/* عدد المقاعد */}
            <Form.Group controlId="formSeatsCount">
              <Form.Label>عدد المقاعد</Form.Label>
              <Form.Control
                type="number"
                name="seats_count"
                value={formData.seats_count}
                onChange={handleChange}
                placeholder="اختياري"
              />
            </Form.Group>

            {/* عدد الأبواب */}
            <Form.Group controlId="formDoorsCount">
              <Form.Label>عدد الأبواب</Form.Label>
              <Form.Control
                type="number"
                name="doors_count"
                value={formData.doors_count}
                onChange={handleChange}
                placeholder="اختياري"
              />
            </Form.Group>

               <Form.Group controlId="formPhoneNumber">
              <Form.Label>رقم الهاتف</Form.Label>
              <Form.Control
                type="text"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formComfort">
  <Form.Label>الراحة</Form.Label>
  <div>
    <Form.Check 
      type="checkbox" 
      label="عادي"
      name="comfort"
      value="عادي"
      checked={formData.comfort.includes('عادي')}
      onChange={handleChange}
    />
    <Form.Check 
      type="checkbox" 
      label="مريح"
      name="comfort"
      value="مريح"
      checked={formData.comfort.includes('مريح')}
      onChange={handleChange}
    />
    <Form.Check 
      type="checkbox" 
      label="فاخر"
      name="comfort"
      value="فاخر"
      checked={formData.comfort.includes('فاخر')}
      onChange={handleChange}
    />
    <Form.Check 
      type="checkbox" 
      label="غير متوفر"
      name="comfort"
      value="غير متوفر"
      checked={formData.comfort.includes('غير متوفر')}
      onChange={handleChange}
    />
  </div>
</Form.Group>

<Form.Group controlId="formEntertainment">
  <Form.Label>الترفيه</Form.Label>
  <div>
    <Form.Check 
      type="checkbox" 
      label="موجود"
      name="entertainment"
      value="موجود"
      checked={formData.entertainment.includes('موجود')}
      onChange={handleChange}
    />
    <Form.Check 
      type="checkbox" 
      label="غير موجود"
      name="entertainment"
      value="غير موجود"
      checked={formData.entertainment.includes('غير موجود')}
      onChange={handleChange}
    />
    <Form.Check 
      type="checkbox" 
      label="ميديا"
      name="entertainment"
      value="ميديا"
      checked={formData.entertainment.includes('ميديا')}
      onChange={handleChange}
    />
    <Form.Check 
      type="checkbox" 
      label="موسيقى"
      name="entertainment"
      value="موسيقى"
      checked={formData.entertainment.includes('موسيقى')}
      onChange={handleChange}
    />
  </div>
</Form.Group>


<Form.Group controlId="formSecurity">
  <Form.Label>الأمان</Form.Label>
  <div>
    <Form.Check 
      type="checkbox" 
      label="مكابح ABS"
      name="security"
      value="مكابح ABS"
      checked={formData.security.includes('مكابح ABS')}
      onChange={handleChange}
    />
    <Form.Check 
      type="checkbox" 
      label="وسائد هوائية"
      name="security"
      value="وسائد هوائية"
      checked={formData.security.includes('وسائد هوائية')}
      onChange={handleChange}
    />
    <Form.Check 
      type="checkbox" 
      label="أنظمة مساعدة القيادة"
      name="security"
      value="أنظمة مساعدة القيادة"
      checked={formData.security.includes('أنظمة مساعدة القيادة')}
      onChange={handleChange}
    />
    {/* أضف المزيد من الخيارات حسب الحاجة */}
  </div>
</Form.Group>

<Form.Group controlId="formSeats">
  <Form.Label>المقاعد</Form.Label>
  <div>
    <Form.Check 
      type="checkbox" 
      label="مقاعد جلدية"
      name="seats"
      value="مقاعد جلدية"
      checked={formData.seats.includes('مقاعد جلدية')}
      onChange={handleChange}
    />
    <Form.Check 
      type="checkbox" 
      label="مقاعد كهربائية"
      name="seats"
      value="مقاعد كهربائية"
      checked={formData.seats.includes('مقاعد كهربائية')}
      onChange={handleChange}
    />
    <Form.Check 
      type="checkbox" 
      label="عدد المقاعد"
      name="seats"
      value="عدد المقاعد"
      checked={formData.seats.includes('عدد المقاعد')}
      onChange={handleChange}
    />
    {/* أضف المزيد من الخيارات حسب الحاجة */}
  </div>
</Form.Group>


            {/* رفع صورة السيارة */}
            <Form.Group controlId="formImage">
  <Form.Label>رفع صور السيارة</Form.Label>
  <Form.Control
    type="file"
    name="image"
    onChange={handleChange}
    multiple // السماح بتحميل أكثر من صورة
    required
  />
</Form.Group>

            {/* زر إرسال الإعلان */}
            <Button variant="primary" type="submit" className="mt-3">
              إضافة السيارة
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default AddCar;
