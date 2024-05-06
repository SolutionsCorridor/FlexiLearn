'use client';

import {
  LogOut,
  PenSquare,
  BookOpenCheck
} from 'lucide-react';
import { UserGroupIcon } from '@heroicons/react/24/outline';
import { Link, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

const routes = [
  {
    name: 'Meetings',
    href: '/student-dashboard',
    icon: UserGroupIcon,
    color: 'text-sky-700',
    childrens: [],
  },
  {
    name: 'Curriculum',
    href: '/curriculum',
    icon: PenSquare,
    color: 'text-violet-700',
    childrens: [
    ],
  },
  {
    name: 'Assessments',
    href: '/assessment',
    icon: BookOpenCheck,
    color: 'text-blue-700',
    childrens: [],
  }
];

const Sidebar = () => {
  const pathname = useLocation();
  const [isResourcesExpanded, setResourcesExpanded] = useState(false);

  useEffect(() => {
    const isChildRouteActive = routes.some(
      (route) =>
        route.name === 'Resources' &&
        route.childrens.some((child: { href: string }) => child.href === pathname.pathname)
    );
    setResourcesExpanded(isChildRouteActive);
  }, [pathname]);

  const toggleResources = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    // Only toggle if not a child route
    const isChildRoute = routes.some(
      (route) =>
        route.name === 'Resources' &&
        route.childrens.some((child: { href: string }) => child.href === pathname.pathname)
    );
    if (!isChildRoute) {
      setResourcesExpanded(!isResourcesExpanded);
    }
  };

  return (
    <div className='flex h-full flex-col space-y-4 rounded-xl bg-white py-4 text-white shadow-2xl md:mb-3 md:ml-4 md:mt-5'>
      <div className='flex-1 px-4 pb-2'>
        <div className='mb-10 flex flex-col items-center justify-center'>
          <Link to='/dashboard' className='mb-2'>
            <img
              width={220}
              height={226}
              alt='logo'
              src='/src/assets/images/flexiLearn.png'
            />
          </Link>
          <p>
          </p>
          {/* horizontal dark gray line */}
          <div className='mt-4 h-[0.02rem] w-64 bg-gray-700'></div>
        </div>
        <div className='mt-4 space-y-1'>
          {routes.map((route) => (
            <React.Fragment key={route.href}>
              {route.name === 'Mocks' ||
              route.name === 'Writing Master Course' ? (
                <div
                  className={cn(
                    'group flex w-full cursor-pointer justify-start rounded-lg p-3 text-sm font-medium',
                    'text-zinc-400'
                  )}
                >
                  <div className=' flex items-center'>
                    <div className='flex flex-1'>
                      <route.icon className={cn('mr-3 h-5 w-5', route.color)} />
                      {route.name}
                    </div>
                    <span className='-mt-4 ml-1 text-[0.6rem] font-semibold italic text-red-500'>
                      Coming Soon
                    </span>
                  </div>
                </div>
              ) : (
                <Link
                  to={route.href}
                  className={cn(
                    'group flex w-full cursor-pointer justify-start rounded-lg p-3 text-sm font-medium transition duration-150 ease-in-out hover:bg-[#DCE3FE] hover:text-[#3C21F7]',
                    route.href === pathname.pathname
                      ? 'bg-[#E3DEFF] text-[#3C21F7]'
                      : 'text-[#939393]'
                  )}
                  onClick={
                    route.name === 'Resources' ? toggleResources : undefined
                  }
                >
                  <div className='flex flex-1 items-center'>
                    <route.icon className={cn('mr-3 h-5 w-5', route.color)} />
                    {route.name}
                  </div>
                </Link>
              )}
              
            </React.Fragment>
          ))}
        </div>
      </div>
      {/* Logout button at the end of the sidebar */}
      <div className='mb-4 px-2'>
        <Link to='/auth/logout'>
          <div
            className={cn(
              'group flex w-full cursor-pointer justify-start rounded-lg bg-[#FDEDEB] p-3 text-sm font-medium text-[#D32718] transition duration-150 ease-in-out hover:bg-[#d3b7b4] hover:text-[#D32718]'
            )}
          >
            <LogOut className='text-dark-red mr-3 h-5 w-5' />
            Logout
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;