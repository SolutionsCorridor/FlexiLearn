import  { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchTeacher } from '@/services/teacher/profile.service';
// import Image from 'react-image';
// import { AcademicCapIcon, DocumentCheckIcon, StarIcon } from 'react-heroicons';
import { Teacher } from '@/constants/types';
import { UsersIcon,StarIcon,CheckIcon } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Loader from '@/components/shared/Loader';

const TeacherProfileForStudent = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [teacherData, setTeacherData] = useState<Teacher>();
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    if (id) {
      console.log(id)
      setLoading(true);
      fetchTeacher(id)
        .then((res) => {
          setTeacherData(res);
          console.log(res);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [id]);

  const goToBookAppointment = () => {
    navigate(`/teacher/meeting`);
  };

  const TabsStyles = {
    TabsListStyle: 'border-b-2 rounded-none border-white-500 w-full bg-white justify-start',
    TabsTriggerStyle: 'text-xl font-bold text-black bg-white data-[state=active]:border-b-4 data-[state=active]:border-red-700',
    TabsContentStyle: 'mt-4 bg-white text-black p-4 rounded-2xl min-h-[200px]',
  };

  return (
    <div className="bg-white m-auto my-12 max-w-6xl relative">
      {loading && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <Loader />
        </div>
      )}

      <div className="absolute top-4 right-4 bg-red-500 text-white py-3 px-8 rounded-full text-lg">
        ${teacherData?.hourlyRate}/hr
      </div>

      <div className="bg-primary text-white flex justify-center flex-col max-w-6xl m-auto p-20 py-8 gap-8 rounded-3xl">
        <div>
          <img
            src={teacherData?.profileImage}
            width={80}
            height={80}
            alt="teacher profile"
            className='flex flex-col items-center justify-center gap-2 rounded-full p-2'
          />
        </div>
        <div className='flex flex-col gap-1'>
            <h2 className='text-3xl font-bold'>
                {teacherData?.fullName ?? ''}
            </h2>
            <h4 className='text-lg text-gray-500'>
                {teacherData?.gender ?? ''}
            </h4>
            <h3 className='text-xl text-gray-300'>
                {teacherData?.subject ?? ''}
            </h3>
        </div>
        <div className='flex flex-row flex-wrap gap-8'>
          <div className='flex flex-row flex-wrap gap-2'>
            <StarIcon className='text-yellow-400 h-6 w-6' />
            <div>
              {teacherData?.rating}
            </div>
          </div>
          <div className='flex flex-row flex-wrap gap-1'>
            <CheckIcon className='text-green-400 h-6 w-6' />
            <div>
              <span className='text-slate-400'>
              Total Reviews: 
              </span>
              {" "}
              {teacherData?.totalReviews}
            </div>
          </div>
          <div className='flex flex-row flex-wrap gap-2'>
            <UsersIcon className='text-blue-400 h-6 w-6' />
            <div>
              {teacherData?.totalStudents} Students
            </div>
          </div>
        </div>
        <div className=''>
          <button
            className='bg-green-600 p-6 rounded-2xl text-lg'
            onClick={goToBookAppointment}
          >
            Book an Appointment
          </button>
        </div>
      </div>

      <div className='flex flex-col gap-8 p-20 pb-0'>
        <Tabs defaultValue="description" className="w-full">
          <TabsList className={TabsStyles.TabsListStyle}>
            <TabsTrigger value="description" className={TabsStyles.TabsTriggerStyle}>
              Description
            </TabsTrigger>
            <TabsTrigger value="subject" className={TabsStyles.TabsTriggerStyle}>
              Subject
            </TabsTrigger>
            <TabsTrigger value="availability" className={TabsStyles.TabsTriggerStyle}>
              Availability
            </TabsTrigger>
          </TabsList>
          <TabsContent value="description" className={TabsStyles.TabsContentStyle}>
            <p className='text-lg'>
              {teacherData?.aboutMe}
            </p>
          </TabsContent>
          <TabsContent value="subject" className={TabsStyles.TabsContentStyle}>
            <p className='text-lg'>
              {teacherData?.subject}
            </p>
          </TabsContent>
          <TabsContent value="availability" className={TabsStyles.TabsContentStyle}>
            <div className="flex gap-4">
              {teacherData?.availability === 'Both' && (
                <>
                  <div className='flex flex-col gap-2 text-lg'>
                    This teacher is available both remotely and in-person.
                  </div>
                </>
              )}
              {teacherData?.availability === 'Remote' && (
                <div className='flex flex-col gap-2 text-lg'>
                  This teacher is only available remotely
                </div>
              )}
              {teacherData?.availability === 'In-person' && (
                <div className='flex flex-col gap-2 text-lg'>
                  This teacher is only available in-person
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TeacherProfileForStudent;
