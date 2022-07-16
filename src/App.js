import { useEffect, useState } from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import ItemList from './components/ItemList';

function App() {
  const [ itemArray, setItemArray ] = useState([]);

  useEffect(() => {
    async function fetchItems() {
      const reponse = await fetch('https://fakestoreapi.com/products');
      const json = await reponse.json();
      setItemArray(json);
    }
    fetchItems();
  });

  return (
    <>
      <Header />
      <main>
        <ItemList itemArray={itemArray} />
      </main>
      <Footer />
    </>
  );
}

export default App;
