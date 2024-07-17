import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import LoginForm from "./component/auth/LoginForm";
import PrivateRoute from "./component/utils/PrivateRoute";
import RegisterForm from "./component/auth/RegisterForm";
import HeaderPage from "./component/HeaderPage";
import AddNewBook from "./dashboard/AddBook";
import Admin from "./dashboard/Admin";
import BookList from "./dashboard/BookList";
import EditBook from "./dashboard/EditBook";
import BookDetail from "./user/BookDetail";
import Checkout from "./user/Checkout";
import EditProfile from "./user/EditProfile";
import HomePage from "./user/HomePage";
import ListOldBook from "./user/ListOldBook";
import SearchData from "./user/SearchData";
import SellOldBook from "./user/SellOldBook";
import Setting from "./user/Setting";
import ViewAllBooks from "./user/ViewAllBooks";
import YourOrder from "./user/YourOrder";
import LandingPage from "./user/LandingPage";
import Profile from "./user/Profile";

function App() {
  return (
    <>
      <section>
        <Router>
          <HeaderPage />
          <div className="mt-5"></div>
          <Routes>
            {/* CREDENTIALS FORM */}
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<RegisterForm />} />
            <Route path="/" element={<LandingPage />} />

            {/* USER PAGE */}
            <Route path="/ebook/user" element={<PrivateRoute />}>
              <Route path="home" element={<HomePage />} />
              <Route path="profile/:userId" element={<Profile />} />
              <Route path="detail/:bookId" element={<BookDetail />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path="setting" element={<Setting />} />
              <Route path="sellbook" element={<SellOldBook />} />
              <Route path="old-books" element={<ListOldBook />} />
              <Route path="edit-profile" element={<EditProfile />} />
              <Route path="your_order" element={<YourOrder />} />
              <Route path="search" element={<SearchData />} />
              <Route path="book/:bookCategory" element={<ViewAllBooks />} />
            </Route>

            {/* ADMIN PAGE */}
            <Route path="/ebook/admin/dashboard" element={<Admin />} />

            <Route path="/ebook/admin" element={<PrivateRoute />}>
              <Route path="add" element={<AddNewBook />} />
              <Route path="list" element={<BookList />} />
              <Route path="edit/:bookId" element={<EditBook />} />
            </Route>

            {/* <Route path="/ebook/admin/add" element={<AddNewBook />} />
            <Route path="/ebook/admin/list" element={<BookList />} />
            <Route path="/ebook/admin/edit/:bookId" element={<EditBook />} /> */}
          </Routes>
        </Router>
      </section>
    </>
  );
}

export default App;
