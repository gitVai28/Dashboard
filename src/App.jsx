import './App.css';
import Header from './components/Header';
import Stats from './components/Stats';
import LeftSidebar from './components/LeftSidebar';
import RightSidebar from './components/RightSidebar';
import MainContent from './components/MainContent';

function App() {
  return (
    <>
      <header>
        <Header />
      </header>
      <div className="container">
        <section className="statistics">
          <Stats />
        </section>
        <aside >
          <LeftSidebar />
        </aside>
        <main>
          <section className="content">
            <MainContent />
          </section>
        </main>
        <aside className="sidebar-right">
          <RightSidebar />
        </aside>
      </div>
    </>
  );
}

export default App;
