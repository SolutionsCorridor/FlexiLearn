import { useState, useEffect } from "react";
import { getTeacher } from "@/services/teacher/profile.service";

const TeacherPending = () => {
    const [eventDetails, setEventDetails] = useState<any>(null);
    useEffect(() => {
        const fetchEventDetails = async () => {
            const userId = localStorage.getItem("userId");

            if (!userId) { return; }

            try {
                getTeacher(userId).then((response) => {
                    setEventDetails(response);
                });
            } catch (error) {
                console.error("Error fetching event details:", error);
            }
        };

        fetchEventDetails();
    }, []);

    return (
        <div className="container mx-auto">
            <h1 className="text-4xl font-bold text-center my-8">
                Your Meeting is Pending!
            </h1>

            {eventDetails && (
                <div className="flex flex-col items-center justify-center gap-4">
                    <p className="text-2xl font-bold">
                        Date: {eventDetails.meetingDate}
                    </p>
                    <p className="text-2xl font-bold">
                        Time: {eventDetails.meetingTime}
                    </p>
                </div>
            )}
        </div>
    );
};

export default TeacherPending;
