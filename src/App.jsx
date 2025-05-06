import "./App.css";

import { AuthProvider } from "./authentication/AuthContext.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import Login from "./pages/login-signup/Login-SignUp.jsx";
import Subjects from "./pages/subjects/Subjects.jsx";
import Profile from "./pages/profile/Profile.jsx";
import Dashboard from "./pages/profile/components/Dashboard.jsx";
import MyProfile from "./pages/profile/components/My-Profile.jsx";
import ProtectedRoute from "./authentication/components/ProtectedRoute.jsx";
import ResetPassword from "./pages/reset-password/Reset-Password.jsx";
import CompleteProfile from "./pages/complete-profile/Complete-Profile.jsx";
import Wallet from "./pages/wallet/Wallet.jsx";
import Subject from "./pages/subject/Subject.jsx";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/complete-profile"
            element={
              <ProtectedRoute>
                <CompleteProfile />
              </ProtectedRoute>
            }
          />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/subject/:id" element={<Subject />} />
          <Route
            path="/wallet"
            element={
              <ProtectedRoute>
                <Wallet />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="my-profile" element={<MyProfile />} />
          </Route>
          <Route path="*" element={<Home />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
