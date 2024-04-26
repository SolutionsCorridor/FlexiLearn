import axios from "axios";
import { DownloadIcon } from "lucide-react"
import { useEffect, useState } from "react";
import { SERVER_URL } from "@/config/config";
import Tab from "./Tab";
import { ITeacher } from "../interfaces/teacher";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { changeStatus } from "@/services/auth.service";
import { updateComments } from "@/services/teacher/profile.service";
import toast, { Toaster } from "react-hot-toast";

interface IUser {
    email: string;
    role: string;
    status: string;
}

const Teacher = ({ teacher }: { teacher: ITeacher }) => {
    const [activeTab, setActiveTab] = useState("profile");
    const [user, setUser] = useState<IUser>({} as IUser);
    const [adminComments, setAdminComments] = useState("");
    const [status, setStatus] = useState("");
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        axios.get(`${SERVER_URL}/user/${teacher.userId}`)
            .then((response) => {
                setUser(response.data);
                setStatus(response.data.status);
                setAdminComments(teacher.adminComments);
            })
            .catch((error) => {
                console.error("Error fetching user profile:", error);
            })
    }, [])

    const handleCommentsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAdminComments(event.target.value);
    };

    const handleStatusChange = (value: string) => {
        setStatus(value);
    }

    const handleUpdate = () => {
        setUpdating(true);

        if (status !== user.status) {
            changeStatus(teacher.userId, status)
                .then((response) => {
                    toast.success("Status updated successfully");
                    console.log("Status updated successfully:", response.data);
                })
                .catch((error) => {
                    console.error("Error updating status:", error);
                })
        }


        if (adminComments !== teacher.adminComments) {
            updateComments(teacher.userId, adminComments)
                .then((response) => {
                    console.log("Meeting updated successfully:", response.data);
                })
                .catch((error) => {
                    console.error("Error updating meeting:", error);
                })
        }
    };

    const Info: { [key: string]: any } = {
        "COURSES": teacher.courses,
        "ABOUT ME": teacher.aboutMe,
        "EDUCATION": teacher.education,
        "EXPERIENCE": teacher.experience,
        "LANGUAGE": teacher.language,
        "GENDER": teacher.gender,
        "LONGITUDE": teacher.longitude,
        "LATITUDE": teacher.latitude,
        "SUBJECT": teacher.subject,
        "AVAILABILITY": teacher.availability,
        "AVAILABILITY HOURS": teacher.availabilityHours,
        "HOURLY RATE": teacher.hourlyRate,
        "RATING": teacher.rating,
        "TOTAL CLASSES": teacher.totalClasses,
        "TOTAL STUDENTS": teacher.totalStudents,
        "TOTAL HOURS": teacher.totalHours,
        "TOTAL REVIEWS": teacher.totalReviews,
    }

    const EmailInfo: { [key: string]: any } = {
        "EMAIL": user.email,
        "ROLE": user.role,
        "STATUS": user.status,
    }

    const MeetingInfo: { [key: string]: any } = {
        "QUIZ SCORE": teacher.quizScore || "NOT ATTEMPTED YET",
        "MEETING DATE": teacher.meetingDate,
        "MEETING TIME": teacher.meetingTime,
        "COMMENTS": (
            <Input
                type="text"
                value={adminComments}
                onChange={handleCommentsChange}
                placeholder="Add comments"
                className="w-4/5 border-0 border-b-2 border-black rounded-none focus-visible:ring-0"
            />
        ),
        "STATUS": (
            <Select value={status} onValueChange={handleStatusChange}>
                <SelectTrigger className="w-48">
                    <SelectValue placeholder="Select Status" defaultValue={user.status} />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="registered">Registered</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="assessment">Assessment</SelectItem>
                    <SelectItem value="meeting">Meeting</SelectItem>
                    <SelectItem value="Approved">Approved</SelectItem>
                    <SelectItem value="Rejected">Rejected</SelectItem>
                </SelectContent>
            </Select>
        ),
    }

    const OtherInfo: { [key: string]: any } = {
        "ID": teacher._id,
        "USER ID": teacher.userId,
    }

    return (
        <>
        <Toaster/>
            <div className="relative flex flex-col justify-end text-center pb-8 bg-[url('assets/images/castle.jpg')] h-48 text-4xl text-white">
                <div className="absolute top-0 right-0 px-4 py-2 bg-green-600 rounded-bl-lg text-2xl">
                    {user.status}
                </div>
                <div className="absolute left-0 ml-96">
                    {teacher.fullName}
                </div>
            </div>

            <div className="flex flex-row items-center h-16 gap-24 px-16 bg-gray-400">
                <div className="relative flex flex-col items-center p-1 bg-white rounded-full">
                    <img
                        src={teacher.profileImage}
                        alt=""
                        className="w-64 h-64 rounded-full"
                    />
                </div>
                <Tab title="PROFILE" value="profile" activeTab={activeTab} setActiveTab={setActiveTab} />
                <Tab title="EMAIL & ROLE" value="email" activeTab={activeTab} setActiveTab={setActiveTab} />
                <Tab title="MEETING" value="meeting" activeTab={activeTab} setActiveTab={setActiveTab} />
                <Tab title="OTHERS" value="other" activeTab={activeTab} setActiveTab={setActiveTab} />
            </div >


            <div className="flex flex-row">

                <div className="flex flex-col items-center w-1/4 gap-10 mt-32">
                    <div className="flex flex-col w-4/5 px-8 py-4 bg-gray-200 border-2 border-none rounded-lg">
                        <h2 className="text-lg text-blue-600">
                            Uploaded Documets
                        </h2>

                        <hr className="my-2 border-black border-1" />

                        <a href={teacher.cv} target="_blank" rel="noreferrer" className="flex flex-row items-center justify-between py-4">
                            <p>
                                CV.pdf
                            </p>
                            <DownloadIcon />
                        </a>

                        <a href={teacher.profileImage} target="_blank" rel="noreferrer" className="flex flex-row items-center justify-between py-4">
                            Image.{teacher.profileImage.split('.').pop()}
                            <DownloadIcon />
                        </a>

                    </div>
                </div>

                {activeTab === 'profile' && (
                    <div className="flex flex-col w-3/4 gap-4 p-8">
                        {Object.keys(Info).map((key) => (
                            <div key={key} className="flex items-center gap-4 border-b border-gray-400 border-dashed">
                                <div className="w-1/3">{key}</div>
                                {key === "COURSES" && Info[key].map((course: string) => (
                                    <div key={course}
                                        className="flex items-center gap-4 border-b border-gray-400 border-dashed"
                                    >
                                        <div className="px-4 py-2 bg-gray-200 rounded-lg">
                                            {course}
                                        </div>
                                    </div>
                                ))}
                                {key !== "COURSES" &&
                                    <div className="w-2/3">{Info[key] || "-"}</div>
                                }
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'email' && (
                    <div className="flex flex-col w-3/4 gap-4 p-8">
                        {Object.keys(EmailInfo).map((key) => (
                            <div key={key} className="flex items-center gap-4 border-b border-gray-400 border-dashed">
                                <div className="w-1/3">{key}</div>
                                <div className="w-2/3">{EmailInfo[key] || "-"}</div>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'meeting' && (
                    <div className="flex flex-col w-3/4 gap-4 p-8">
                        {Object.keys(MeetingInfo).map((key) => (
                            <div key={key} className="flex items-center gap-4 border-b border-gray-400 border-dashed py-2">
                                <div className="w-1/3">{key}</div>
                                <div className="w-2/3">{MeetingInfo[key] || "-"}</div>
                            </div>
                        ))}

<Button onClick={handleUpdate} className="w-1/4 self-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            {updating ? 'Updating...' : 'Update'}
        </Button>
                    </div>
                )}

                {activeTab === 'other' && (
                    <div className="flex flex-col w-3/4 gap-4 p-8">
                        {Object.keys(OtherInfo).map((key) => (
                            <div key={key} className="flex items-center gap-4 border-b border-gray-400 border-dashed">
                                <div className="w-1/3">{key}</div>
                                <div className="w-2/3">{OtherInfo[key] || "-"}</div>
                            </div>
                        ))}
                    </div>
                )}

            </div>
        </>
    )
}

export default Teacher