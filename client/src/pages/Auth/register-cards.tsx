import AnimatedCard from "@/features/Auth/components/animated-card";

const registerCardsData = [
  {
    title: "I am a Student",
    image: "/src/assets/images/student.jpg",
    value: "student",
  },
  {
    title: "I am a Teacher",
    image: "/src/assets/images/teacher.jpg",
    value: "teacher",
  },
  {
    title: "I am a Parent",
    image: "/src/assets/images/parent.jpg",
    value: "parent",
  },
];

const RegisterCards = () => {
  return (
    <>
      <div>
        <section className="flex flex-wrap items-center justify-center min-h-screen gap-20 py-10 pb-32 bg-red-500 sm:mb-0 sm:flex-col md:flex-row">
          {registerCardsData.map((card, index) => (
            <AnimatedCard
              key={index}
              title={card.title}
              image={card.image}
              value={card.value}
            />
          ))}
        </section>
      </div>
    </>
  );
};

export default RegisterCards;
