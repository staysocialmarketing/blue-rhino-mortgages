import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Lenis from '@studio-freight/lenis'
import { SiteNav } from '@/components/site/SiteNav'
import { SiteFooter } from '@/components/site/SiteFooter'
import { HomePage } from '@/pages/HomePage'
import { AboutPage } from '@/pages/AboutPage'
import { ServicesPage } from '@/pages/ServicesPage'
import { ContactPage } from '@/pages/ContactPage'
import { ResourcesPage } from '@/pages/ResourcesPage'
import { CalculatorsPage } from '@/pages/CalculatorsPage'
import { RefiFlowPage } from '@/pages/RefiFlowPage'
import { FAQPage } from '@/pages/FAQPage'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1 })
    const raf = (time: number) => { lenis.raf(time); requestAnimationFrame(raf) }
    const rafId = requestAnimationFrame(raf)
    return () => { cancelAnimationFrame(rafId); lenis.destroy() }
  }, [])

  return (
    <>
      <ScrollToTop />
      <SiteNav />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/calculators" element={<CalculatorsPage />} />
          <Route path="/should-i-refinance" element={<RefiFlowPage />} />
          <Route path="/faq" element={<FAQPage />} />
        </Routes>
      </main>
      <SiteFooter />
    </>
  )
}
