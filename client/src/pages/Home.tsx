import Banner from "@/features/Home/Banner";
import Navbar from "@/features/Home/Navbar";
import Courses from "@/features/Home/Courses";
import Mentor from "@/features/Home/Mentor";
import Testimonials from "@/features/Home/Testimonials";
import Newsletter from "@/features/Home/Newsletter";
import Footer from "@/features/Home/Footer";

export default function Home() {
    return (
        <>
            <main>
                <Navbar />
                <Banner />
                <Courses />
                <Mentor />
                <Testimonials />
                <Newsletter />
                <Footer />
            </main>
        </>
    );
}
