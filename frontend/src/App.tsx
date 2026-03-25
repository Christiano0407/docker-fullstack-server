import './App.css'

function App() {

  return (
    <>
      <div className='app'>
        <header id='idHeader' className='header'>
          <nav className='header-navInner'>
            <div className='logo'>
              <span className='logo-text'>Disney<em>Fils</em></span>
            </div>
            <p className='header-sub'>1937 - 2026 · World Movies</p>
          </nav>
          <div className='header-bar'></div>
          <div className='header-heroSection'></div>
        </header>
        <main id='idMain' className='main'>
          
        </main>
        <footer id='idFooter' className='footer'>
          <p>Disney Movies API · FastAPI · Docker · Nginx</p>
        </footer>
      </div>
    </>
  )
}

export default App
