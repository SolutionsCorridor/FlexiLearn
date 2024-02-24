import { Link } from "react-router-dom";

interface ProductType {
    id: number;
    section: string;
    link: string[];
}

interface socialLinks {
    imgSrc: string;
    link: string;
    width: number;
}

const socialLinks: socialLinks[] = [
    {
        imgSrc: '/src/assets/images/footer/facebook.svg',
        link: 'www.facebook.com',
        width: 10
    },
    {
        imgSrc: '/src/assets/images/footer/insta.svg',
        link: 'www.instagram.com',
        width: 14
    },
    {
        imgSrc: '/src/assets/images/footer/twitter.svg',
        link: 'www.twitter.com',
        width: 14
    },

]

const products: ProductType[] = [
    {
        id: 1,
        section: "Company",
        link: ['About', 'Careers', 'Mobile', 'Blog', 'How we work?'],
    },
    {
        id: 2,
        section: "Contact",
        link: ['Help/FAQ', 'Press', 'Affiliates', 'Hotel owners', 'Partners']
    }
    ,
    {
        id: 3,
        section: "More",
        link: ['Airline fees', 'Airlines', 'Low fare tips', 'Badges &', 'Certificates']
    }
]

const footer = () => {
    return (

        <div className="max-w-2xl px-4 mx-auto sm:pt-24 sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="grid grid-cols-1 my-12 gap-y-10 sm:grid-cols-6 lg:grid-cols-12">

                {/* COLUMN-1 */}

                <div className='sm:col-span-6 lg:col-span-5'>
                    <div className="flex items-center flex-shrink-0 border-right">
                        <img src="/src/assets/images/logo/logo.svg" alt="logo" width={214} height={66} />
                    </div>
                    <h3 className='mt-5 mb-4 text-xs font-medium text-gunmetalgray lh-160 lg:mb-16'> Open an account in minutes, get full financial <br /> control for much longer.</h3>
                    <div className='flex gap-4'>

                        {socialLinks.map((items, i) => (
                        <Link to={items.link} key={i}>
                            <div className="flex items-center justify-center w-12 h-12 text-base bg-white rounded-full shadow-xl footer-icons hover:bg-ultramarine">
                                <img src={items.imgSrc} alt={items.imgSrc} width={items.width} height={2} className="sepiaa" />
                            </div>
                        </Link>
                        ))}

                    </div>
                </div>

                {/* CLOUMN-2/3/4 */}


                {products.map((product) => (
                    <div key={product.id} className="sm:col-span-2">
                        <p className="text-lg font-medium text-black mb-9">{product.section}</p>
                        <ul>
                            {product.link.map((link: string, index: number) => (
                                <li key={index} className='mb-5'>
                                    <Link to="/" className="mb-6 text-base font-normal text-darkgray space-links">{link}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}

            </div>

            {/* All Rights Reserved */}

            <div className='items-center justify-between py-10 border-t md:flex border-t-gray-blue'>
                <h4 className='text-sm font-normal text-center opacity-75 text-dark-red md:text-start'>@2023.E-learnings.All rights reserved</h4>
                <div className="flex justify-center gap-5 mt-5 md:mt-0 md:justify-start">
                    <h4 className='text-sm font-normal opacity-75 text-dark-red'><Link to="/" target="_blank">Privacy policy</Link></h4>
                    <div className="h-5 bg-dark-red opacity-25 w-0.5"></div>
                    <h4 className='text-sm font-normal opacity-75 text-dark-red'><Link to="/" target="_blank">Terms & conditions</Link></h4>
                </div>
            </div>
        </div>
    )
}

export default footer;