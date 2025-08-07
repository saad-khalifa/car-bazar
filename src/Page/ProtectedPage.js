import { useEffect } from 'react';
import axios from 'axios';

function ProtectedPage() {
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // إضافة التوكن إلى الرؤوس
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // طلب محمي باستخدام التوكن
      axios.get('http://localhost:8000/api/protected-endpoint')
        .then(response => {
          console.log('Protected data:', response.data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    } else {
      console.log('Token not found!');
      // يمكن توجيه المستخدم إلى صفحة تسجيل الدخول إذا لم يكن هناك توكن
    }
  }, []);

  return (
    <div>
      <h1>This is a protected page</h1>
    </div>
  );
}

export default ProtectedPage;
