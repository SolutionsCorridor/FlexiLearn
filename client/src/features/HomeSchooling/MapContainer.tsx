import React, { useEffect, useState } from "react";
import haversine from 'haversine';
import { GoogleMap, Marker, Circle } from "@react-google-maps/api";
import ProfileDialog from "./ProfileDialog";
import { Teacher } from "@/constants/types";
// import { teachers as dummyTeachers } from "@/constants/data"; // Import dummy data
import TeacherFilter from "./TeacherFilter";
import { useJsApiLoader } from "@react-google-maps/api";
import Loader from "../../components/shared/Loader";
import { getTeacher } from "@/services/teacher/profile.service";

const MapContainer = () => {
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [userLocation, setUserLocation] = useState<google.maps.LatLngLiteral | null>(null);
  const [teachersWithinRange, setTeachersWithinRange] = useState<Array<Teacher>>([]);
  const [teachersOnMap, setTeachersOnMap] = useState<Array<Teacher>>([]);
  const [subject, setSubject] = useState("");
  const [gender, setGender] = useState("");
  const [rating, setRating] = useState("");
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [teachers, setTeachers] = useState<Array<Teacher>>([]); 

  useEffect(() => {
    const fetchData = async () => {
      const teachersFromApi = await getTeacher();
      setTeachers(teachersFromApi);
    };

    fetchData();
  }, []);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyAjf0LKhpoO-RtRvcaaw4UY5RimcXmWwuE", // Replace with your API key
  });

  const onLoad = React.useCallback(
    function callback(map: google.maps.Map) {
      setMap(map);
    },
    []
  );

  const onUnmount = React.useCallback(function callback() {
    setMap(null);
  }, []);

  const filterTeachers = () => {
    let filteredTeachers = teachersWithinRange;

    if (subject) {
      filteredTeachers = filteredTeachers.filter(
        (teacher) => teacher.subject === subject
      );
    }

    if (gender) {
      filteredTeachers = filteredTeachers.filter(
        (teacher) => teacher.gender === gender
      );
    }

    if (rating) {
      filteredTeachers = filteredTeachers.filter(
        (teacher) => teacher.totalReviews >= parseInt(rating)
      );
    }

    setTeachersOnMap(filteredTeachers);
  };

  useEffect(() => {
    filterTeachers();
  }, [subject, gender, rating]);

  const handleSubjectChange = (value: string) => {
    setSubject(value);
  };

  const handleGenderChange = (value: string) => {
    setGender(value);
  };

  const handleRatingChange = (value: string) => {
    setRating(value);
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLat = position.coords.latitude;
          const userLng = position.coords.longitude;
          setUserLocation({ lat: userLat, lng: userLng });
        },
        (error) => {
          console.error("Error getting user's location:", error);
        }
      );
    } else {
      console.error("Geolocation is not available in this browser.");
    }
  }, []);

  const mapStyles: React.CSSProperties = {
    height: "100vh",
    width: "100%",
  };

  const defaultCenter: google.maps.LatLngLiteral = {
    lat: 33.6844, // Islamabad coordinates
    lng: 73.0479,
  };

  const circleRadius = 20000; // 20 km

  useEffect(() => {
    const calculateDistances = () => {
      if (!userLocation) return;

      const teachersWithDistances = teachers.map((teacher) => {
        const userCoords = { latitude: userLocation.lat, longitude: userLocation.lng };
        const teacherCoords = { latitude: teacher.latitude, longitude: teacher.longitude };

        const distance = haversine(userCoords, teacherCoords, { unit: 'meter' });

        if (distance <= circleRadius) {
          return { ...teacher, distance };
        }
        return null;
      });

      setTeachersWithinRange(
        teachersWithDistances.filter((teacher) => teacher !== null) as Teacher[]
      );
      setTeachersOnMap(
        teachersWithDistances.filter((teacher) => teacher !== null) as Teacher[]
      );
    };

    if (userLocation) {
      calculateDistances();
    }
  }, [userLocation, teachers, circleRadius]);

  const handleMarkerClick = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
  };

  const handleCloseTeacherDetail = () => {
    setSelectedTeacher(null);
  };

  return isLoaded ? (
    <>
      <div className="relative h-screen">
        <div className="absolute left-0 top-2 z-10 w-full sm:top-4">
          <div className="absolute left-4 top-12 sm:left-24">
            <TeacherFilter
              onSubjectChange={handleSubjectChange}
              onGenderChange={handleGenderChange}
              onRatingChange={handleRatingChange}
            />
          </div>
        </div>
        <GoogleMap
          mapContainerStyle={mapStyles}
          center={defaultCenter}
          zoom={11}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          {userLocation && (
            <Marker position={userLocation} label="Your location" />
          )}
          {teachersOnMap.map((teacher) => (
            <Marker
              key={teacher.userId}
              position={{ lat: teacher.latitude, lng: teacher.longitude }}
              title={teacher.fullName}
              onClick={() => handleMarkerClick(teacher)}
            />
          ))}
        </GoogleMap>
        {userLocation && (
          <Circle
            center={userLocation}
            radius={circleRadius}
            options={{
              fillColor: "green",
              fillOpacity: 0.2,
              strokeColor: "green",
              strokeOpacity: 0.5,
            }}
          />
        )}
      </div>
      {selectedTeacher && (
        <ProfileDialog
          teacher={selectedTeacher}
          onClose={handleCloseTeacherDetail}
        />
      )}
    </>
  ) : (
    <div className="flex h-screen items-center justify-center">
      <Loader />
    </div>
  );
};

export default MapContainer;
