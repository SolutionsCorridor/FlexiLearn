import { useNavigate } from "react-router-dom";

const AnimatedCard = ({
  title,
  image,
  value,
}: {
  title: string;
  image: string;
  value: string;
}) => {
  const navigate = useNavigate();
  return (
    <div
      className="cursor-pointer"
      onClick={() => navigate(`/signup?userType=${value}`)}
    >
      <div className="relative mb-5 h-64 w-64 cursor-pointer md:h-72 md:w-72">
        <div className="absolute inset-0 rounded-lg bg-white opacity-25 shadow-2xl"></div>

        <div
          className="absolute inset-0 transform transition duration-300 hover:z-10  
        hover:translate-x-4
        hover:scale-125 sm:hover:translate-x-1/2"
        >
          <div className="flex h-full w-full flex-col items-center justify-center rounded-lg bg-white shadow-2xl">
            <img
              src={image}
              alt="role_img"
              className="h-3/5 w-3/5 rounded-lg md:h-[13rem] md:w-[13rem]"
            />
            <h1 className="pt-4 font-mono text-xl font-medium text-gray-800">
              {title}{" "}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedCard;
