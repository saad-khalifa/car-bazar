import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';  // استيراد Bootstrap

const Replies = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // جلب التوكن من localStorage
    const token = localStorage.getItem('token');
    
    // استعلام من الـ API للحصول على الرسائل مع الردود
    axios.get('http://localhost:8000/api/contact/messages', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      setMessages(response.data);  // تعيين الرسائل مع الردود في الـ state
    })
    .catch((error) => {
      console.error('Error fetching messages with replies:', error);
    });
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">الردود</h1>

      {/* التحقق من وجود الرسائل */}
      {messages.length === 0 ? (
        <p className="text-center">لا توجد رسائل أو ردود حالياً.</p>
      ) : (
        <div className="list-group">
          {/* عرض الرسائل مع الردود */}
          {messages.map((message) => (
            <div className="list-group-item" key={message.id}>
              {/* عرض الرسالة الخاصة بالمستخدم */}
              <div className="d-flex justify-content-between">
                <h5 className="mb-1">{message.message}</h5>
                <small className="text-muted">من: {message.name}</small>
              </div>

              <hr />

              {/* عرض الرد من الإدارة (إن وجد) */}
              {message.replies && message.replies.length > 0 ? (
                <div className="mt-3">
                  <div className="alert alert-info">
                    <h6>رد الإدارة:</h6>
                    {/* عرض الردود لكل رسالة */}
                    {message.replies.map((reply) => (
                      <div key={reply.id}>
                        <p>{reply.reply}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="mt-3">
                  <p className="text-muted">لا توجد ردود من الإدارة على هذه الرسالة بعد.</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Replies;
