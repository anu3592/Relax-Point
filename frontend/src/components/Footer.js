import { FaTwitterSquare, FaGithubSquare, FaInstagramSquare, FaFacebookSquare } from 'react-icons/fa'
function Footer() {
    return (
        <div className="max-w-[1520px] m-auto px-4 py-2 " style={{ backgroundColor: 'rgb(30,30,30)' }}>
            <div className="py-16 px-4 grid lg:grid-cols-3 gap-8 text-gray-300">
                <div>
                    <h1 className="w-full text-3xl font-bold text-orange-500 cursive">Relax Point</h1>
                    <p>
                        Take a break and be Relax with Relax Point. Enjoy your day, watch your favourite movie...
                    </p>
                    <div className="flex justify-between md:w-[75%] my-6">
                        <FaFacebookSquare size={30} />
                        <FaGithubSquare size={30} />
                        <FaInstagramSquare size={30} />
                        <FaTwitterSquare size={30} />
                    </div>
                </div>

                <div className='lg:col-span-2 flex justify-between mt-6'>
                    <div>
                        <h6 className='font-medium text-[#9b9b9b]'>About Us</h6>
                        <ul>
                            <li className='py-2 text-sm'>Terms of Services</li>
                            <li className='py-2 text-sm'>Contact</li>
                            <li className='py-2 text-sm'>Sitemap</li>
                        </ul>
                    </div>
                    <div>
                        <h6 className='font-medium text-[#9b9b9b]'>RelaxPoint</h6>
                        <ul>
                            <li className='py-2 text-sm'>Movies</li>
                            <li className='py-2 text-sm'>TVChips</li>
                            <li className='py-2 text-sm'>Top IMDb</li>
                            <li className='py-2 text-sm'>Featured</li>
                        </ul>
                    </div>
                    <div>
                        <h6 className='font-medium text-[#9b9b9b]'>Genre</h6>
                        <ul>
                            <li className='py-2 text-sm'>Action</li>
                            <li className='py-2 text-sm'>Comedy</li>
                            <li className='py-2 text-sm'>Romance</li>
                            <li className='py-2 text-sm'>Adventure</li>
                        </ul>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default Footer;
