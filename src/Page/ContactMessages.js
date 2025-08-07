import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ContactMessages = () => {
  const [messages, setMessages] = useState([]);
  const [responseMessage, setResponseMessage] = useState('');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [replyMessage, setReplyMessage] = useState(''); // لتخزين الرد على الرسالة
  const [showReplies, setShowReplies] = useState(false); // لتتبع عرض الردود

  // جلب الرسائل من API عند تحميل الصفحة
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const token = localStorage.getItem('token'); // الحصول على التوكن من localStorage
        
        // إرسال طلب GET إلى API في Laravel
        const response = await axios.get('http://localhost:8000/api/contact/messages', {
          headers: {
            Authorization: `Bearer ${token}`, // إرسال التوكن في رأس الطلب
          }
        });
        
        setMessages(response.data); // تخزين الرسائل في الحالة
      } catch (error) {
        setResponseMessage('حدث خطأ أثناء جلب الرسائل.');
      }
    };

    fetchMessages();
  }, []);

  // عرض التفاصيل عند الضغط على الزر
  const handleShowDetails = (message) => {
    if (selectedMessage && selectedMessage.id === message.id) {
      setSelectedMessage(null); // إخفاء التفاصيل إذا كانت الرسالة نفسها
    } else {
      setSelectedMessage(message);
      setShowReplies(false); // إعادة تعيين الردود عند اختيار رسالة جديدة
    }
  };

  // إرسال الرد على الرسالة
  const handleReply = async () => {
    if (!replyMessage.trim()) {
      window.alert('يرجى إدخال رد على الرسالة.');
      return;
    }

    try {
      const token = localStorage.getItem('token'); // الحصول على التوكن من localStorage
      const messageId = selectedMessage.id;

      // إرسال الرد إلى API في Laravel
      await axios.post(`http://localhost:8000/api/contact/messages/${messageId}/reply`, {
        reply: replyMessage,
      }, {
        headers: {
          Authorization: `Bearer ${token}`, // إرسال التوكن في رأس الطلب
        }
      });

      setResponseMessage('تم إرسال الرد بنجاح!');
      setReplyMessage(''); // مسح محتوى الرد بعد إرساله

      // جلب الرسائل مع الردود مرة أخرى
      const response = await axios.get('http://localhost:8000/api/contact/messages', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessages(response.data);
    } catch (error) {
      setResponseMessage('حدث خطأ أثناء إرسال الرد.');
    }
  };

  // بدء عملية الحذف
  const handleDeleteMessage = async (messageId) => {
    const confirmDelete = window.confirm("هل أنت متأكد من أنك تريد حذف هذه الرسالة؟");
    
    if (confirmDelete) {
      try {
        const token = localStorage.getItem('token'); // الحصول على التوكن من localStorage

        // إرسال طلب DELETE إلى API في Laravel
        await axios.delete(`http://localhost:8000/api/contact/messages/${messageId}`, {
          headers: {
            Authorization: `Bearer ${token}`, // إرسال التوكن في رأس الطلب
          }
        });

        // تحديث الرسائل بعد الحذف
        setMessages(messages.filter((message) => message.id !== messageId));

        // إذا كانت الرسالة المحذوفة هي الرسالة المحددة، قم بتصفية التفاصيل أيضًا
        if (selectedMessage && selectedMessage.id === messageId) {
          setSelectedMessage(null);
        }

        window.alert("تم حذف الرسالة بنجاح!");
      } catch (error) {
        window.alert("حدث خطأ أثناء حذف الرسالة.");
      }
    }
  };

  // التبديل بين إظهار وإخفاء الردود
  const toggleReplies = () => {
    setShowReplies(prevState => !prevState); // تغيير حالة إظهار الردود
  };

  return (
    <div className="container">
      <h2>رسائل تواصل معنا</h2>
      {responseMessage && <div className="alert alert-info">{responseMessage}</div>} {/* إظهار رسالة الخطأ أو النجاح */}

      {/* عرض جدول الرسائل */}
      <div>
        {messages.length === 0 ? (
          <p>لا توجد رسائل حالياً.</p>
        ) : (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>الاسم</th>
                <th>البريد الإلكتروني</th>
                <th>التاريخ</th>
                <th>التفاصيل</th>
                <th>حذف</th> {/* إضافة عمود حذف */}
              </tr>
            </thead>
            <tbody>
              {messages.map((message) => (
                <React.Fragment key={message.id}>
                  <tr>
                    <td>{message.name}</td>
                    <td>{message.email}</td>
                    <td>{new Date(message.created_at).toLocaleString()}</td>
                    <td>
                      <button
                        className="btn btn-info"
                        onClick={() => handleShowDetails(message)}
                      >
                        {selectedMessage && selectedMessage.id === message.id ? 'إخفاء التفاصيل' : 'عرض التفاصيل'}
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeleteMessage(message.id)} // استدعاء دالة الحذف
                      >
                        حذف
                      </button>
                    </td>
                  </tr>

                  {/* عرض التفاصيل أسفل الصف */}
                  {selectedMessage && selectedMessage.id === message.id && (
                    <tr>
                      <td colSpan="5">
                        <div className="message-details" style={{ backgroundColor: '#e6f7ff', padding: '10px', borderRadius: '5px' }}>
                          <ul>
                            <li><strong>الاسم:</strong> {selectedMessage.name}</li>
                            <li><strong>البريد الإلكتروني:</strong> {selectedMessage.email}</li>
                            <li><strong>الرسالة:</strong> {selectedMessage.message}</li>
                            <li><strong>التاريخ:</strong> {new Date(selectedMessage.created_at).toLocaleString()}</li>
                          </ul>

                          {/* حقل للرد على الرسالة */}
                          <div>
                            <h5>رد على الرسالة:</h5>
                            <textarea
                              className="form-control"
                              rows="4"
                              value={replyMessage}
                              onChange={(e) => setReplyMessage(e.target.value)} // تحديث الرد
                              placeholder="اكتب ردك هنا..."
                            />
                            <button
                              className="btn btn-primary mt-2"
                              onClick={handleReply} // استدعاء دالة الرد
                            >
                              إرسال الرد
                            </button>
                          </div>

                          {/* زر عرض الردود السابقة */}
                          {selectedMessage.replies && selectedMessage.replies.length > 0 && (
                            <div className="mt-3">
                              <button
                                className="btn btn-secondary"
                                onClick={toggleReplies}
                              >
                                {showReplies ? 'إخفاء الردود' : 'عرض الردود السابقة'}
                              </button>
                            </div>
                          )}

                          {/* عرض الردود إذا كانت مفعلة */}
                          {showReplies && selectedMessage.replies && selectedMessage.replies.length > 0 && (
                            <div className="mt-3">
                              <h5>الردود على الرسالة:</h5>
                              <table className="table table-striped">
                                <thead>
                                  <tr>
                                    <th>الرد</th>
                                    <th>التاريخ</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {selectedMessage.replies.map((reply) => (
                                    <tr key={reply.id} style={{ backgroundColor: '#f7f7f7', borderLeft: '5px solid #ccc' }}>
                                      <td>{reply.reply}</td>
                                      <td>{new Date(reply.created_at).toLocaleString()}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ContactMessages;
