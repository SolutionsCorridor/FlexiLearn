import { cn } from "@/lib/utils";
import React, { useState, useEffect } from "react";
import CrossIcon from "@/components/ui/cross-icon";
import { Teacher } from "@/constants/types";
import { useNavigate } from "react-router-dom";


interface ProfileDialogProps {
  teacher: Teacher;
  onClose: () => void;
}

const ProfileDialog: React.FC<ProfileDialogProps> = ({ teacher, onClose }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${teacher.latitude},${teacher.longitude}&key=AIzaSyAjf0LKhpoO-RtRvcaaw4UY5RimcXmWwuE`
        );

        if (response.ok) {
          const data = await response.json();
          if (data.results && data.results.length > 0) {
            setAddress(data.results[0].formatted_address);
          }
        }
      } catch (error) {
        console.error("Error fetching address:", error);
      }
    };

    fetchAddress();
  }, [teacher.latitude, teacher.longitude]);



  const handleClose = () => {
    setIsOpen(false);
    onClose();
  };
  const handleRedirect = () => {
    setIsOpen(false);
    onClose();
    navigate("/teacher/profile/" + teacher.userId);
  }
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
                src={teacher.profileImage}
                alt={`${teacher.fullName}'s Profile`}
                className={cn(
                  teacher.gender === "Male" ? "h-24 w-24" : "h-24 w-24",
                  "rounded-full"
                )}
              />
              <div>
                {/* Teacher Name */}
                <h2 className="text-xl font-semibold">{teacher.fullName}</h2>
                {/* Location */}
                <p className="text-gray-500">{address || "Loading address..."}</p>
                {/* Subject */}
                <p className="mt-2 text-lg font-medium">{teacher.subject}</p>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    {teacher.totalReviews} Reviews
                  </p>
                </div>
              </div>
            </div>
            {/* Reviews */}

            {/* View More Button */}
            <div className="flex items-center justify-center">
              <button
                className="mt-4 rounded bg-red-500 px-4 py-2 text-white"
                onClick={handleRedirect}
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
