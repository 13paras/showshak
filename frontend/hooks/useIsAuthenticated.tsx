import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { CustomPayload } from "@/types/types";
import { setUser, setUserAuth } from "@/redux/slices/userSlice";

const useIsAuthenticated = () => {
  const dispatch = useDispatch();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = await AsyncStorage.getItem("jwt");
        if (token) {
          const decodedToken = jwtDecode<CustomPayload>(token);
          const userId = decodedToken.userId;

          // Dispatch actions to set user data
          dispatch(setUserAuth(true));
          dispatch(
            setUser({
              id: userId,
              loading: false,
            })
          );

          setIsAuthenticated(true);
        } else {
          // No token found, user is not authenticated
          dispatch(setUserAuth(false));
          dispatch(setUser({ id: null, loading: false }));
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Error fetching the token:", error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { isAuthenticated, loading };
};

export default useIsAuthenticated;
