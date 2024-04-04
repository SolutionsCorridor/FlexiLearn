import axios from "axios";
import { DownloadIcon } from "lucide-react"
import { useEffect, useState } from "react";
import { SERVER_URL } from "@/config/config";
import Tab from "./Tab";
import { IParent } from "../interfaces/parent";

interface IUser {
    email: string;
    role: string;
    status: string;
}

const Parent = ({ parent }: { parent: IParent }) => {
    const [activeTab, setActiveTab] = useState("profile");
    const [user, setUser] = useState<IUser>({} as IUser);

    useEffect(() => {
        axios.get(`${SERVER_URL}/user/${parent.userId}`)
            .then((response) => {
                setUser(response.data);
            })
            .catch((error) => {
                console.error("Error fetching user profile:", error);
            })
    }, [])

    const Info: { [key: string]: any } = {
        "Phone No": parent.phoneNo,
        "LANGUAGE": parent.language,
        "GENDER": parent.gender,
    }

    const EmailInfo: { [key: string]: any } = {
        "EMAIL": user.email,
        "ROLE": user.role,
        "STATUS": user.status,
    }

    const OtherInfo: { [key: string]: any } = {
        "ID": parent._id,
        "USER ID": parent.userId,
    }

    return (
        <>
            <div className="relative flex flex-col justify-end text-center pb-8 bg-[url('assets/images/castle.jpg')] h-48 text-4xl text-white">
                <div className="absolute left-0 ml-96">
                    {parent.fullName}
                </div>
            </div>

            <div className="flex flex-row items-center gap-24 bg-gray-400 px-16 h-16">
                <div className="flex flex-col items-center bg-white p-1 rounded-full relative">
                    <img
                        src={parent.profileImage}
                        alt=""
                        className="w-64 h-64 rounded-full"
                    />
                </div>
                <Tab title="PROFILE" value="profile" activeTab={activeTab} setActiveTab={setActiveTab} />
                <Tab title="EMAIL & ROLE" value="email" activeTab={activeTab} setActiveTab={setActiveTab} />
                <Tab title="OTHERS" value="other" activeTab={activeTab} setActiveTab={setActiveTab} />
            </div >


            <div className="flex flex-row">

                <div className="mt-32 flex flex-col items-center gap-10 w-1/4">
                    <div className="flex flex-col border-2 border-none bg-gray-200 rounded-lg px-8 py-4 w-4/5">
                        <h2 className="text-lg text-blue-600">
                            Uploaded Documets
                        </h2>

                        <hr className=" border-black border-1 my-2" />

                        <a href={parent.profileImage} target="_blank" rel="noreferrer" className="flex flex-row items-center justify-between py-4">
                            Image.{parent.profileImage.split('.').pop()}
                            <DownloadIcon />
                        </a>

                    </div>
                </div>

                {activeTab === 'profile' && (
                    <div className="flex flex-col gap-4 w-3/4 p-8">
                        {Object.keys(Info).map((key) => (
                            <div key={key} className="flex items-center gap-4 border-b border-dashed border-gray-400">
                                <div className="w-1/3">{key}</div>
                                <div className="w-2/3">{Info[key] || "-"}</div>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'email' && (
                    <div className="flex flex-col gap-4 w-3/4 p-8">
                        {Object.keys(EmailInfo).map((key) => (
                            <div key={key} className="flex items-center gap-4 border-b border-dashed border-gray-400">
                                <div className="w-1/3">{key}</div>
                                <div className="w-2/3">{EmailInfo[key] || "-"}</div>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'other' && (
                    <div className="flex flex-col gap-4 w-3/4 p-8">
                        {Object.keys(OtherInfo).map((key) => (
                            <div key={key} className="flex items-center gap-4 border-b border-dashed border-gray-400">
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

export default Parent