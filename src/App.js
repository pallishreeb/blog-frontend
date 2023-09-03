import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "../src/components/Header";
import Home from "./pages/home";
import Footer from "./components/Footer";
import Post from "./pages/post";
import Profile from "./pages/profile";
import PrivateRoute from './pages/privateRoute';

import { Route, Routes, useParams } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Notification from "./pages/notification";
import Verification from "./pages/verification";
import Forgotpassword from "./pages/forgotPassword";
import Resetpassword from "./pages/resetpassword";
import NotFoundPage from './pages/notFoundPage';
import { useContext } from 'react';
import authContext from './context';
import Contact from './pages/contact';
function App() {
  const { token } = useContext(authContext)

  const params = useParams()
  return (
    <div className="App">
      <Header params={params} />
      <ToastContainer />

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/post/:id" element={<Post />} />
        <Route exact path="/post/category/:categoryId" element={<Home />} />
        <Route exact path="/post/subcategory/:subcategoryId" element={<Home />} />
        <Route exact path="/profile" element={<PrivateRoute />}>
          <Route exact path="/profile" element={<Profile />} />
        </Route>
        <Route exact path="/notification" element={<PrivateRoute />}>
          <Route exact path="/notification" element={<Notification />} />
        </Route>
        <Route exact path="/forgot-password" element={<Forgotpassword />} />
        <Route exact path="/reset-password" element={<Resetpassword />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/verify" element={<Verification />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
