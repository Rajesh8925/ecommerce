import './App.css';
import './myStyles/Prostyles.css';


import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Structure only — colors overridden by your CSS

import { useState } from 'react';
import Header from './components/Header';
import Products from './components/Products';

function App() {
  const [addedtocartcount, setAddedtocartcount] = useState(0);
  const [Popupopen, SetPopupOpen] = useState(0);

  return (
    <div className="App">
      <Header
        addedtocartcount={addedtocartcount}
        Popupopen={() => SetPopupOpen(1)}it
      />
      <Products
        headercount={setAddedtocartcount}
        Popupopen={Popupopen}
        Popupclose={() => SetPopupOpen(0)}
      />
      <ToastContainer position="top-right" autoClose={1500} className="toast-container" />
    </div>
  );
}

export default App;
