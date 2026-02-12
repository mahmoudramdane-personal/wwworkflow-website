import Footer from "./Footer"
import Nav from "./Nav"

export default function Layout({ children }) {
  return (
    <div className="flex flex-col justify-between min-h-screen bg-cgrey ">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-black text-white px-4 py-2 z-50 rounded">
          Skip to main content
        </a>
        <Nav/>

        <main id="main-content">
            {children}
        </main>
        
        <footer>
            <Footer/>
        </footer>
    </div>
  )
}
