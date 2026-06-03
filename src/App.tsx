import { Routes, Route } from 'react-router-dom'
import { useSeason } from './hooks/useSeason'
import { useVisitor } from './hooks/useVisitor'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import ScrumBoard from './components/ScrumBoard'
import LifeStack from './components/LifeStack'
import Footer from './components/Footer'
import VisitorModal from './components/VisitorModal'
import AdminPanel from './pages/AdminPanel'

function Portfolio({ theme, visitorName, showModal, registerVisitor }: ReturnType<typeof useVisitor> & { theme: ReturnType<typeof useSeason> }) {
  return (
    <>
      {showModal && (
        <VisitorModal theme={theme} onSubmit={registerVisitor} />
      )}
      <Navbar theme={theme} visitorName={visitorName} />
      <main>
        <Hero theme={theme} visitorName={visitorName} />
        <About theme={theme} />
        <Skills theme={theme} />
        <Projects theme={theme} />
        <Experience theme={theme} />
        <LifeStack theme={theme} />
        <ScrumBoard theme={theme} />
      </main>
      <Footer theme={theme} />
    </>
  )
}

export default function App() {
  const theme = useSeason()
  const { showModal, visitorName, registerVisitor } = useVisitor()

  return (
    <div style={{ background: theme.bgPrimary, minHeight: '100vh' }}>
      <Routes>
        <Route
          path="/"
          element={
            <Portfolio
              theme={theme}
              visitorName={visitorName}
              showModal={showModal}
              registerVisitor={registerVisitor}
            />
          }
        />
        <Route path="/admin" element={<AdminPanel theme={theme} />} />
      </Routes>
    </div>
  )
}
