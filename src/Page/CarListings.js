import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Row, Col, Button, Card, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // استيراد Link من react-router-dom
import { FaHeart, FaRegHeart } from 'react-icons/fa'; // استيراد الأيقونات
import MaraadCar from './MaraadCar';
import WhyCarPage from './WhyCarPage';
import FooterHeader from './FooterHeader';
import FaqPages from './FAQPage';

function CarListings() {
  const [cars, setCars] = useState([]);
  const [favorites, setFavorites] = useState([]); // لتخزين السيارات المفضلة
  const [filters, setFilters] = useState({
    price_min: '',
    price_max: '',
    year_min: '',
    year_max: '',
    condition: '',
    model: '',
  });

  const images = [
    '../images/banner1.1cc99fa513a01b66706233ab198709a5.svg',
    '../images/banner2.560b1bfd4abb0c1c3b222fc36777f147.svg',
    '../images/banner3.235ca2fb58891a24386439aecd10bfc0.svg',
    '../images/banner4.6ee1300142f7ec9b98aa12167f9e5f02.svg',
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // جلب المفضلات من الخادم عند تحميل الصفحة
    const fetchFavorites = async () => {
      const token = localStorage.getItem('token');
      if(token){
      try {
        const response = await axios.get('http://localhost:8000/api/favorites', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFavorites(response.data.map(fav => fav.car_id)); // تعيين المفضلات فقط كـ IDs للسيارات
      } catch (err) {
        console.error('حدث خطأ في جلب المفضلة:', err);
      }
    }
    };

    fetchFavorites();

    const id = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(id);
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  useEffect(() => {
    const filterParams = Object.entries(filters)
      .filter(([key, value]) => value) // إضافة الفلاتر غير الفارغة
      .map(([key, value]) => `${key}=${value}`)
      .join('&');

    axios.get(`http://localhost:8000/api/cars?${filterParams}`)
      .then(response => {
        setCars(response.data);
      })
      .catch(error => console.log(error));
  }, [filters]);

  const handleAddToFavorites = (carId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('يرجى تسجيل الدخول أولاً');
      return;
    }

    axios.post(`http://localhost:8000/api/favorites/${carId}`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        setFavorites(prevFavorites => [...prevFavorites, carId]);
      })
      .catch(error => {
        console.log('حدث خطأ:', error.response);
      });
  };

  const handleRemoveFromFavorites = (carId) => {
    const token = localStorage.getItem('token');
    axios.delete(`http://localhost:8000/api/favorites/${carId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        setFavorites(prevFavorites => prevFavorites.filter(id => id !== carId));
      })
      .catch(error => {
        console.log('حدث خطأ:', error.response);
      });
  };

  return (
    <>
      <div className="image-slider mt-5">
        <h1 style={{ display: "flex", alignItems: 'center', justifyContent: "center" }}>CarBazar</h1>
        <Row className="mt-4">
          <Col md={12}>
            <Card>
              <Card.Img variant="top" src={`/${images[currentIndex]}`} alt={`صورة ${currentIndex + 1}`} />
            </Card>
          </Col>
        </Row>
      </div>
      <Container>
      <div className="filters mt-5">
        <h2 className='text-center'>هل تبحث عن سيارة للشراء ؟</h2>
        <h2 className='text-center'>CarBazar - وجهتك الأولى لبيع وشراء السيارات في سوريا</h2>
        <Row className='mt-5'>
          <Col md={3}>
            <Form.Group>
              <Form.Label>الموديل</Form.Label>
              <Form.Control
                type="text"
                name="model"
                value={filters.model}
                onChange={handleFilterChange}
                placeholder="أدخل الموديل"
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group>
              <Form.Label>السنة من</Form.Label>
              <Form.Control
                type="number"
                name="year_min"
                value={filters.year_min}
                onChange={handleFilterChange}
                placeholder="0"
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group>
              <Form.Label>السنة إلى</Form.Label>
              <Form.Control
                type="number"
                name="year_max"
                value={filters.year_max}
                onChange={handleFilterChange}
                placeholder="0"
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group>
              <Form.Label>الحالة</Form.Label>
              <Form.Control
                as="select"
                name="condition"
                value={filters.condition}
                onChange={handleFilterChange}
              >
                <option value="">الكل</option>
                <option value="جديد">جديد</option>
                <option value="مستعمل">مستعمل</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col md={3}>
            <Form.Group>
              <Form.Label>السعر من</Form.Label>
              <Form.Control
                type="number"
                name="price_min"
                value={filters.price_min}
                onChange={handleFilterChange}
                placeholder="0"
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group>
              <Form.Label>السعر إلى</Form.Label>
              <Form.Control
                type="number"
                name="price_max"
                value={filters.price_max}
                onChange={handleFilterChange}
                placeholder="0"
              />
            </Form.Group>
          </Col>
        </Row>
      </div>
      

      <div className="car-listings mt-5">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '40px 0' }}>
          <h2 style={{ width: "200px", display: "flex", alignItems: 'center', justifyContent: "center", borderBottom: '4px solid #28292D' }}> عروض مميزة</h2>
        </div>

        <Row className="mt-4">
          {cars.map(car => (
            <Col md={4} key={car.id}>
              <Card style={{ boxShadow: '0 4px 8px rgba(0,0,0,0.1)', borderRadius: '10px', transition: 'all 0.3s ease' }}>
                <Card.Img variant="top"
                style={{ width: '100%', height: '400px', objectFit: 'cover' , borderRadius: '10px 10px 0 0' }}
                src={`http://localhost:8000/storage/${car.image}`} />
                <Card.Body>
                  <Card.Title>{car.name}</Card.Title>
                  <Card.Text>
                    <strong>السعر:</strong> {car.price} ل.س
                    <br />
                    <strong>السنة:</strong> {car.year}
                    <br />
                    <strong>الحالة:</strong> {car.condition}
                  </Card.Text>
                  <Link to={`/car/${car.id}`}>
                    <Button variant="primary" className="w-100 mb-2">تفاصيل الإعلان</Button>
                  </Link>

                  {/* تحقق إذا كانت السيارة في المفضلة */}
                  {favorites.includes(car.id) ? (
                    <Button
                      variant="danger"
                      onClick={() => handleRemoveFromFavorites(car.id)}
                      className="w-100"
                    >
                      <span>ازالة من المفضلة </span><FaHeart /> {/* أيقونة مملوءة */}
                    </Button>
                  ) : (
                    <Button
                      variant="warning"
                      onClick={() => handleAddToFavorites(car.id)}
                      className="w-100"
                    >
                      <span>اظافة الى المفضلة  </span><FaRegHeart /> {/* أيقونة فارغة */}
                    </Button>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
      <MaraadCar />
      <br/><br/><br/>
      
      <div className='d-flex align-items-center justify-content-center flex-wrap'>
      <div className="d-flex flex-column justify-content-center align-items-center">
  <h3>صاحب مكتب أو عندك سيارة للبيع ؟</h3>
  <h5 className="text-center">أنت في المكان الصح</h5>
  <Link className='btn btn-primary' to='/CarBazarPage'>إنضم إلينا</Link>
</div>

      <div>
          <img src='../images/img.2d2f4f398585819ebbc654c091f3aa9d.svg' width='90%'/>
        </div>
      </div>
      <WhyCarPage/>

       <div className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '100vh', backgroundColor: '#ffffff' }}>
      {/* العنوان الرئيسي */}
      <h1 className="text-center mb-4" style={{ color: '#28292D' }}>
        منصة CarBazar - أفضل عروض السيارات في سوريا
      </h1>

      {/* النص التوضيحي */}
      <h5 className="text-center mb-5" style={{ color: '#555' }}>
        انضم إلى مجتمع CarBazar اليوم واستمتع بأسهل طريقة لشراء وبيع السيارات في سوريا بأمان وموثوقية. نحن هنا لخدمتك، تواصل معنا عبر البريد الإلكتروني أو الهاتف.
      </h5>

      {/* التواصل معنا */}
      <Container>
        <Row className="justify-content-center">
          <Col md={4} className="mb-4">
            <Button 
              variant="primary" 
              className="w-100" 
              size="lg" 
              href="mailto:saadkh55.net@gmail.com"
            >
              تواصل معنا عبر البريد الإلكتروني
            </Button>
          </Col>
          <Col md={4} className="mb-4">
            <Button 
              variant="success" 
              className="w-100" 
              size="lg" 
              href="tel:+963964367942"
            >
              تواصل معنا عبر الهاتف
            </Button>
          </Col>
        </Row>
      </Container>

      {/* نص إضافي */}
      <div className="text-center mt-5">
        <p style={{ color: '#555', fontSize: '1.2rem' }}>
          انضم إلى مجتمع CarBazar اليوم وابدأ تجربتك في شراء وبيع السيارات بأفضل العروض في سوريا!
        </p>
      </div>
    </div>
      </Container>
          <FooterHeader/>
    </>
  );
}

export default CarListings;
