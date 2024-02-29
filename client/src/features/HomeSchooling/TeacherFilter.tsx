import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Subjects } from "@/constants/data";

interface FilterCardProps {
  onSubjectChange: (value: string) => void;
  onGenderChange: (value: string) => void;
  onRatingChange: (value: string) => void;
}

const TeacherFilter: React.FC<FilterCardProps> = ({
  onSubjectChange,
  onGenderChange,
  onRatingChange,
}) => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Filter Teachers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <Select onValueChange={onSubjectChange}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Subject" />
              </SelectTrigger>
              <SelectContent>
                {Subjects.map((subject) => (
                  <SelectItem key={subject.id} value={subject.name}>
                    {subject.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select onValueChange={onGenderChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
              </SelectContent>
            </Select>
            <Select onValueChange={onRatingChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Reviews" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3">3+ Star</SelectItem>
                <SelectItem value="4">4+ Star</SelectItem>
                <SelectItem value="5">5 Star</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeacherFilter;
