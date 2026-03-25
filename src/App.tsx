import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import HeroSection from './components/sections/HeroSection'
import RosterSection from './components/sections/RosterSection'
import AboutSection from './components/sections/AboutSection'
import CTASection from './components/sections/CTASection'

function App() {
  return (
    <div className="app">
      <Header />

      <main>
        <HeroSection />
        <RosterSection />
        <AboutSection />
        <CTASection />
      </main>

      <Footer />
    </div>
  )
}

export default App