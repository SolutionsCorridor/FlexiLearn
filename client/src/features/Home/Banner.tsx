
const Banner = () => {

    return (
        <div id="home-section" className='pb-20 bg-lightkblue'>
            <div className="px-6 pt-20 mx-auto max-w-7xl sm:pb-24">

                <div className='grid grid-cols-1 space-x-1 lg:grid-cols-12'>
                    
                    <div className='flex flex-col col-span-6 justify-evenly'>
                        <div className='flex gap-2 mx-auto lg:mx-0'>
                            <img src="/src/assets/images/banner/check.svg" alt="check-image" width={20} height={20} />
                            <h3 className='text-sm font-semibold text-center text-kellygreen lg:text-start'>Find the best teachers near you</h3>
                        </div>
                        <h1 className='pt-5 text-4xl font-semibold text-center text-midnightblue sm:text-5xl lg:text-start lh-120 lg:pt-0'>Explore the best teachers near you</h1>
                        <h3 className='pt-5 text-lg font-normal text-center opacity-75 text-charcoal lg:text-start lg:pt-0'>There's no need of a lot of hustle for finding the best teacher now!</h3>

                        <div className="relative flex flex-row-reverse pt-5 text-white rounded-full focus-within:text-white input-shadow lg:pt-0">
                            <input type="Email address" name="q" className="w-full py-6 pl-8 text-lg text-black rounded-full opacity-75 lg:py-8 focus:outline-none focus:text-black" placeholder="search courses..." autoComplete="off" />
                            <div className="absolute inset-y-0 right-0 flex items-center pt-5 pr-2 lg:pt-0">
                                <button type="submit" className="p-3 duration-150 ease-in-out rounded-full lg:p-5 focus:outline-none focus:shadow-outline bg-ultramarine hover:bg-midnightblue">
                                    <img src={'/src/assets/images/banner/search.svg'} alt="inputicon" width={30} height={30} />
                                </button>
                            </div>
                        </div>

                        <div className='flex items-center justify-between pt-10 lg:pt-4'>
                            <div className='flex gap-2'>
                                <img src="/src/assets/images/banner/check-circle.svg" alt="check-image" width={30} height={30} className='smallImage'/>
                                <p className='text-sm font-normal text-black sm:text-lg'>Flexible</p>
                            </div>
                            <div className='flex gap-2'>
                                <img src="/src/assets/images/banner/check-circle.svg" alt="check-image" width={30} height={30} className='smallImage'/>
                                <p className='text-sm font-normal text-black sm:text-lg'>Anywhere</p>
                            </div>
                            <div className='flex gap-2'>
                                <img src="/src/assets/images/banner/check-circle.svg" alt="check-image" width={30} height={30} className='smallImage'/>
                                <p className='text-sm font-normal text-black sm:text-lg'>Quality</p>
                            </div>
                        </div>
                    </div>

                    <div className='flex justify-center col-span-6'>
                        <img src="/src/assets/images/banner/pakboy.png" alt="nothing" width={450} height={405} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Banner;
