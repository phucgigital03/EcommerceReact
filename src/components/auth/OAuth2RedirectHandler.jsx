import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
// import { useMyContext } from "../../store/ContextApi";
import { useDispatch } from "react-redux";
import api from "../../api/api";

const OAuth2RedirectHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();
  //   const { setToken, setIsAdmin } = useMyContext();

  const dispatch = useDispatch();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    console.log("OAuth2RedirectHandler: Params:", params.toString());
    console.log("OAuth2RedirectHandler: Token:", token);

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        console.log("Decoded Token:", decodedToken);

        const sendData = {
          userId: decodedToken?.userId,
          token: token,
        };

        const fetchToLogin = async () => {
          const { data } = await api.post("/auth/oauth2/set-cookie", sendData);

          console.log("data Oauth2: ", data);
          dispatch({
            type: "LOGIN_USER",
            payload: data,
          });
          localStorage.setItem("auth", JSON.stringify(data));

          // Delay navigation to ensure local storage operations complete
          setTimeout(() => {
            console.log("Navigating to /");
            navigate("/",{ replace: true });
          }, 100); // 100ms delay
        };

        fetchToLogin();
      } catch (error) {
        console.error("Token decoding failed:", error);
        navigate("/login");
      }
    } else {
      console.log("Token not found in URL, redirecting to login");
      navigate("/login");
    }
  }, [location, navigate]);

  return <div>Redirecting...</div>;
};

export default OAuth2RedirectHandler;
