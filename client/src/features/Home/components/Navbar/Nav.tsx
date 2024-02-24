import { Disclosure } from "@headlessui/react";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import Drawer from "./Drawer";
import Drawerdata from "./Drawerdata";
import { useNavigate } from "react-router-dom";
// import { isLoggedIn } from "@/utils/help";
import { UserNav } from "./user-nav";

interface NavigationItem {
  name: string;
  href: string;
  current: boolean;
}

const navigation: NavigationItem[] = [
  { name: "Home", href: "/", current: true },
  { name: "Courses", href: "#courses", current: false },
  { name: "Mentor", href: "#mentor", current: false },
  { name: "Group", href: "/#group", current: false },
  { name: "Testimonial", href: "#testimonial", current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const CustomLink = ({
  href,
  onClick,
  children,
}: {
  href: string;
  onClick: () => void;
  children: React.ReactNode;
}) => {
  return (
    <Link to={href} >
      <span onClick={onClick} className="px-3 py-4 text-lg font-normal">
        {children}
      </span>
    </Link>
  );
};

const Nav = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const [currentLink, setCurrentLink] = useState("/");
  const navigate = useNavigate();
  const isAuth = localStorage.getItem("isAuthenticated")


  const handleLinkClick = (href: string) => {
    setCurrentLink(href);
  };

  return (
    <Disclosure as="nav" className="navbar">
      <>
        <div className="px-6 py-4 mx-auto max-w-7xl lg:px-8">
          <div className="relative flex items-center justify-between h-12 md:h-20">
            <div className="flex items-center flex-1 sm:items-stretch sm:justify-start">
              {/* LOGO */}

              <div className="flex items-center flex-shrink-0">
                <img
                  className="block w-40 h-20"
                  src={"src/assets/images/flexiLearn.png"}
                  alt="dsign-logo"
                />

              </div>

              {/* LINKS */}

              <div className="hidden m-auto lg:block">
                <div className="flex space-x-4">
                  {navigation.map((item) => (
                    <CustomLink
                      key={item.name}
                      href={item.href}
                      onClick={() => handleLinkClick(item.href)}
                    >
                      <span
                        className={classNames(
                          item.href === currentLink
                            ? "underline-links"
                            : "text-slategray",
                          "px-3 py-4 text-lg font-normal opacity-75 hover:opacity-100"
                        )}
                        aria-current={item.href ? "page" : undefined}
                      >
                        {item.name}
                      </span>
                    </CustomLink>
                  ))}
                </div>
              </div>
            </div>

            {/* SIGNIN DIALOG */}

            {
              isAuth === "false" ? (
                <>
                  <div className="absolute inset-y-0 right-0 flex items-center sm:static sm:inset-auto sm:pr-0">
                    <div className='hidden lg:block'>
                      <button type="button" className='text-lg font-medium text-gray-500' onClick={() => navigate('/login')}>
                        Log In
                      </button>
                    </div>
                  </div>

                  {/* REGISTER DIALOG */}

                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:pr-0">
                    <div className="hidden lg:block">
                      <button
                        className="px-16 py-5 text-lg font-medium text-gray-600 transition duration-150 ease-in-out bg-red-200 rounded-full hover:bg-red-500 ml-9 hover:text-white"
                        onClick={() => navigate('/register-cards')}
                      >
                        Sign up
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="hidden lg:block">
                  <UserNav />
                </div>
              )
            }

            {/* DRAWER FOR MOBILE VIEW */}

            {/* DRAWER ICON */}

            <div className="block lg:hidden">
              <Bars3Icon
                className="block w-6 h-6"
                aria-hidden="true"
                onClick={() => setIsOpen(true)}
              />
            </div>

            {/* DRAWER LINKS DATA */}

            <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
              <Drawerdata />
            </Drawer>
          </div>
        </div>
      </>
    </Disclosure>
  );
};

export default Nav;
