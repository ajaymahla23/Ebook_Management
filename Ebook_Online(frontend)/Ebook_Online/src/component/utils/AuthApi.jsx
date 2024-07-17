import { jwtDecode } from "jwt-decode";

// isLoggedIn==>
export const isLoggedIn = () => {
  let tokenNo = localStorage.getItem("data");
  if (tokenNo == null) {
    return false;
  } else {
    return true;
  }
};

//dologin => set to localstorage
export const doLogin = (data, next) => {
  localStorage.setItem("data", JSON.stringify(data));
  next();
};

// logout==>remove from the localstorage
export const doLogout = (next) => {
  localStorage.removeItem("data");
  next();
};

// get current user
export const getCurrentUserDetail = () => {
  if (isLoggedIn()) {
    // return JSON.parse(localStorage.getItem("data")).user;
    return JSON.parse(localStorage.getItem("data"));
  } else {
    return undefined;
  }
};

// export const getToken = () => {
//   const userToken = localStorage.getItem("data");
//   if (!userToken) {
//     console.log("No token found");
//     return null;
//   }
//   try {
//     const token = JSON.parse(userToken).token;
//     if (token.split(".").length === 3) {
//       return token;
//     } else {
//       console.error("Invalid JWT token format:", token);
//       return null;
//     }
//   } catch (e) {
//     console.error("Error parsing token from localStorage:", e);
//     return null;
//   }
// };

export const getToken = () => {
  const userToken = localStorage.getItem("data");
  if (!userToken) {
    console.log("No token found");
    return null;
  }
  try {
    const parsedToken = JSON.parse(userToken).token;
    if (parsedToken.split(".").length === 3) {
      const decodedToken = jwtDecode(parsedToken);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        alert("Your session has expired. Please log in again.");
        console.error("Token expired");
        doLogout(() => {});
        return null;
      }
      return parsedToken;
    } else {
      console.error("Invalid JWT token format:", parsedToken);
      return null;
    }
  } catch (e) {
    console.error("Error parsing token from localStorage:", e);
    return null;
  }
};
