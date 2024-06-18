import bookmark from "../assets/icons/bookmark.png";
import home from "../assets/icons/home.png";
import plus from "../assets/icons/plus.png";
import profile from "../assets/icons/profile.png";
import leftArrow from "../assets/icons/left-arrow.png";
import menu from "../assets/icons/menu.png";
import search from "../assets/icons/search.png";
import upload from "../assets/icons/upload.png";
import rightArrow from "../assets/icons/right-arrow.png";
import logout from "../assets/icons/logout.png";
import eyeHide from "../assets/icons/eye-hide.png";
import eye from "../assets/icons/eye.png";
import play from "../assets/icons/play.png";

export default {
  play,
  bookmark,
  home,
  plus,
  profile,
  leftArrow,
  menu,
  search,
  upload,
  rightArrow,
  logout,
  eyeHide,
  eye,
};

import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

export const vectorIcons = {
  chat: (props) => <Ionicons name="chatbubble-ellipses-outline" size={26} {...props} />,
  home: (props) => <Feather name="link" size={23} {...props} />,
  user: (props) => <Feather name="phone-call" size={27} {...props} />,
};
