import Image from 'next/image'
import { useContext, useState } from 'react'
import logo from '../assets/workflowLogo.png'
import dynamic from 'next/dynamic'
import Link from 'next/link';
import { useRouter } from 'next/router'


const Nav = () => {

  const [open, setOpen] = useState(false)

  const router = useRouter();

  const handleClick = async (title) => {
    // Wait for route change before do anything
    await router.push(title);
    // Reload after routing
    router.reload();
  } 
  

  return (
    <header className="bg-cgrey px-2 sm:px-4 py-2.5 dark:bg-gray-900 sticky w-full z-20 top-0 left-0  dark:border-gray-600">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
          <a href="/" className="flex items-center">
            <Image src={logo} width={75} height={30} />
          </a>

        <div className='flex md:order-2' >

          <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden focus:outline-none  dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false" onClick={() => setOpen(!open)} >
            <span className="sr-only">Open main menu</span>
            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
          </button>
          
        </div>

        <div className={`items-center justify-between ${open ? "block" : "hidden"} w-full md:flex md:w-auto md:order-1`} id="navbar-sticky">
          <ul className="flex flex-col p-4 mt-4 border border-white rounded-lg bg-white md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-cgrey dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link href="/shop" passHref>
                <a className="block py-2 pl-3 pr-4 text-black rounded  md:text-black md:p-0">Shop</a>
              </Link>
            </li>
            <li>
              <Link href="/courses" passHref>
                <a className="block py-2 pl-3 pr-4 text-black rounded  md:text-black md:p-0">Courses</a>
              </Link>
            </li>
            <li>
              <button href="/blog" onClick={()=>handleClick("blog")} passHref>
                <a className="block py-2 pl-3 pr-4 text-black rounded  md:text-black md:p-0">Blog</a>
              </button>
            </li>
            

          </ul>
        </div>
      </div>

    </header>


  )
}

export default dynamic(() => Promise.resolve(Nav), {
  ssr: false
})