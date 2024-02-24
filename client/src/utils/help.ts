// some utils will come here
import Cookies from "js-cookie"

export const isLoggedIn = () => {
  return Cookies.get("access_token") ? true : false
}

