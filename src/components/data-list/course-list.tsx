import { FaRegTimesCircle } from "react-icons/fa";
import { CourseCard } from "./course-card";

interface CourseListProps extends React.HTMLAttributes<HTMLDivElement> {
  courses: {
    id: string;
    name: string;
    description: string;
    coverImage: string;
    taken: boolean;
  }[];
}

export const CourseList = ({ courses, ...rest }: CourseListProps) => {
  return (
    <>
      <div className="flex flex-grow flex-wrap flex-col space-y-4" {...rest}>
        {courses?.map((course) => (
          <CourseCard
            key={course.id}
            name={course.name}
            description={course.description}
            coverImage={course.coverImage}
            id={course.id}
            taken={course.taken}
          />
        ))}
      </div>
      {(!courses || courses.length === 0) && (
        <div className="flex flex-col items-center justify-center flex-grow">
          <FaRegTimesCircle />
          <span className="text-gray-400 text-sm font-semibold">
            No courses found
          </span>
        </div>
      )}
    </>
  );
}