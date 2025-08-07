import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // لاستقبال الـ id من URL
import axios from 'axios';
import { Container, ListGroup, ListGroupItem } from 'react-bootstrap';

const NotificationDetail = () => {
  const { id } = useParams();  // استخدام useParams لاستقبال الـ id من الـ URL
  const [notification, setNotification] = useState(null); // حالة للإشعار المفصل

  useEffect(() => {
    // جلب الإشعار بناءً على الـ id من الـ API
    const token = localStorage.getItem('token');
    
    axios.get(`http://localhost:8000/api/notifications/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      // تحقق من وجود خاصية notification في الاستجابة
      const fetchedNotification = response.data;
      setNotification(fetchedNotification);
    })
    .catch(error => {
      console.error("Error fetching notification:", error);
    });
  }, [id]); // تحديث البيانات عند تغيير الـ id

  if (!notification) {
    return <Container className="mt-5"><p>جاري تحميل الإشعار...</p></Container>;
  }

  return (
    <Container className="mt-5">
      <h2>تفاصيل الإشعار</h2>
      <ListGroup>
        <ListGroupItem>
          <strong>{notification.title}</strong>
          <p>{notification.message}</p>
        </ListGroupItem>
      </ListGroup>
    </Container>
  );
};

export default NotificationDetail;
