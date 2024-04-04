import Header from "@/features/Admin/Header";
import Profile from "@/features/Admin/Profile"
import { useParams } from "react-router-dom"

const UserProfiles = () => {
    const { id } = useParams<{ id: string }>();
    const { role } = useParams<{ role: string }>();

    return (
        <>
            <Header />
            <Profile id={id || ''} role={role || ''} />
        </>
    )
}

export default UserProfiles