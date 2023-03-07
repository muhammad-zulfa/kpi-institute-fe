import Link from "next/link";
import { useEffect, useState } from "react";

interface CourseCardProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string,
  description: string,
  coverImage: string,
  taken?: boolean
  id: string
}
export const CourseCard = ({
  name,
  description,
  coverImage,
  taken,
  id,
  ...rest
}: CourseCardProps) => {
  const [loadingImage, setLoadingImage] = useState(true);
  const [image, setImage] = useState<any>(undefined);
  useEffect(() => {
    if(coverImage) {
      fetch(
        `http://localhost:5000/files/download?filename=${coverImage}`
      )
        .then((res) => res.blob())
        .then((blob) => {
          setImage(URL.createObjectURL(blob));
          setLoadingImage(false);
        });
    }
  },[])
  return (
    <div
      className="relative flex w-full flex-col bg-white rounded-lg shadow-lg"
      {...rest}
    >
      <Link
        href={`courses/${id}`}
        className="absolute w-full h-full left-0 top-0 rounded-lg"
      ></Link>
      <div className="flex flex-col">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col w-full">
            {loadingImage && (
              <div className="rounded-t-lg w-full object-cover h-[200px] animate-pulse bg-gray-200"></div>
            )}
            {!loadingImage && (
              <img
                src={image}
                className="rounded-t-lg w-full object-cover h-[200px]"
              />
            )}
            <div className="flex flex-col p-2 ">
              <span className="text-gray-600 text-sm font-semibold">
                {name}
              </span>
              <span className="text-gray-400 text-xs font-semibold">
                {description}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};