import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';
import { Button, Table } from 'react-bootstrap';

const UnapprovedAds = () => {
  const [ads, setAds] = useState([]);
  const [selectedAd, setSelectedAd] = useState(null);  // لتخزين الإعلان المختار
  const [showDetails, setShowDetails] = useState(false);  // للتحكم في عرض التفاصيل
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchUnapprovedAds = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/admin/ads/unapproved', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAds(response.data);
      } catch (error) {
        console.error('Error fetching unapproved ads:', error);
      }
    };

    fetchUnapprovedAds();
  }, [token]);

  // دالة الموافقة على الإعلان
  const approveAd = async (id) => {
    try {
      await axios.put(`http://localhost:8000/api/admin/ads/approve/${id}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAds(ads.filter(ad => ad.id !== id)); // إزالة الإعلان من القائمة بعد الموافقة عليه
    } catch (error) {
      console.error('Error approving ad:', error);
    }
  };

  // دالة الرفض على الإعلان مع سبب الرفض
  const rejectAd = async (id) => {
    const reason = prompt('يرجى إدخال سبب الرفض');
    if (!reason) {
      alert('لم تقم بإدخال سبب الرفض!');
      return;
    }

    try {
      await axios.put(`http://localhost:8000/api/admin/ads/reject/${id}`, {
        reason: reason, // إرسال سبب الرفض
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAds(ads.filter(ad => ad.id !== id)); // إزالة الإعلان من القائمة بعد رفضه
    } catch (error) {
      console.error('Error rejecting ad:', error);
    }
  };

  // دالة لعرض تفاصيل الإعلان
  const handleShowDetails = (ad) => {
    setSelectedAd(ad);
    setShowDetails(!showDetails);  // إذا كانت التفاصيل مفتوحة نغلقها وإذا كانت مغلقة نفتحها
  };

  return (
    <div>
      <h2>الإعلانات غير المعتمدة</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>اسم السيارة</th>
            <th>السعر</th>
            <th>المسافة المقطوعة</th>
            <th>الموافقة</th>
            <th>الرفض</th>
            <th>تفاصيل الإعلان</th>
          </tr>
        </thead>
        <tbody>
          {ads.map((ad) => (
            <React.Fragment key={ad.id}>
              <tr>
                <td>{ad.name}</td>
                <td>{ad.price}</td>
                <td>{ad.mileage}</td>
                <td>
                  <Button variant="success" onClick={() => approveAd(ad.id)}>
                    الموافقة
                  </Button>
                </td>
                <td>
                  <Button variant="danger" onClick={() => rejectAd(ad.id)}>
                    الرفض
                  </Button>
                </td>
                <td>
                  <Button variant="info" onClick={() => handleShowDetails(ad)}>
                    تفاصيل الإعلان
                  </Button>
                </td>
              </tr>

              {/* عرض التفاصيل أسفل الإعلان إذا تم اختياره */}
              {selectedAd?.id === ad.id && showDetails && (
                <tr>
                  <td colSpan="6">
                    <div className="ad-details">
                      <h4>تفاصيل الإعلان</h4>
                      <ul>
                        <li><strong>اسم السيارة:</strong> {ad.name}</li>
                        <li><strong>السعر:</strong> {ad.price}</li>
                        <li><strong>المسافة المقطوعة:</strong> {ad.mileage}</li>
                        <li><strong>وصف الإعلان:</strong> {ad.description || 'لا يوجد وصف'}</li>
                        <li><strong>تاريخ الإعلان:</strong> {ad.created_at}</li>
                        <li><strong>العلامة التجارية:</strong> {ad.brand}</li>
                        <li><strong>الفئة:</strong> {ad.category}</li>
                        <li><strong>اللون الخارجي:</strong> {ad.exterior_color}</li>
                        <li><strong>اللون الداخلي:</strong> {ad.interior_color}</li>
                        <li><strong>عدد الأبواب:</strong> {ad.doors_count}</li>
                        <li><strong>عدد الأسطوانات:</strong> {ad.cylinders_count}</li>
                        <li><strong>نوع المحرك:</strong> {ad.engine}</li>
                        <li><strong>حجم المحرك:</strong> {ad.engine_size}</li>
                        <li><strong>نوع الوقود:</strong> {ad.fuel_type}</li>
                        <li><strong>المحافظة:</strong> {ad.governorate}</li>
                        <li><strong>عدد المقاعد:</strong> {ad.seats_count}</li>
                        <li><strong>نوع الدرايف:</strong> {ad.drivetrain_type}</li>
                        <li><strong>عدد التروس:</strong> {ad.transmission_speeds}</li>
                        <li><strong>نوع النقل:</strong> {ad.transmission_type}</li>
                        <li><strong>العام:</strong> {ad.year}</li>
                        <li><strong>تم استيراده من:</strong> {ad.imported_from}</li>
                      </ul>

                      {/* عرض الصورة إذا كانت موجودة */}
                      {ad.image && (
                        <div className="ad-image">
                          <h5>صورة الإعلان:</h5>
                          <img
                            src={`http://localhost:8000/storage/${ad.image}`}
                            alt="Car"
                            style={{ width: '300px', height: 'auto', marginTop: '10px' }}
                          />
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default UnapprovedAds;
