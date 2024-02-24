import Slider from "react-slick";
import  { Component } from "react";
import { Link } from "react-router-dom";
import { StarIcon } from '@heroicons/react/24/solid'

// CAROUSEL DATA

interface DataType {
    heading: string;
    heading2: string;
    imgSrc: string;
    name: string;
    students: number;
    classes: number;
    price: number;
    rating: number;
}

const postData: DataType[] = [
    {
        heading: 'Full stack modern',
        heading2: 'javascript',
        name: "Colt stelle",
        imgSrc: '/src/assets/images/courses/courseone.png',
        students: 150,
        classes: 12,
        price: 20,
        rating: 4.7,
    },
    {
        heading: 'Design system',
        heading2: 'with React programme',
        name: "Colt stelle",
        imgSrc: '/src/assets/images/courses/coursetwo.png',
        students: 130,
        classes: 12,
        price: 20,
        rating: 4.7,
    },
    {
        heading: 'Design banner',
        heading2: 'with Figma',
        name: "Colt stelle",
        imgSrc: '/src/assets/images/courses/coursethree.png',
        students: 120,
        classes: 12,
        price: 20,
        rating: 4.7,
    },
    {
        heading: 'We Launch Delia',
        heading2: 'Webflow this Week!',
        name: "Colt stelle",
        imgSrc: '/src/assets/images/courses/courseone.png',
        students: 150,
        classes: 12,
        price: 20,
        rating: 4.7,
    },
    {
        heading: 'We Launch Delia',
        heading2: 'Webflow this Week!',
        name: "Colt stelle",
        imgSrc: '/src/assets/images/courses/coursetwo.png',
        students: 150,
        classes: 12,
        price: 20,
        rating: 4.7,
    },
    {
        heading: 'We Launch Delia',
        heading2: 'Webflow this Week!',
        name: "Colt stelle",
        imgSrc: '/src/assets/images/courses/coursethree.png',
        students: 150,
        classes: 12,
        price: 20,
        rating: 4.7,
    },
]

// CAROUSEL SETTINGS


export default class MultipleItems extends Component {

    render() {
        const settings = {
            dots: false,
            infinite: true,
            slidesToShow: 3,
            // centerMode: true,
            slidesToScroll: 2,
            arrows: false,
            autoplay: false,
            speed: 500,
            cssEase: "linear",
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: false
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: false
                    }
                }
            ]
        };

        return (
            <div id="courses">
                <div className='px-4 mx-auto max-w-7xl sm:py-8 lg:px-8 '>

                    <div className="items-center justify-between sm:flex">
                        <h3 className="mb-5 text-4xl font-semibold text-midnightblue lg:text-55xl sm:mb-0">Popular courses.</h3>
                        <Link to={'/'} className="text-lg font-medium text-Blueviolet space-links">Explore courses&nbsp;&gt;&nbsp;</Link>
                    </div>


                    <Slider {...settings}>
                        {postData.map((items, i) => (
                            <div key={i}>

                                <div className='px-3 pt-3 pb-12 m-3 my-20 bg-white shadow-courses rounded-2xl'>
                                    <div className="relative rounded-3xl">
                                        <img src={items.imgSrc} alt="gaby" width={389} height={262} className="m-auto clipPath" />
                                        <div className="absolute p-6 rounded-full right-5 -bottom-2 bg-ultramarine">
                                            <h3 className="text-sm font-medium text-center text-white uppercase">best <br /> seller</h3>
                                        </div>
                                    </div>

                                    <div className="px-3">
                                        <h4 className='pt-6 text-2xl font-bold text-black'>{items.heading}</h4>
                                        <h4 className='pt-1 text-2xl font-bold text-black'>{items.heading2}</h4>

                                        <div>
                                            <h3 className='pt-6 text-base font-normal opacity-75'>{items.name}</h3>
                                        </div>

                                        <div className="flex items-center justify-between py-6">
                                            <div className="flex gap-4">
                                                <h3 className="font-medium text-red text-22xl">{items.rating}</h3>
                                                <div className="flex">
                                                    <StarIcon className="w-5 h-5 text-gold" />
                                                    <StarIcon className="w-5 h-5 text-gold" />
                                                    <StarIcon className="w-5 h-5 text-gold" />
                                                    <StarIcon className="w-5 h-5 text-gold" />
                                                    <StarIcon className="w-5 h-5 text-gold" />
                                                </div>
                                            </div>
                                            <div>
                                                <h3 className="text-3xl font-medium">${items.price}</h3>
                                            </div>
                                        </div>

                                        <hr style={{ color: "#C4C4C4" }} />

                                        <div className="flex justify-between pt-6">
                                            <div className="flex gap-4">
                                                <img src={'/src/assets/images/courses/book-open.svg'} alt="users" width={24} height={24} className="inline-block m-auto" />
                                                <h3 className="text-base font-medium text-black opacity-75">{items.classes} classes</h3>
                                            </div>
                                            <div className="flex gap-4">
                                                <img src={'/src/assets/images/courses/users.svg'} alt="users" width={24} height={24} className="inline-block m-auto" />
                                                <h3 className="text-base font-medium text-black opacity-75">{items.students} students</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>

        );
    }
}
