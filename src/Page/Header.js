import React, { useContext, useState, useEffect } from 'react';
import { Navbar, Nav, Container, Badge, Dropdown, Button } from 'react-bootstrap';
import { Link, useNavigate ,NavLink } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext'; // المسار الصحيح للـ Context
import axios from 'axios'; // لاستخدام axios لجلب الإشعارات من الـ API
 import './Header.css'
function Header() {
  const { user, setUser, loading } = useContext(AuthContext); // استخدام الـ Context
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);  // عدد الإشعارات غير المقروءة
  const nav = useNavigate(); // لاستخدام التاريخ للانتقال بعد تسجيل الخروج
      const token = localStorage.getItem('token');
const navigate = useNavigate();
  // دالة لجلب الإشعارات
  const fetchNotifications = async () => {
  const token = localStorage.getItem('token');
  if(token){
    try {
      const response = await axios.get('http://localhost:8000/api/notifications', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const notificationsData = response.data;  // الحصول على البيانات الفعلية من داخل response.data
      setNotifications(notificationsData);  // تعيين الإشعارات
      // تعيين عدد الإشعارات غير المقروءة بناءً على الحالة
      const unread = notificationsData.filter(n => n.status === 'unread').length;
      setUnreadCount(unread);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  }
  };

  

  // استخدام useEffect لجلب الإشعارات عند تحميل الصفحة وأيضاً التحديث التلقائي كل فترة زمنية
  useEffect(() => {
    fetchNotifications();
    const intervalId = setInterval(fetchNotifications, 15000);  // التحديث كل 15 ثانية
    return () => clearInterval(intervalId);
  }, []); 
    const getNavLinkClass = (isActive) => (isActive ? 'nav-link active' : 'nav-link');

  const handleProfileClick = () => {
    if (!user) {
      // إذا لم يكن المستخدم مسجل دخول، التوجه إلى صفحة تسجيل الدخول
      navigate('/login');
    } else {
      // إذا كان المستخدم مسجل دخول، التوجه إلى صفحة الملف الشخصي
      navigate('/profile');
    }}
  const markAllAsRead = async () => {
    try {
      await axios.patch('http://localhost:8000/api/notifications/mark-all-read', {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setNotifications(notifications.map(notification => ({ ...notification, status: 'read' })));
      setUnreadCount(0); 
    } catch (error) {
      console.error("Error marking notifications as read:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    nav('/login');
  };

  if (loading) {
    return <div>جاري تحميل البيانات...</div>;
  }

  return (
    <Navbar bg="light" expand="lg" className="navbar navbar-expand-lg container-fluid">
  <>
    <Navbar.Brand href="/" className="logo-animation">
      <img src="../images/car.jpg" alt="Logo" width='100px'/>
    </Navbar.Brand>

    {/* الجرس في الشاشات الصغيرة */}
    <div className="notification-icon">
      <Dropdown align="end">
        <Dropdown.Toggle variant="link" id="dropdown-notifications" className="notification-text">
          <i className="fas fa-bell icon">🔔</i>
          {unreadCount > 0 && (
            <Badge pill variant="danger">
              {unreadCount}
            </Badge>
          )}
        </Dropdown.Toggle>

        <Dropdown.Menu className="notifications-dropdown">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <Dropdown.Item
                key={notification.id}
                as={Link}
                to={`/notifications/${notification.id}`}
                className={notification.status === 'unread' ? 'font-weight-bold' : ''}
              >
                {notification.status === 'unread' ? '🔔 ' : '✔️ '}
                {notification.title}
              </Dropdown.Item>
            ))
          ) : (
            <Dropdown.Item disabled>لا توجد إشعارات</Dropdown.Item>
          )}
        </Dropdown.Menu>
      </Dropdown>
    </div>

    <div onClick={handleProfileClick} className=" notification-icon">
      <img
        src={
          user && user.profile_image
            ? `http://localhost:8000/storage/${user.profile_image}`
            : 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
        }
        alt="Profile"
        className="rounded-circle"
        style={{
          width: '30px',
          height: '30px',
          objectFit: 'cover',
          border: '2px solid #fff',
          cursor: 'pointer',
        }}
      />
    </div>

    {/* القائمة المنسدلة وتبديلها في الشاشات الكبيرة والصغيرة */}
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        
<li className="nav-item">
              <NavLink to="/new-cars" className={({ isActive }) => getNavLinkClass(isActive)}>
                السيارات الجديدة
              </NavLink>
            </li><li className="nav-item">
              <NavLink to="/used-cars" className={({ isActive }) => getNavLinkClass(isActive)}>
                السيارات المستعملة
              </NavLink>
            </li><li className="nav-item">
              <NavLink to="/my-ads" className={({ isActive }) => getNavLinkClass(isActive)}>
                اعلاناتي
              </NavLink>
            </li><li className="nav-item">
              <NavLink to="/add-car" className={({ isActive }) => getNavLinkClass(isActive)}>
               إظافة اعلان             
                </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="" className={({ isActive }) => getNavLinkClass(isActive)}>
                الخدمات
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/favorites" className={({ isActive }) => getNavLinkClass(isActive)}>
                المفضلة
              </NavLink>
            </li>
        {user && user.is_admin && (
          <li className="nav-item">
              <NavLink to="/admin/dashboard" className={({ isActive }) => getNavLinkClass(isActive)}>
                لوحة التحكم
              </NavLink>
            </li>
        )}
<li className="nav-item">
              <NavLink to="/contact-us" className={({ isActive }) => getNavLinkClass(isActive)}>
                تواصل معنا
              </NavLink>
            </li> 
            
                 </ul>

                 <div className="small">
      <Dropdown align="end">
        <Dropdown.Toggle variant="link" id="dropdown-notifications" className="notification-text">
          <i className="fas fa-bell icon">🔔</i>
          {unreadCount > 0 && (
            <Badge pill variant="danger">
              {unreadCount}
            </Badge>
          )}
        </Dropdown.Toggle>

        <Dropdown.Menu className="notifications-dropdown">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <Dropdown.Item
                key={notification.id}
                as={Link}
                to={`/notifications/${notification.id}`}
                className={notification.status === 'unread' ? 'font-weight-bold' : ''}
              >
                {notification.status === 'unread' ? '🔔 ' : '✔️ '}
                {notification.title}
              </Dropdown.Item>
            ))
          ) : (
            <Dropdown.Item disabled>لا توجد إشعارات</Dropdown.Item>
          )}
        </Dropdown.Menu>
      </Dropdown>
    </div>

      <div onClick={handleProfileClick} className="d-flex align-items-center justify-content-center small">
      <img
        src={
          user && user.profile_image
            ? `http://localhost:8000/storage/${user.profile_image}`
            : 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
        }
        alt="Profile"
        className="rounded-circle"
        style={{
          width: '30px',
          height: '30px',
          objectFit: 'cover',
          border: '2px solid #fff',
          cursor: 'pointer',
        }}
      />
    </div>

      <Nav className="ml-auto">
        {!user ? (
          <Button variant="outline-primary" as={Link} to="/login" className="login-btn-animation">
            تسجيل الدخول
          </Button>
        ) : (
          <>
            {/* الجرس يظهر دائمًا، حتى إذا كانت القائمة مفتوحة أو مغلقة */}
            <div className="icons">
              <Dropdown align="end">
                <Dropdown.Toggle variant="link" id="dropdown-notifications" className="notification-text">
                  <i className="fas fa-bell" onClick={()=>markAllAsRead()} style={{ textDecoration:'none' }}>الإشعارات</i>
                  {unreadCount > 0 && (
                    <Badge pill variant="danger">
                      {unreadCount}
                    </Badge>
                  )}
                </Dropdown.Toggle>

                <Dropdown.Menu className="notifications-dropdown">
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <Dropdown.Item
                        key={notification.id}
                        as={Link}
                        to={`/notifications/${notification.id}`}
                        className={notification.status === 'unread' ? 'font-weight-bold' : ''}
                      >
                        {notification.status === 'unread' ? '🔔 ' : '✔️ '}
                        {notification.title}
                      </Dropdown.Item>
                    ))
                  ) : (
                    <Dropdown.Item disabled>لا توجد إشعارات</Dropdown.Item>
                  )}
                </Dropdown.Menu>
              </Dropdown>
            </div>

            {/* زر تسجيل الخروج */}
            <Button variant="outline-danger" onClick={handleLogout} className="logout-btn-animation">
              تسجيل الخروج
            </Button>
          </>
        )}
      </Nav>
    </Navbar.Collapse>
  </>
</Navbar>


  );
}

export default Header;
