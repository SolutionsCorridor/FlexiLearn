import { Link } from 'react-router-dom';
import React, {
  ForwardRefExoticComponent,
  RefAttributes,
  SVGProps,
} from 'react';

// Use SVGProps to include standard SVG attributes
type IconComponentType = ForwardRefExoticComponent<
  RefAttributes<SVGSVGElement> & SVGProps<SVGSVGElement>
>;

// Define the shape of your props using an interface
interface AnimatedCardProps {
  link: string;
  icon: IconComponentType; // This assumes you're using SVG icons like Heroicons
  iconColor: string;
  title: string;
  titleColor: string;
  description: string;
  descriptionColor: string;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({
  link,
  icon: IconComponent,
  iconColor = 'bg-green-500',
  title = 'Title',
  titleColor = 'text-gray-800',
  description = 'Description',
  descriptionColor = 'text-gray-600',
}) => {
  return (
    <div>
      <Link to={link}>
        <div className='w-[30rem] transform transition duration-300 ease-in-out hover:scale-105'>
          <div className='flex cursor-pointer flex-col items-center overflow-hidden rounded-lg bg-white p-6 shadow-lg hover:bg-green-100'>
            {/* Dynamic Icon */}
            <div className={`rounded-full ${iconColor} p-2 text-white`}>
              <IconComponent className='h-10 w-10' />
            </div>
            {/* Dynamic Title */}
            <h2 className={`mt-4 text-xl font-bold ${titleColor}`}>{title}</h2>
            {/* Dynamic Description */}
            <p className={`mt-2 text-center ${descriptionColor}`}>
              {description}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default AnimatedCard;