import { Link } from "react-router-dom"

const Header = () => {

    const handleLogOut = () => {
        localStorage.setItem("isAuthenticated", "false");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userId");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("expiresIn");
        localStorage.removeItem("userType");
        window.location.reload();
    };

    return (
        <div className="container flex justify-between w-full mx-auto bg-transparent">
            <div className="flex items-center">
                <Link to={'/dashboard'}>
                    <img
                        className="w-40 h-20"
                        src={"/src/assets/images/flexiLearn.png"}
                        alt="design-logo"
                    />
                </Link>

            </div>

            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:pr-0">
                <div className="hidden lg:block">
                    <button
                        className="px-12 py-4 text-base font-medium text-gray-600 transition duration-150 ease-in-out bg-red-200 rounded-full hover:bg-red-500 ml-9 hover:text-white"
                        onClick={() => handleLogOut()}
                    >
                        Log Out
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Header