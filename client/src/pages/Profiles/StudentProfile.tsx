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
    getStudentProfile,
    postStudentProfile,
    updateStudentProfile,
} from "@/services/student/profile.service";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { changeStatus } from "@/services/auth.service";
import { Link, useNavigate } from "react-router-dom";

const formSchema = z.object({
    fullName: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    dob: z.string().min(2, {
        message: "Date of Birth must be at least 2 characters.",
    }),
    language: z.string().min(2, {
        message: "Please Select Language",
    }),
    gender: z.string().min(2, {
        message: "Please Select Gender",
    }),
});

type UserData = {
    data: {
        fullName: string;
    };
};

const StudentProfile = () => {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [isClient, setIsClient] = useState(false);
    const navigate = useNavigate();
    const pathname = window.location.pathname;

    useEffect(() => {
        setIsClient(true);
    }, []);

    const id = pathname.split("/")[2];

    useEffect(() => {
        // getFullName();
        gettingStudentProfile();
    }, [id]);

    const [image, setImage] = useState<string | null>(null);

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

    const gettingStudentProfile = () => {
        getStudentProfile(id)
            .then((userData: any) => {
                setUserData(userData);
                const { data } = userData;
                if (data) {
                    form.setValue("dob", data.dob || "");
                    form.setValue("language", data.language || "");
                    form.setValue("gender", data.gender || "");
                    form.setValue("language", data.language || "");
                    setImage(data.profileImage || null);
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

    const handleClick = () => {
        document.getElementById("uploadInput")?.click();
    };

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName: "",
            dob: "",
            language: "",
            gender: "",
        },
    });

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        if (!image) {
            toast.error("Kindly Upload Image");
        } else {
            const newData = {
                ...data,
                profileImage: image,
                studentId: id
            };

            console.log(newData);

            if (userData?.data) {
                updateStudentProfile(id, newData)
                    .then(() => {
                        toast.success("Profile Updated");
                    })
                    .catch((error: any) => {
                        console.error("Error updating user data:", error);
                        toast.error("Failed to update profile");
                    });
            } else {
                postStudentProfile(newData)
                    .then(() => {
                        toast.success("Profile Created");
                        // changeStatus(id, "verfied");
                        navigate(`/explore`);
                    })
                    .catch((error: any) => {
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

                    <div className="flex flex-col items-center justify-center mt-16 ">
                        <Link to="/">
                            <img
                                src="/src/assets/images/flexiLearn.png"
                                width={200}
                                height={200}
                                alt="FlexiLearn Logo"
                            />
                        </Link>
                        <p className="py-6 mx-2 text-xl font-semibold text-gray-700">
                            Student Profile Details
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
                                name="dob"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-lg font-semibold text-gray-700">
                                            Date of Birth
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="date"
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

                            <div className="flex items-center justify-center mt-10">
                                <Button
                                    type="submit"
                                    className="px-16 py-6 text-white bg-red-500 rounded-md text-md hover:bg-red-600"
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

export default StudentProfile;
