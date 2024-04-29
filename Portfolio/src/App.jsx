import { BrowserRouter } from 'react-router-dom'; //  For routing 
import { About, Contact, Experience, Feedbacks, 
Hero, Navbar, Tech, Works, StarsCanvas } from './components';

const App = () => {

  return (
    <BrowserRouter>
    <div className="relative z-0 bg-primary">
      <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
        <Navbar />
        <Hero />
        <div className="h-16 bg-gradient-to-b from-transparent to-black-200"></div> {/* Adjust gradient color to match your <About /> background */}
      </div>
      <About />
      <Experience />
      <Tech />
      <Works />
      <Feedbacks />
      <div className="relative z-0">
        <Contact />
        <StarsCanvas />
      </div>
    </div>
    </BrowserRouter>
  )
}

export default App
