import Image from "next/image"
import logo from '../assets/lightworkflow.png'
import Link from 'next/link';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <>
      <footer className="bg-black text-center text-white px-6 py-12 md:px-12 lg:text-left">
        <div className="mx-6 py-5 text-center md:text-left">
          <div className="grid-1 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div>
              <div className="flex items-center text-center justify-center md:justify-start">
                <a href="/">
                  <Image src={logo} alt="Afterwork Workflow Logo" width={75} height={30} loading="lazy" />
                </a>
                <h4 className="mx-5 font-bold font-eb text-xl">Afterwork Workflow</h4>
              </div>
              <p className="py-5 md:pr-20 font-alt text-center md:text-left">
                Plateforme éducative pour professionnels axée sur la conception paramétrique et computationnelle.<br/>
                <span className="text-neutral-400 text-sm mt-2 block">Cellule de formation de WWWORKFLOWS</span>
              </p>
            </div>

            <div className="mx-0 md:mx-14">
              <h5 className="mb-4 flex justify-center font-bold font-eb text-xl uppercase md:justify-start">
                Liens
              </h5>
              <p className="mb-4 font-alt">
                <Link href="/shop" className="text-white">Shop</Link>
              </p>
              <p className="mb-4 font-alt">
                <Link href="/courses" className="text-white">Formations</Link>
              </p>
              <p className="mb-4 font-alt">
                <Link href="/blog" className="text-white">Blog</Link>
              </p>
              <p className="mb-4 font-alt">
                <Link href="/entreprise" className="text-white">Entreprise</Link>
              </p>
              <p className="mb-4 font-alt">
                <Link href="/contact" className="text-white">Contact</Link>
              </p>
            </div>

            <div>
              <h5 className="mb-4 flex justify-center font-bold font-eb text-xl uppercase md:justify-start">
                Contact
              </h5>
              <p className="mb-4 flex items-center justify-center md:justify-start">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="mr-3 h-5 w-5">
                  <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                  <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                </svg>
                <a href="mailto:mahmoud@wwworkflows.com" className="text-white hover:underline">mahmoud@wwworkflows.com</a>
              </p>
              <p className="mb-4 flex items-center justify-center md:justify-start">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="mr-3 h-5 w-5">
                  <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd" />
                </svg>
                <a href="tel:+212623633222" className="text-white hover:underline">+212 6 23 63 32 22</a>
              </p>
              <p className="mb-4 flex items-center justify-center md:justify-start">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="mr-3 h-5 w-5">
                  <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                  <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
                </svg>
                3543 bis 23, Hay Coworking, Rabat.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-neutral-900 p-6 text-center">
          <div className="flex flex-wrap justify-center border-b border-neutral-700 mb-5 gap-4">
            <a className="font-alt text-white" href="https://www.linkedin.com/company/afterworkworkflow" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
              <svg className="w-5 h-5 mb-5" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" aria-hidden="true">
                <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"></path>
              </svg>
            </a>
            <a className="font-alt text-white" href="https://twitter.com/rmdnmd" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
              <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5 mb-5" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
              </svg>
            </a>
            <a className="font-alt text-white" href="https://www.instagram.com/afterwork.workflow/" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
              <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5 mb-5" viewBox="0 0 24 24" aria-hidden="true">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
              </svg>
            </a>
            <a className="font-alt text-white" href="https://www.youtube.com/@afterworkworkflow" aria-label="YouTube" target="_blank" rel="noopener noreferrer">
              <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5 mb-5" viewBox="0 0 24 24">
                <path d="M21.582 7.232a2.75 2.75 0 00-1.936-1.936C18.15 5 12 5 12 5s-6.15 0-7.646.296A2.75 2.75 0 002.418 7.232C2.122 8.728 2.122 12 2.122 12s0 3.272.296 4.768a2.75 2.75 0 001.936 1.936C5.85 19 12 19 12 19s6.15 0 7.646-.296a2.75 2.75 0 001.936-1.936C21.878 15.272 21.878 12 21.878 12s0-3.272-.296-4.768zM9.955 15.5V8.5l5.09 3.5-5.09 3.5z"></path>
              </svg>
            </a>
          </div>

          <span className="text-neutral-400 text-sm">
            © {year} Afterwork Workflow — Cellule de formation de <a href="https://www.wwworkflows.com" className="text-neutral-300 hover:text-white underline" target="_blank" rel="noopener noreferrer">WWWORKFLOWS</a>
          </span>
        </div>
      </footer>
    </>
  )
}
