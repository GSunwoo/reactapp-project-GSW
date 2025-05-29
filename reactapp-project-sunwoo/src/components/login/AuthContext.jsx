import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [itsMe, setItsMe] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const saved = Cookies.get('auth');
    console.log(saved);
    if (saved) {
      setIsLoggedIn(true);
      setItsMe(saved);
    }
  }, []);

  const login = (me) => {
    setIsLoggedIn(true);
    setItsMe(me);
    Cookies.set('auth', me, { expires: 1 });
    navigate('/');
  };

  const logout = () => {
    setIsLoggedIn(false);
    Cookies.remove('auth');
    navigate('/');
  };
  
  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, itsMe }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);