
import React, { useEffect, useState } from "react";
import haversine from 'haversine';
import { GoogleMap, Marker, Circle } from "@react-google-maps/api";
import ProfileDialog from "./ProfileDialog";
import { Teacher } from "@/constants/types";
import { teachers as dummyTeachers } from "@/constants/data"; // Import dummy data
import TeacherFilter from "./TeacherFilter";
import { useJsApiLoader } from "@react-google-maps/api";
import Loader from "../../components/shared/Loader";
import axios from "axios";

const MapContainer = () => {
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [userLocation, setUserLocation] = useState<google.maps.LatLngLiteral | null>(null);
  const [teachersWithinRange, setTeachersWithinRange] = useState<Array<Teacher>>([]);
  const [teachersOnMap, setTeachersOnMap] = useState<Array<Teacher>>([]);
  const [subject, setSubject] = useState("");
  const [gender, setGender] = useState("");
  const [rating, setRating] = useState("");
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [teachers, setTeachers] = useState<Array<Teacher>>(dummyTeachers); // Use dummy data

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyAjf0LKhpoO-RtRvcaaw4UY5RimcXmWwuE",
  });

  const onLoad = React.useCallback(
    function callback(map: any) {
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
        (teacher) => teacher.reviews >= parseInt(rating)
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

  async function geocodeAddress(address: string): Promise<google.maps.LatLngLiteral> {
    const apiKey = "AIzaSyAjf0LKhpoO-RtRvcaaw4UY5RimcXmWwuE";
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address
      )}&key=${apiKey}`
    );

    if (!response.ok) {
      throw new Error(`Geocoding error: ${response.statusText}`);
    }

    const data = await response.json();

    if (data.results.length === 0) {
      throw Error("No results found for the address");
    }

    const location = data.results[0].geometry.location;
    return { lat: location.lat, lng: location.lng };
  }

  useEffect(() => {
    const calculateDistances = async () => {
      const teachersWithDistances = await Promise.all(
        teachers.map(async (teacher) => {
          try {
            const teacherLocation = await geocodeAddress(teacher.address);
            const userCoords = { latitude: userLocation!.lat, longitude: userLocation!.lng };
            const teacherCoords = { latitude: teacherLocation.lat, longitude: teacherLocation.lng };
  
            const distance = haversine(userCoords, teacherCoords, { unit: 'meter' });
  
            if (distance <= circleRadius) {
              return { ...teacher, location: teacherLocation, distance };
            }
          } catch (error) {
            console.error(
              `Error geocoding teacher address: ${teacher.address}`,
              error
            );
          }
          return null;
        })
      );
  
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
  
  console.log(teachersOnMap)

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
            <>
              <Marker position={userLocation} label="Your location" />
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
            </>
          )}

          {teachersOnMap.map((teacher) => (
            <Marker
              key={teacher.id}
              position={teacher.location!}
              title={teacher.name}
            //   icon={{
            //     url:
            //       teacher.gender === "Male"
            //         ? "/img/manProfile.png"
            //         : "/img/femaleProfile.png",
            //     scaledSize:
            //       teacher.gender === "Male"
            //         ? new google.maps.Size(70, 70)
            //         : new google.maps.Size(80, 80),
            //   }}
              onClick={() => handleMarkerClick(teacher)}
            />
          ))}

          {selectedTeacher && (
            <ProfileDialog
              teacher={selectedTeacher}
              onClose={handleCloseTeacherDetail}
            />
          )}
        </GoogleMap>
      </div>
    </>
  ) : (
    <div className="flex h-screen items-center justify-center">
      <Loader />
    </div>
  );
};

export default MapContainer;
