import { Routes ,Route } from 'react-router-dom';
import Header from './Page/Header';
import CarListings from './Page/CarListings';
import SearchBar from './Page/SearchBar';
import CarDetail from './Page/CarDetail';
import ContactUs from './Page/ContactUs';
import AddCar from './Page/AddCar';
import MyAccount from './Page/MyAccount';
import ProfileEdit from './Page/ProfileEdit';
import Register from './Page/Register';
import Login from './Page/Login';
import { AuthProvider } from './contexts/AuthContext';
import NewCarListings from './Page/NewCarListings';
import UsedCarListings from './Page/UsedCarListings';
import MyAds from './Page/MyAds';
import DashboardAdmin from './Page/DashboardAdmin';
import UsersPage from './Page/UsersPage';
import CarsPage from './Page/CarsPage';
import AdminLayout from './Page/AdminLayout';
import UnapprovedAds from './Page/UnapprovedAds';
import EditCar from './Page/EditCar';
import AccountSettings from './Page/AccountSettings';
import NewCarsPage from './Page/NewCarsPage';
import UsedCarsPage from './Page/UsedCarsPage';
import Footer from './components/Footer';
import Favorites from './Page/Favorites';
import MaraadCar from './Page/MaraadCar';
import AddGalleryCar from './Page/AddGalleryCar';
import MaraadUserCar from './Page/MaraadUserCar';
import GalleryCar from './Page/GalleryCars';
import JoinFamilyPage from './Page/JoinFamilyPage';
import AboutUs from './Page/AboutUs';
import FAQPage from './Page/FAQPage';
import ExclusiveOffersPage from './Page/ExclusiveOffersPage';
import ContactMessages from './Page/ContactMessages';
import Replies from './Page/Replies';
import Notifications from './Page/Notifications';
import NotificationDetail from './Page/NotificationDetail';
function App() {

 
  return (
    <><AuthProvider>
      <div className="App">
      <Header/>
    </div>
    
      <Routes>
<Route path="/" element={<CarListings/>}/>
          <Route path="/car/:id" element={<CarDetail/>}/>
          <Route path="/contact-us" element={<ContactUs/>} />
          <Route path="/add-car" element={<AddCar/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/my-account" element={<MyAccount/>} />
          <Route path="/profile" element={<ProfileEdit/>} />
          <Route path='new-cars' element={<NewCarListings/>}/>
          <Route path='used-cars' element={<UsedCarListings/>}/>
          <Route path="/my-ads" element={<MyAds/>} />
          <Route path="/account-settings" element={<AccountSettings/>} />
          <Route path="/car/edit/:carId" element={<EditCar/>} />
          <Route path="/favorites" element={<Favorites/>} />
        <Route path="/user/:id/cars" element={<MaraadUserCar/>}/>
        <Route path="/car-dealers" element={<MaraadCar/>} />
        <Route path="/CarBazarPage" element={<JoinFamilyPage/>} />
        <Route path="/about-us" element={<AboutUs/>} />
       <Route path="/faq" element={<FAQPage/>} />
       <Route path="/replies" element={<Replies/>} />
       <Route path="/notifications" element={<Notifications/>}/>
       <Route path="/notifications/:id" element={<NotificationDetail/>}/>
       <Route path="/special-offers" element={<ExclusiveOffersPage/>} />

<Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<DashboardAdmin />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="cars" element={<CarsPage />} />
          <Route path="approved" element={<UnapprovedAds />} />
          <Route path="new-cars" element={<NewCarsPage />} />
          <Route path="users-cars" element={<UsedCarsPage />} />
          <Route path='gallery' element={<AddGalleryCar/>}/>
          <Route path='galleryCars' element={<GalleryCar/>}/>
          <Route path="contact/message" element={<ContactMessages/>} />
        </Route>

        
      </Routes>
      </AuthProvider>
</>
  );
}

export default App;