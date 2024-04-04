import { getParent } from "@/services/parent/profile.service";
import { getStudent } from "@/services/student/profile.service";
import { getTeacher } from "@/services/teacher/profile.service";
import { useEffect, useState } from "react";
import Teacher from "./components/Teacher";
import Student from "./components/Student";
import Parent from "./components/Parent";
import { IParent } from "./interfaces/parent";
import { ITeacher } from "./interfaces/teacher";
import { IStudent } from "./interfaces/student";

interface IProfile {
    id: string;
    role: string;
}

const Profile = (props: IProfile) => {
    const [teacher, setTeacher] = useState<ITeacher>({} as ITeacher);
    const [student, setStudent] = useState<IStudent>({} as IStudent);
    const [parent, setParent] = useState<IParent>({} as IParent);

    const getUserProfile = async () => {
        try {
            switch (props.role) {
                case "teacher":
                    getTeacher(props.id).then((response: any) => {
                        setTeacher(response);
                    });
                    break;
                case "student":
                    getStudent(props.id).then((response: any) => {
                        setStudent(response.data);
                    });
                    break;
                case "parent":
                    getParent(props.id).then((response: any) => {
                        setParent(response.data);
                    });
                    break;
                default:
                    break;
            }
        } catch (error) {
            console.error("Error fetching user profile:", error);
        }
    }

    useEffect(() => {
        getUserProfile();
    }, []);

    return (
        <div className="flex flex-col">
            {teacher.userId && (
                <Teacher teacher={teacher} />
            )}

            {student.userId && (
                <Student student={student} />
            )}

            {parent.userId && (
                <Parent parent={parent} />
            )}
        </div >
    )
}

export default Profile