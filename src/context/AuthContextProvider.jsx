import { createContext } from 'react';

const AuthContext = createContext(null);

const ACCESS_TOKEN_KEY = 'accessToken';

function getAccessTokenFromLocalStorage() {
  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
  return accessToken ? true : false;
}

//클라이언트측 인증상태관리 컴포넌트
// 로컬스토리지를 보고 인증되었는지 판단
// 로그인, 로그아웃 메서드로 인증상태 설정
function AuthContextProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    getAccessTokenFromLocalStorage //useEffect 대신
  );

  function setAppStateLogOut() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    setIsAuthenticated(false);
  }

  function setAppStateLoggedIn(accessToken) {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    setIsAuthenticated(true);
  }

  function getAccessToken() {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        getAccessToken,
        setAppStateLogOut,
        setAppStateLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
