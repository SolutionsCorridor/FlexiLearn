
export interface Teacher {
  userId: number;
  fullName: string;
  subject: string;
  courses: string[];
  longitude: number;
  latitude: number;
  gender: string;
  profileImg: string;
  hourlyRate: number;
  rating: number;
  totalClasses: number;
  totalStudents: number;
  totalHours: number;
  totalReviews: number;
  availability: string;
  aboutMe: string;
}