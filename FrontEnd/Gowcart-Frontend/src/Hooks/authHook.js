import { useEffect, useState } from 'react';
import axios from 'axios';

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    axios.get('/user/check-auth', { withCredentials: true })
      .then(res => {
        if (res.data?.loggedIn === true) {
          setIsLoggedIn(true);
        }
      })
      .catch(() => {
        setIsLoggedIn(false);
      })
      .finally(() => {
        setAuthChecked(true);
      });
  }, []);

  return { isLoggedIn, authChecked };
};

export default useAuth;
