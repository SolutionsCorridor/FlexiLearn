import React, { useState,useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoadingQuestions from "./LoadingQuestions";
import {teacherAssessmentCreationSchema} from "@/constants/teacher-assessment"
import { SERVER_URL } from "@/config/config"

interface AssessmentProps {
  topic?: string;
}

type Input = z.infer<typeof teacherAssessmentCreationSchema>;

const AssessmentForm: React.FC<AssessmentProps> = () => {
  const navigate = useNavigate();
  const [showLoader, setShowLoader] = useState(false);
  const [topic,setTopic] = useState('');

  // sending call to /teacher/userId (userId from local storage) to get the subject of the teacher in the input
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      axios
        .get(`${SERVER_URL}/teacher/${userId}`)
        .then((response) => {
          console.log(response.data);
          form.setValue("topic", response.data.subject);
          setTopic(response.data.subject);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }
  ,[]);

  const form = useForm<Input>({
    resolver: zodResolver(teacherAssessmentCreationSchema),
    defaultValues: {
      topic: topic,
      type: "mcq",
      amount: "10",
    },
  });

  const onSubmit = (data: Input) => {
    setShowLoader(true);

    console.log(data)

    // Simulate an API call
    axios
      .post(`${SERVER_URL}/quiz/create`, {
        amount: data.amount,
        subject: topic,
      })
      .then((response) => {
        const quizId = response.data.quizId;
        console.log(quizId);
        navigate(`/teacher/assessment/quiz/${quizId}`);
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Something went wrong. Please try again later.");
      })
      .finally(() => {
        setShowLoader(false);
      });
  };

  if (showLoader) {
    return <LoadingQuestions finished={false} />;
  }

  return (
    <>
    <Toaster/>
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          Flexi Learn Teacher Assessment
        </CardTitle>
        <CardDescription>Choose your choice</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="topic"
              disabled
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Topic</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Maths" />
                  </FormControl>
                  <FormDescription>
                    You will have the assessment from the subject you have
                    mentioned previously in your profile.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="amount"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold text-gray-700">
                    Number of Questions
                  </FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="">
                        <SelectValue placeholder="Amount of Questions" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Number of Questions</SelectLabel>
                          <SelectItem value="10">10</SelectItem>
                          <SelectItem value="20">20</SelectItem>
                          <SelectItem value="30">30</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>
                    You can choose how many questions you would like to be
                    quizzed on here.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={false} type="submit">
              Submit
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
    </>
  );
};

export default AssessmentForm;
