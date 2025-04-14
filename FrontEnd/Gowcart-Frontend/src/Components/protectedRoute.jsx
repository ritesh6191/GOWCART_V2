import { Navigate } from 'react-router-dom';
import useAuth from '../Hooks/authHook';

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, authChecked } = useAuth();

  if (!authChecked) {
    return <div className="text-center p-8 text-gray-700">Checking login status...</div>;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
