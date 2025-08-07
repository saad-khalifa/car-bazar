import React, { useState } from 'react';
import axios from 'axios';

function AddGalleryCar() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '', // حقل تأكيد كلمة المرور
    gallery_name: '',
    address: '',
    phone_number: '',
    whatsapp_number: '',
    role: 0, // تعيين القيمة الافتراضية للدور
    image: null, // حقل الصورة
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] }); // تعيين الصورة المختارة
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSubmit = new FormData();
    for (const key in formData) {
      formDataToSubmit.append(key, formData[key]);
    }

    try {
      const response = await axios.post('http://localhost:8000/api/users', formDataToSubmit, {
        headers: {
          'Content-Type': 'multipart/form-data', // تعيين نوع المحتوى
        },
      });
      alert(response.data.message);
      setFormData({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        gallery_name: '',
        address: '',
        phone_number: '',
        whatsapp_number: '',
        role: 0,
        image: null,
      });
    } catch (error) {
      console.error('Error saving user data:', error);
      alert('حدث خطأ أثناء تخزين البيانات!');
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">إضافة معرض سيارات جديد</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>الاسم:</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>البريد الإلكتروني:</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>كلمة المرور:</label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>تأكيد كلمة المرور:</label>
          <input
            type="password"
            name="password_confirmation"
            className="form-control"
            value={formData.password_confirmation}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>اسم المعرض:</label>
          <input
            type="text"
            name="gallery_name"
            className="form-control"
            value={formData.gallery_name}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>العنوان:</label>
          <input
            type="text"
            name="address"
            className="form-control"
            value={formData.address}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>رقم الاتصال:</label>
          <input
            type="text"
            name="phone_number"
            className="form-control"
            value={formData.phone_number}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>رقم الواتساب:</label>
          <input
            type="text"
            name="whatsapp_number"
            className="form-control"
            value={formData.whatsapp_number}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>الدور:</label>
          <select
            name="role"
            className="form-control"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value={0}>مستخدم</option>
            <option value={1}>مدير معرض</option>
          </select>
        </div>

        <div className="form-group">
          <label>الصورة:</label>
          <input
            type="file"
            name="image"
            className="form-control-file"
            onChange={handleFileChange}
          />
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-primary">
            إضافة
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddGalleryCar;
