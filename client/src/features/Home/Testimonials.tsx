import Slider from "react-slick";
import { Component } from "react";
import { StarIcon } from '@heroicons/react/24/solid';


// CAROUSEL DATA

interface DataType {
    profession: string;
    comment: string;
    imgSrc: string;
    name: string;
}

const postData: DataType[] = [
    {
        name: "Muhammad Waleed Atif",
        profession: 'A-Level Mathematics Student',
        comment: 'I have been studying with Mr. Fraz for the past 6 months and I have seen a significant improvement in my grades. He is a great teacher and I would recommend him to anyone who is struggling with Mathematics.',
        imgSrc: '/src/assets/images/mentor/user1.png',
    },
    {
        name: "Hassan Ali",
        profession: 'O-Level Physics Student',
        comment: 'I have been studying with Mr. Abdullah for the past 6 months and I have seen a significant improvement in my grades. He is a great teacher and I would recommend him to anyone who is struggling with Physics.',
        imgSrc: '/src/assets/images/mentor/user3.png',
    },
    {
        name: "Rafay Khan",
        profession: 'Arabic Language Student',
        comment: 'I have been studying with Mr. Usmani for the past 6 months and I have seen a significant improvement in my grades. He is a great teacher and I would recommend him to anyone who is struggling with Arabic.',
        imgSrc: '/src/assets/images/mentor/user1.png',
    },
    {
        name: "Waleed Abdullah",
        profession: 'A-Level Mathematics Student',
        comment: 'I have been studying with Mr. Fraz for the past 6 months and I have seen a significant improvement in my grades. He is a great teacher and I would recommend him to anyone who is struggling with Mathematics.',
        imgSrc: '/src/assets/images/mentor/user3.png',
    },
    {
        name: "Cody Fisher",
        profession: 'Matric Physics Student',
        comment: 'I have been studying with Mr. Abdullah for the past 6 months and I have seen a significant improvement in my grades. He is a great teacher and I would recommend him to anyone who is struggling with Physics.',
        imgSrc: '/src/assets/images/mentor/user1.png',
    },
    {
        name: "Umut Kaya",
        profession: 'Arabic Language Student',
        comment: 'I have been studying with Mr. Usmani for the past 6 months and I have seen a significant improvement in my grades. He is a great teacher and I would recommend him to anyone who is struggling with Arabic',
        imgSrc: '/src/assets/images/mentor/user3.png',
    },
]

// CAROUSEL SETTINGS


export default class MultipleItems extends Component {

    render() {
        const settings = {
            dots: true,
            dotsClass: "slick-dots",
            infinite: true,
            slidesToShow: 3,
            // centerMode: true,
            slidesToScroll: 2,
            arrows: false,
            autoplay: false,
            speed: 500,
            autoplaySpeed: 2000,
            cssEase: "linear",
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: false
                    }
                },
                {
                    breakpoint: 800,
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
            <div className="pt-40 pb-10 sm:pb-32 lg:py-32" id="testimonial">
                <div className='mx-auto max-w-7xl sm:py-4 lg:px-8'>
                    <Slider {...settings}>
                        {postData.map((items, i) => (
                            <div key={i}>
                                <div className={`bg-white m-4 p-5 my-20 relative ${i % 2 ? 'middleDiv' : 'testimonial-shadow'}`}>
                                    <div className="absolute top-[-45px]">
                                        <img src={items.imgSrc} alt={items.imgSrc} width={100} height={100} className="inline-block" />
                                    </div>
                                    <h4 className='my-4 text-base font-normal text-darkgray'>{items.comment}</h4>
                                    <hr style={{ color: "#D7D5D5" }} />
                                    <div className="flex justify-between">
                                        <div>
                                            <h3 className='pt-4 pb-2 text-lg font-medium text-darkbrown'>{items.name}</h3>
                                            <h3 className='pb-2 text-sm font-normal text-lightgray'>{items.profession}</h3>
                                        </div>
                                        <div className="flex">
                                            <StarIcon width={20} className="text-gold" />
                                            <StarIcon width={20} className="text-gold" />
                                            <StarIcon width={20} className="text-gold" />
                                            <StarIcon width={20} className="text-gold" />
                                            <StarIcon width={20} className="text-lightgray" />
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
