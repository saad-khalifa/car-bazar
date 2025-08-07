import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import moment from 'moment';  // استيراد moment.js

function UsersPage() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
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

    // جلب كل المستخدمين
    axios
      .get('http://localhost:8000/api/admin/users', config)
      .then((response) => {
        setUsers(response.data || []);
      })
      .catch((error) => setError('فشل في جلب البيانات الخاصة بالمستخدمين'));
  }, []);

  // دالة حذف المستخدم
  const handleDelete = (userId) => {
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

    axios
      .delete(`http://localhost:8000/api/admin/users/${userId}`, config)
      .then((response) => {
        setUsers(users.filter((user) => user.id !== userId)); // إزالة المستخدم من الواجهة
        setSuccess('تم حذف المستخدم بنجاح');
      })
      .catch((error) => setError('فشل في حذف المستخدم'));
  };

  // دالة تعيين مشرف
  const handleAssignAdmin = (userId) => {
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

    axios
      .post(
        `http://localhost:8000/api/admin/users/${userId}/assign-admin`,
        {},
        config
      )
      .then((response) => {
        setUsers(
          users.map((user) =>
            user.id === userId ? { ...user, is_admin: true } : user
          )
        );
        setSuccess('تم تعيين المستخدم كمشرف بنجاح');
      })
      .catch((error) => setError('فشل في تعيين المشرف'));
  };

  // دالة إزالة مشرف
  const handleRemoveAdmin = (userId) => {
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

    axios
      .post(
        `http://localhost:8000/api/admin/users/${userId}/remove-admin`,
        {},
        config
      )
      .then((response) => {
        setUsers(
          users.map((user) =>
            user.id === userId ? { ...user, is_admin: false } : user
          )
        );
        setSuccess('تم إزالة مشرف المستخدم بنجاح');
      })
      .catch((error) => setError('فشل في إزالة الإشراف'));
  };

  // دالة لتنسيق تاريخ التسجيل
  const formatDate = (date) => {
    return moment(date).format('YYYY-MM-DD HH:mm:ss'); // السنة والشهر واليوم والساعة والدقيقة
  };

  return (
    <div className="users-page">
      <h2>إدارة المستخدمين</h2>

      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>الاسم</th>
            <th>البريد الإلكتروني</th>
            <th>تاريخ التسجيل</th>
            <th>الإجراء</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user?.name || 'غير محدد'}</td>
                <td>{user?.email || 'غير محدد'}</td>
                <td>{user?.created_at ? formatDate(user.created_at) : 'غير محدد'}</td> {/* تنسيق التاريخ هنا */}
                <td>
                  {/* إذا كان المستخدم مشرفًا نعرض زر إزالة الإشراف */}
                  {user.is_admin ? (
                    <Button
                      variant="warning"
                      onClick={() => handleRemoveAdmin(user.id)}
                    >
                      إزالة الإشراف
                    </Button>
                  ) : (
                    // إذا كان المستخدم عادي نعرض زر تعيين كمشرف
                    <Button
                      variant="primary"
                      onClick={() => handleAssignAdmin(user.id)}
                    >
                      تعيين كمشرف
                    </Button>
                  )}

                  {/* زر حذف المستخدم */}
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(user.id)}
                    className="ml-2"
                  >
                    حذف
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                لا توجد بيانات للمستخدمين
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}

export default UsersPage;
