import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTeacher } from '@/services/teacher/profile.service';
import { Teacher } from '@/constants/types';
import { UsersIcon, StarIcon, CheckIcon } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Loader from '@/components/shared/Loader';
import axios from 'axios';
import { SERVER_URL } from '@/config/config';

const TeacherProfileForStudent = () => {
  const { id } = useParams();

  const [teacherData, setTeacherData] = useState<Teacher>();
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [appointmentDate, setAppointmentDate] = useState<string>("");
  const [appointmentTime, setAppointmentTime] = useState<string>("");
  const [isBooked, setIsBooked] = useState(false);


  useEffect(() => {
    if (id) {
      setLoading(true);
      getTeacher(id)
        .then((res) => {
          setTeacherData(res);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [id]);

  useEffect(() => {
    const studentId = localStorage.getItem('userId');

    const teacherId = id;

    axios.get(`${SERVER_URL}/appointment/student/${studentId}/teacher/${teacherId}`)
      .then((res: any) => {
        // convert date from yyyy-mm-dd format to dd MMM yyyy format
        const date = new Date(res.data[0].date);
        const formattedDate = date.toLocaleDateString('en-US', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        });
        setAppointmentDate(formattedDate);

        const time = res.data[0].time;
        const [hours, minutes] = time.split(':');
        const isPM = hours >= 12;
        const formattedHours = isPM ? hours - 12 : hours;
        const formattedMinutes = minutes;
        setAppointmentTime(`${formattedHours}:${formattedMinutes} ${isPM ? 'PM' : 'AM'}`);

        setIsBooked(true);
      })
      .catch((err) => {
        console.error(err);
      });

  }, [id]);


  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const bookAppointment = () => {

    axios.post(`${SERVER_URL}/appointment`, {
      studentId: localStorage.getItem('userId'),
      teacherId: id,
      date: appointmentDate,
      time: appointmentTime,
    });

    closeModal();

    window.location.reload();
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
        <div className='flex flex-row flex-wrap gap-8'>
          {isBooked && (
            <div className='flex flex-col gap-4'>
              <h3 className='text-lg'>
                Your appointment is booked for
              </h3>
              <div className='flex flex-col gap-2'>
                <div className='flex flex-row gap-4'>
                  <span className='text-slate-400'>
                    Date:
                  </span>
                  {" "}
                  {appointmentDate}
                </div>
                <div className='flex flex-row gap-4'>
                  <span className='text-slate-400'>
                    Time:
                  </span>
                  {" "}
                  {appointmentTime}
                </div>
              </div>
            </div>
          )}
          {!isBooked && (
            <button
              className='bg-green-600 p-6 rounded-2xl text-lg'
              onClick={openModal}
            >
              Book an Appointment
            </button>
          )}
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

      {showModal && (
        <div className="fixed inset-0 overflow-y-auto z-50 flex items-center justify-center">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
          <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
            <div className="px-6 py-4">
              {/* Modal content */}
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold">Book an Appointment</h3>
                <button className="text-gray-500 hover:text-gray-700" onClick={closeModal}>
                  <span className="sr-only">Close</span>
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <input
                  type="date"
                  value={appointmentDate}
                  onChange={(e) => setAppointmentDate(e.target.value)}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">Time</label>
                <input
                  type="time"
                  value={appointmentTime}
                  onChange={(e) => setAppointmentTime(e.target.value)}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-500"
                  onClick={bookAppointment}
                >
                  Book
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default TeacherProfileForStudent;
