export interface ITeacher {
    userId: string;
    _id: string;
    fullName: string;
    courses: string[];
    profileImage: string;
    aboutMe: string;
    education: string;
    experience: string;
    language: string;
    gender: string;
    longitude: number;
    latitude: number;
    subject: string;
    availability: string;
    availabilityHours: number;
    hourlyRate: number;
    rating: number;
    totalClasses: number;
    totalStudents: number;
    totalHours: number;
    totalReviews: number;
    cv: string;
    meetingDate: string;
    meetingTime: string;
    adminComments: string;
    quizScore: number;
}
