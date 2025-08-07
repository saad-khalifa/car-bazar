import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // للاستفادة من روابط التنقل
import axios from 'axios';
import { Container, ListGroup, ListGroupItem } from 'react-bootstrap';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // جلب الإشعارات من الـ API
    const token = localStorage.getItem('token');
    
    axios.get('http://localhost:8000/api/notifications', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      // تحقق من وجود خاصية notifications في الاستجابة
      const fetchedNotifications = response.data || [];
      setNotifications(fetchedNotifications);
    })
    .catch(error => {
      console.error("Error fetching notifications:", error);
    });
  }, []);

  return (
    <Container className="mt-5">
      <h2>الإشعارات</h2>
      <ListGroup>
        {notifications.length === 0 ? (
          <ListGroupItem>لا توجد إشعارات حالياً.</ListGroupItem>
        ) : (
          notifications.map((notification) => (
            <ListGroupItem key={notification.id} className={notification.status === 'unread' ? 'bg-light' : ''}>
              <strong>{notification.title}</strong>
              <p>{notification.message}</p>
              <Link to={`/notifications/${notification.id}`} className="btn btn-primary">عرض التفاصيل</Link>
            </ListGroupItem>
          ))
        )}
      </ListGroup>
    </Container>
  );
};

export default Notifications;
