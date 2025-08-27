import './App.css';
import './myStyles/Prostyles.css';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useState, useEffect } from 'react';
import Header from './components/Header';
import Products from './components/Products';

import { setCookie, getCookie } from './Jscookies';

function App() {
  const [addedtocartcount, setAddedtocartcount] = useState(() => {
    const savedCount = getCookie('cartCount');
    return savedCount ? parseInt(savedCount) : 0;
  });

  const [Popupopen, SetPopupOpen] = useState(0);

  // New state for search input
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setCookie('cartCount', addedtocartcount, 7);
  }, [addedtocartcount]);

  return (
    <div className="App">
      <Header
        addedtocartcount={addedtocartcount}
        Popupopen={() => SetPopupOpen(1)}
        onSearchChange={setSearchTerm}  // Pass search term handler here
      />
      <Products
        headercount={setAddedtocartcount}
        Popupopen={Popupopen}
        Popupclose={() => SetPopupOpen(0)}
        searchTerm={searchTerm}  // Pass search term to Products
      />
      <ToastContainer position="top-right" autoClose={1500} className="toast-container" />
    </div>
  );
}

export default App;
