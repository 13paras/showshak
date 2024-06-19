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
        const decodedToken = jwtDecode<CustomPayload>(token as string);
        const userId = decodedToken.userId;
        if (token) {
          setIsAuthenticated(true);
          dispatch(setUserAuth(true));
          dispatch(
            setUser({
              id: userId,
              loading: false,
            })
          );
        } else {
          setIsAuthenticated(false);
          dispatch(setUserAuth(false));
          dispatch(setUser({ id: null, loading: false }));
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
