"use client"

import { cn } from "@/lib/utils";
import React, { useState } from "react";
import CrossIcon from "@/components/ui/cross-icon";
import { Teacher } from "@/constants/types";
// import { useRouter } from "next/navigation";


interface ProfileDialogProps {
  teacher: Teacher;
  onClose: () => void;
}

const ProfileDialog: React.FC<ProfileDialogProps> = ({ teacher, onClose }) => {
//   const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);



  const handleClose = () => {
    setIsOpen(false);
    onClose();
    // router.push("/teacher/profile/" + teacher.id)
  };

  return (
    <>
      {isOpen && (
        <div className="fixed left-0 top-0 z-20 flex h-screen w-screen items-center justify-center bg-transparent bg-opacity-50 backdrop-blur-md backdrop-grayscale backdrop-filter">
          <div className=" w-80 rounded-lg bg-white p-4 shadow-lg sm:w-96">
            <div className="flex justify-end">
              {/* Close Button */}
              <button
                className="text-gray-500 transition hover:text-red-500"
                onClick={handleClose}
              >
                <CrossIcon />
              </button>
            </div>
            {/* Profile Picture */}
            <div className="flex space-x-4">
              <img
                src={teacher.profileImg}
                alt={`${teacher.name}'s Profile`}
                className={cn(
                  teacher.gender === "Male" ? "h-24 w-24" : "h-24 w-24",
                  "rounded-full"
                )}
              />
              <div>
                {/* Teacher Name */}
                <h2 className="text-xl font-semibold">{teacher.name}</h2>
                {/* Location */}
                <p className="text-gray-500">{teacher.address}</p>
                {/* Subject */}
                <p className="mt-2 text-lg font-medium">{teacher.subject}</p>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    {teacher.reviews} Reviews
                  </p>
                </div>
              </div>
            </div>
            {/* Reviews */}

            {/* View More Button */}
            <div className="flex items-center justify-center">
              <button
                className="mt-4 rounded bg-red-500 px-4 py-2 text-white"
                onClick={handleClose}
              >
                View More
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileDialog;
