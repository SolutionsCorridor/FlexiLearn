import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

interface NavigationItem {
  name: string;
  href: string;
  current: boolean;
}

const navigation: NavigationItem[] = [
  { name: "Home", href: "/", current: true },
  { name: "Courses", href: "#courses", current: false },
  { name: "Mentor", href: "#mentor", current: false },
  { name: "Group", href: "#/", current: false },
  { name: "Testimonial", href: "#testimonial", current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const Data = () => {
  const { setAuth } = useAuth();
  const isAuth = localStorage.getItem("isAuthenticated");
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("logout");
    localStorage.removeItem("accessToken");
    localStorage.setItem("isAuthenticated", "false");
    localStorage.removeItem("userType");
    setAuth(null);
    window.location.reload();
  };

  return (
    <div className="rounded-md max-w-sm w-full mx-auto">
      <div className="flex-1 space-y-4 py-1">
        <div className="sm:block">
          <div className="space-y-1 px-5 pt-2 pb-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={classNames(
                  item.current
                    ? "text-black hover:opacity-100"
                    : "hover:text-black hover:opacity-100",
                  "py-1 text-lg font-normal opacity-75 block"
                )}
                aria-current={item.current ? "page" : undefined}
              >
                {item.name}
              </Link>
            ))}
            <div className="mt-4"></div>
            {isAuth === "false" ? (
              <div>
                <button
                  className="bg-white w-full text-Blueviolet border border-semiblueviolet font-medium py-2 px-4 rounded"
                  onClick={() => navigate("/login")}
                >
                  Log In
                </button>
                <button
                  className="bg-semiblueviolet w-full hover:bg-Blueviolet hover:text-white text-Blueviolet font-medium my-2 py-2 px-4 rounded"
                  onClick={() => navigate("/signup")}
                >
                  Sign up
                </button>
              </div>
            ) : (
              <div>
                <button
                  className="bg-white w-full text-Blueviolet border border-semiblueviolet font-medium py-2 px-4 rounded"
                  onClick={() => navigate("/profile")}
                >
                  Profile
                </button>
                <button
                  className="bg-semiblueviolet w-full hover:bg-Blueviolet hover:text-white text-Blueviolet font-medium my-2 py-2 px-4 rounded"
                  onClick={handleLogout}
                >
                  Log out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Data;
