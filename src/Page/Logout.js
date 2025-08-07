import React from 'react';

function Logout() {

  const handleLogout = () => {
    // إزالة التوكن من localStorage
    localStorage.removeItem('token');
    
    // إعادة توجيه المستخدم إلى صفحة تسجيل الدخول
  };

  return (
    <div>
      <button onClick={handleLogout}>تسجيل الخروج</button>
    </div>
  );
}

export default Logout;
