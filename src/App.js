import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';

function App({ numberOfCartItems }) {
  return (
    <>
      <Header numberOfCartItems={numberOfCartItems} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
