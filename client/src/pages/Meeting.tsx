import { DatePicker } from "@/components/shared/DatePicker";
import { Button } from "@/components/ui/button";
import { SERVER_URL } from "@/config/config";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function TeacherMeeting() {
    const [meetingDate, setSelectedDate] = useState("");
    const [meetingTime, setSelectedTime] = useState("");

    const navigate = useNavigate();

    const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedTime(event.target.value);
    };

    const handleSave = () => {
        console.log("Selected Date:", meetingDate);
        console.log("Selected Time:", meetingTime);

    axios.put(`${SERVER_URL}/teacher/meeting/${localStorage.getItem('userId')}`, {
            meetingDate: meetingDate,
            meetingTime: meetingTime
        }
        ).then((response) => {
            console.log("Meeting scheduled successfully:", response);
            navigate(`/teacher/pending`);
        }).catch((error) => {
            console.error("Error scheduling meeting:", error);
        });
    };

    return (
        <div className="container mx-auto flex flex-col items-center justify-center gap-4">
            <div className="flex items-center justify-center pt-4">
                <Link to="/">
                    <img
                        src="/img/logo/logo.png"
                        width={200}
                        height={200}
                        alt="FlexiLearn Logo"
                    />
                </Link>
            </div>

            <h1 className="text-4xl font-bold text-center my-8">Schedule a Meeting</h1>

            <div className="flex flex-col items-center justify-center gap-4">
                <div>
                    <label htmlFor="date">Date:</label>
                    <br />
                    {/* Set minDate to today */}
                    <DatePicker onSelect={setSelectedDate} />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="time">Time:</label>
                    {/* Set time input to increment by 15 minutes */}
                    <input
                        type="time"
                        id="time"
                        value={meetingTime}
                        onChange={handleTimeChange}
                        className="w-[280px] border-2 border-gray rounded-md p-2"
                        step={900} // 15 minutes in seconds
                    />
                </div>
            </div>

            <Button onClick={handleSave} className="btn btn-primary mt-4 w-[280px] text-center">
                Save to Database
            </Button>
        </div>
    );
}

export default TeacherMeeting;
