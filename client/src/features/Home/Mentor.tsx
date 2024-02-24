import Slider from "react-slick";
import  { Component } from "react";


// CAROUSEL DATA

interface DataType {
    profession: string;
    name: string;
    imgSrc: string;
}

const postData: DataType[] = [
    {
        profession: 'Senior UX Designer',
        name: 'Shoo Thar Mien',
        imgSrc: '/src/assets/images/mentor/user3.png',
    },
    {
        profession: 'Senior UX Designer',
        name: 'Shoo Thar Mien',
        imgSrc: '/src/assets/images/mentor/user2.png',
    },
    {
        profession: 'Senior UX Designer',
        name: 'Shoo Thar Mien',
        imgSrc: '/src/assets/images/mentor/user1.png',
    },
    {
        profession: 'Senior UX Designer',
        name: 'Shoo Thar Mien',
        imgSrc: '/src/assets/images/mentor/user3.png',
    },
    {
        profession: 'Senior UX Designer',
        name: 'Shoo Thar Mien',
        imgSrc: '/src/assets/images/mentor/user2.png',
    },
    {
        profession: 'Senior UX Designer',
        name: 'Shoo Thar Mien',
        imgSrc: '/src/assets/images/mentor/user1.png',
    },
]

// CAROUSEL SETTINGS

function SampleNextArrow(props: { className: any; style: any; onClick: any; }) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "flex", justifyContent: "center", position: 'absolute', alignItems: "center" , background: "#D5EFFA", padding: "28px", borderRadius: "30px", border: "1px solid #1A21BC" }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props: { className: any; style: any; onClick: any; }) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "flex", justifyContent: "center", alignItems: "center" , background: "#D5EFFA", padding: "28px", borderRadius: "30px", border: "1px solid #1A21BC" }}
            onClick={onClick}
        />
    );
}

export default class MultipleItems extends Component {

    render() {
        const settings = {
            dots: false,
            infinite: true,
            slidesToShow: 3,
            // centerMode: true,
            slidesToScroll: 1,
            arrows: false,
            autoplay: false,
            speed: 4000,
            nextArrow: <SampleNextArrow className={undefined} style={undefined} onClick={undefined} />,
            prevArrow: <SamplePrevArrow className={undefined} style={undefined} onClick={undefined} />,
            autoplaySpeed: 4500,
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
                    breakpoint: 1000,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: false
                    }
                },
                {
                    breakpoint: 530,
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
            <div className="py-10 sm:py-24 bg-paleblue" id="mentor">

                <div className='relative max-w-2xl px-4 mx-auto lg:max-w-7xl sm:py-4 lg:px-8'>
                    <h2 className="text-4xl font-semibold text-center lh-82 text-midnightblue md:text-55xl md:text-start">Meet with our <br /> mentor.</h2>

                    <Slider {...settings}>
                        {postData.map((items, i) => (
                            <div key={i}>
                                <div className='m-3 text-center py-14 md:my-10'>
                                    <div className="relative">
                                        <img src={items.imgSrc} alt="user-image" width={306} height={0} className="inline-block m-auto" />
                                        <div className="absolute right-[84px] bottom-[102px] bg-white rounded-full p-4">
                                            <img src={'/src/assets/images/mentor/linkedin.svg'} alt="linkedin-image" width={25} height={24} />
                                        </div>
                                    </div>
                                    <div className="-mt-10">
                                        <h3 className='text-2xl font-semibold text-lightblack'>{items.name}</h3>
                                        <h4 className='pt-2 text-lg font-normal opacity-50 text-lightblack'>{items.profession}</h4>
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