"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import {
    getTeacherProfile,
    postTeacherProfile,
    updateTeacherProfile,
} from "@/services/teacher/profile.service";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { changeStatus } from "@/services/auth.service";
import { Link, useNavigate } from "react-router-dom";


const formSchema = z.object({
    fullName: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    aboutMe: z.string().min(2, {
        message: "About me must be at least 2 characters.",
    }),
    education: z.string().min(2, {
        message: "Education must be at least 2 characters.",
    }),
    experience: z.string().min(2, {
        message: "Experience must be at least 2 characters.",
    }),
    language: z.string().min(2, {
        message: "Please Select Language",
    }),
    gender: z.string().min(2, {
        message: "Please Select Gender",
    }),
    subject: z.string().min(2, {
        message: "Subject must be at least 2 characters.",
    }),
    availability: z.string().min(2, {
        message: "Please Select Availability",
    }),
    availabilityHours: z.string().transform((v) => Number(v) || 0),
    hourlyRate: z.string().transform((v) => Number(v) || 0),
    cv: z.string(),
    longitude: z.number().transform((v) => Number(v) || 0),
    latitude: z.number().transform((v) => Number(v) || 0),
});

type UserData = {
    data: {
        fullName: string;
    };
};

const TeacherProfile = () => {

    const [userData, setUserData] = useState<UserData | null>(null);
    // const [location, setLocation] = useState<{
    //     latitude: number;
    //     longitude: number;
    // } | null>(null);
    const [isClient, setIsClient] = useState(false);

    const navigate = useNavigate();
    const pathname = window.location.pathname;

    useEffect(() => {
        setIsClient(true);
    }, []);
    const id = pathname.split("/")[2];

    useEffect(() => {
        // getFullName();
        gettingTeacherProfile();
    }, [id]);

    const [image, setImage] = useState<string | null>(null);
    const [cv, setCV] = useState<string | null>(null);
    const [uploadedCVName, setUploadedCVName] = useState<string | null>(null);

    // const getFullName = async () => {
    //     const { data: userData, error: userError } = await supabase
    //         .from("User") // Replace with your table name
    //         .select("fullName")
    //         .eq("userId", id)
    //         .single();

    //     if (userError) {
    //         // Handle the error
    //         console.error("Error fetching user data:", userError.message);
    //     } else if (userData) {
    //         const fullName = userData.fullName;
    //         // Now you can use the fullName value as needed
    //         form.setValue("fullName", fullName || "");
    //     } else {
    //         // User not found or no data returned
    //         console.log("User not found or no data returned");
    //     }
    // };

    const gettingTeacherProfile = () => {
        getTeacherProfile(id)
            .then((userData: any) => {
                setUserData(userData);
                const { data } = userData;
                if (data) {
                    form.setValue("aboutMe", data.aboutMe || "");
                    form.setValue("education", data.education || "");
                    form.setValue("experience", data.experience || "");
                    form.setValue("language", data.language || "");
                    form.setValue("gender", data.gender || "");
                    form.setValue("longitude", data.longitude || 0);
                    form.setValue("latitude", data.latitude || 0);
                    form.setValue("subject", data.subject || 0);
                    form.setValue("availability", data.availability || 0);
                    form.setValue("availabilityHours", data.availabilityHours.toString() || 0);
                    form.setValue("hourlyRate", data.hourlyRate.toString() || 0);
                    setImage(data.profileImage || null);
                    setCV(data.cv || null);
                }
            })
            .catch((error) => {
                console.error("Error fetching user data:", error);
            });
    };

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const uploadedImage = event.target.files?.[0];
        if (uploadedImage) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target?.result) {
                    setImage(e.target.result as string);
                }
            };
            reader.readAsDataURL(uploadedImage);
        }
    };

    const handleCVUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const uploadedCV = event.target.files?.[0];
        if (uploadedCV) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target?.result) {
                    setCV(e.target.result as string);
                    form.setValue("cv", e.target.result as string);
                    setUploadedCVName(uploadedCV.name); // Set the uploaded file name
                }
            };
            reader.readAsDataURL(uploadedCV);
        }
    };

    const handleClick = () => {
        document.getElementById("uploadInput")?.click();
    };

    const getLocation = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude;
                    const long = position.coords.longitude;
                    form.setValue("latitude", lat);
                    form.setValue("longitude", long);
                },
                (error) => {
                    console.log(error);
                }
            );
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    };

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName: "",
            aboutMe: "",
            education: "",
            experience: "",
            language: "",
            longitude: 0,
            latitude: 0,
            subject: "",
            availability: "",
            availabilityHours: 0,
            hourlyRate: 0,
            gender: "",
        },
    });

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        if (!image) {
            toast.error("Kindly Upload Image");
        } else if (!data.cv) {
            toast.error("Kindly Upload CV");
        } else {
            const newData = {
                ...data,
                profileImage: image,
                teacherId: id
            };

            if (userData?.data) {
                updateTeacherProfile(id, newData)
                    .then(() => {
                        toast.success("Profile Updated");
                    })
                    .catch((error: any) => {
                        console.error("Error updating user data:", error);
                        toast.error("Failed to update profile");
                    });
            } else {
                postTeacherProfile(newData)
                    .then(() => {
                        toast.success("Profile Created");
                        // changeStatus(id, "assessment");
                        navigate(`/teacher/assessment`);
                    })
                    .catch((error) => {
                        console.error("Error creating user data:", error);
                        toast.error("Failed to create profile");
                    });
            }
        }
    };

    return (
        <>
            {isClient && (
                <div className="flex flex-col items-center justify-center">
                    <Toaster />
                    <div className="flex flex-col items-center justify-center mt-16">
                        <Link to="/">
                            <img
                                src="/src/assets/images/flexiLearn.png"
                                width={200}
                                height={200}
                                alt="FlexiLearn Logo"
                            />
                        </Link>
                        <p className="py-6 mx-2 text-xl font-semibold text-gray-700">
                            Teacher Profile Details
                        </p>
                    </div>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="my-4 w-[20rem] space-y-6 pb-20 sm:w-[30rem] md:w-[50rem]"
                        >
                            <div className="flex flex-col items-center justify-center gap-4 p-4 border border-gray-300 rounded-md shadow-md">
                                <label
                                    htmlFor="uploadInput"
                                    className="text-lg font-semibold text-gray-700"
                                >
                                    Upload Profile Image
                                </label>
                                <Input
                                    type="file"
                                    id="uploadInput"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                />
                                <div
                                    className={`flex h-48 w-48 cursor-pointer items-center justify-center rounded-full border-2 border-dashed border-gray-300 ${image ? "border-transparent" : "hover:border-red-500"
                                        }`}
                                    onClick={handleClick}
                                >
                                    {image ? (
                                        <img
                                            src={image}
                                            alt="Uploaded"
                                            className="object-cover w-48 h-48 rounded-full"
                                        />
                                    ) : (
                                        <div className="text-center">
                                            <Avatar className="h-44 w-44">
                                                <AvatarImage src="/src/assets/images/teacher.jpg" />
                                                <AvatarFallback>PF</AvatarFallback>
                                            </Avatar>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <FormField
                                name="fullName"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-lg font-semibold text-gray-700">
                                            Full Name
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder={`Enter your full name`}
                                                {...field}
                                                className="w-full py-6 my-2 border border-gray-300 rounded-md focus:border-gray-500 focus:outline-none"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="aboutMe"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-lg font-semibold text-gray-700">
                                            About You
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder={`Enter your details`}
                                                {...field}
                                                className="w-full py-6 my-2 border border-gray-300 rounded-md focus:border-gray-500 focus:outline-none"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="education"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-lg font-semibold text-gray-700">
                                            Education
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder={`Enter your Educational Details`}
                                                {...field}
                                                className="w-full py-6 my-2 border border-gray-300 rounded-md focus:border-gray-500 focus:outline-none"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="experience"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-lg font-semibold text-gray-700">
                                            Experience
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder={`Enter your Experience`}
                                                {...field}
                                                className="w-full py-6 my-2 border border-gray-300 rounded-md focus:border-gray-500 focus:outline-none"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="language"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-lg font-semibold text-gray-700">
                                            Language
                                        </FormLabel>
                                        <FormControl>
                                            <Select
                                                onValueChange={field.onChange}
                                                value={field.value}
                                            >
                                                <SelectTrigger className="w-[16rem]">
                                                    <SelectValue placeholder="Select language" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectLabel>Language</SelectLabel>
                                                        <SelectItem value="English">English</SelectItem>
                                                        <SelectItem value="Urdu">Urdu</SelectItem>
                                                        <SelectItem value="Arabic">Arabic</SelectItem>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="gender"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-lg font-semibold text-gray-700">
                                            Gender
                                        </FormLabel>
                                        <FormControl>
                                            <Select
                                                onValueChange={field.onChange}
                                                value={field.value}
                                            >
                                                <SelectTrigger className="w-[16rem]">
                                                    <SelectValue placeholder="Select language" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectLabel>Gender</SelectLabel>
                                                        <SelectItem value="Male">Male</SelectItem>
                                                        <SelectItem value="Female">Female</SelectItem>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex items-center justify-start gap-3">
                                <FormField
                                    name="latitude"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-lg font-semibold text-gray-700">
                                                Latitude
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    readOnly
                                                    {...field}
                                                    className="w-full py-6 my-2 border border-gray-300 rounded-md focus:border-gray-500 focus:outline-none"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    name="longitude"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-lg font-semibold text-gray-700">
                                                Longitude
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    readOnly
                                                    {...field}
                                                    className="w-full py-6 my-2 border border-gray-300 rounded-md focus:border-gray-500 focus:outline-none"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="flex items-center justify-center">
                                    <Button
                                        onClick={getLocation}
                                        className="px-10 py-4 mt-8 text-white rounded-md text-md "
                                    >
                                        Get Location
                                    </Button>
                                </div>
                            </div>

                            <FormField
                                name="subject"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-lg font-semibold text-gray-700">
                                            Subject
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder={`Enter your subject`}
                                                {...field}
                                                className="w-full py-6 my-2 border border-gray-300 rounded-md focus:border-gray-500 focus:outline-none"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                name="availability"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-lg font-semibold text-gray-700">
                                            Availability
                                        </FormLabel>
                                        <FormControl>
                                            <Select
                                                onValueChange={field.onChange}
                                                value={field.value}
                                            >
                                                <SelectTrigger className="w-[16rem]">
                                                    <SelectValue placeholder="Select availability" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectLabel>Availability</SelectLabel>
                                                        <SelectItem value="Remote">Remote</SelectItem>
                                                        <SelectItem value="In-person">In-person</SelectItem>
                                                        <SelectItem value="Both">Both</SelectItem>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                name="availabilityHours"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-lg font-semibold text-gray-700">
                                            Availability (Hrs)
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder={`Enter your Availability Hours`}
                                                type="number"
                                                min={1}
                                                {...field}
                                                className="w-full py-6 my-2 border border-gray-300 rounded-md focus:border-gray-500 focus:outline-none"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="hourlyRate"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-lg font-semibold text-gray-700">
                                            Hourly hourlyRate ($)
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder={`Enter your Hourly hourlyRate`}
                                                type="number"
                                                min={1}
                                                {...field}
                                                className="w-full py-6 my-2 border border-gray-300 rounded-md focus:border-gray-500 focus:outline-none"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="flex flex-col items-center justify-center h-64 gap-4 p-4 border border-gray-300 rounded-md shadow-md cursor-pointer">
                                <label
                                    htmlFor="cvInput"
                                    className="text-lg font-semibold text-gray-700"
                                >
                                    Upload or Edit CV (PDF)
                                </label>
                                <div className="flex items-center gap-2 mt-2">
                                    {cv ? (
                                        <div className="flex items-center">
                                            <a
                                                href={cv}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-500 hover:underline"
                                            >
                                                View CV
                                            </a>
                                            <span className="mx-2">or</span>
                                            <label
                                                htmlFor="cvInput"
                                                className="text-blue-500 cursor-pointer hover:underline"
                                            >
                                                Edit CV
                                            </label>
                                            <input
                                                type="file"
                                                accept=".pdf"
                                                onChange={handleCVUpload}
                                                className="hidden"
                                                id="cvInput"
                                            />
                                        </div>
                                    ) : (
                                        <>
                                            <input
                                                type="file"
                                                accept=".pdf"
                                                onChange={handleCVUpload}
                                                className="hidden"
                                                id="cvInput"
                                            />
                                            <label
                                                htmlFor="cvInput"
                                                className="text-blue-500 cursor-pointer hover:underline"
                                            >
                                                Upload CV
                                            </label>
                                        </>
                                    )}
                                </div>
                                {uploadedCVName && (
                                    <p className="mt-2 text-sm text-gray-500">
                                        Uploaded File: {uploadedCVName}
                                    </p>
                                )}
                            </div>

                            <div className="flex items-center justify-center mt-10">
                                <Button
                                    type="submit"
                                    className="px-16 py-6 text-white rounded-md text-md"
                                >
                                    Submit
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            )}
        </>
    );
};

export default TeacherProfile;
