import React, { useState } from "react";
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
// import { BookOpen, CopyCheck } from "lucide-react";
// import { Separator } from "../ui/separator";
import axios, { AxiosError } from "axios";
// import { useToast } from "../ui/use-toast";
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

interface AssessmentProps {
  topic: string;
}

type Input = z.infer<typeof teacherAssessmentCreationSchema>;

const AssessmentForm: React.FC<AssessmentProps> = ({ topic }) => {
  const navigate = useNavigate();
  const [showLoader, setShowLoader] = useState(false);
//   const { toast } = useToast();

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
    // axios
    //   .post(`${process.env.NEXT_PUBLIC_SERVER_URL}/quiz`, {
    //     numberOfMCQs: data.amount,
    //     subject: data.topic,
    //   })
    //   .then((response) => {
    //     const quizId = response.data.questions.quizId;
    //     console.log(quizId);
    //     navigate(`/teacher/assessment/quiz?quizId=${quizId}`);
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error);
    //     // toast({
    //     //   title: "Error",
    //     //   description: "Something went wrong. Please try again later.",
    //     //   variant: "destructive",
    //     // });
    //   })
    //   .finally(() => {
    //     setShowLoader(false);
    //   });
  };

  if (showLoader) {
    return <LoadingQuestions finished={false} />;
  }

  return (
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
  );
};

export default AssessmentForm;
