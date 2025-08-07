import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // استيراد Link من react-router-dom

function MaraadCar() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/users/role')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('هناك خطأ في جلب البيانات:', error);
      });
  }, []);

  return (
    <div className="container mt-5">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '40px 0' }}>
        <h2 style={{ width: "200px", display: "flex", alignItems: 'center', justifyContent: "center", borderBottom: '4px solid #28292D' }}>معارض مميزة</h2>
      </div>
      <div className="row">
        {users.length > 0 ? (
          users.map(user => (
            <div key={user.id} className="col-md-4 mb-4">
              <Link to={`/user/${user.id}/cars`}>
                <div
                  className="user-card"
                  style={{
                    backgroundImage: `url(http://localhost:8000/storage/${user.image || 'default-image.jpg'})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    padding: '20px',
                    color: 'white',
                    borderRadius: '10px',
                    height: '300px',
                    position: 'relative',
                  }}
                >
                  <div style={{ position: 'absolute', bottom: '10px', left: '10px' }}>
                    <h4>{user.gallery_name || 'غير محدد'}</h4>
                    <p>{user.address || 'غير محدد'}</p>
                    <p>رقم الهاتف: {user.phone_number || 'غير محدد'}</p>
                    <p>رقم الواتساب: {user.whatsapp_number || 'غير محدد'}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <div className="col-12 text-center">
            <p>لا توجد معارض حاليا</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default MaraadCar;
