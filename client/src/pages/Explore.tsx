import AnimatedCard from '@/components/shared/animated-card';
import { Map,Globe } from 'lucide-react';

const Explore = () => {
  return (
    <div className='flex items-center justify-center bg-slate-200 min-h-screen flex-wrap gap-20'>
      <AnimatedCard
        link='/location'
        icon={Map}
        iconColor='bg-green-500'
        title='Find Local Teacher or Tutor near me'
        titleColor='text-gray-800'
        description='Find a teacher or tutor near you to help you learn a new skill or improve your grades'
        descriptionColor='text-gray-600'
      />
      <AnimatedCard 
      link='/lms'
      icon={Globe}
      iconColor='bg-blue-500'
      title='Explore Online Learning'
      titleColor='text-gray-800'
      description='Explore online learning platforms and courses to learn new skills'
      descriptionColor='text-gray-600'
      />

    </div>
  )
}

export default Explore
