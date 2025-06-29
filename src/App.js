import logo from './logo.svg';
import './App.css';
import Products from './components/Products';
import "./myStyles/Prostyles.css"
import Header from './components/Header';
import { useState } from 'react';


function App() {
  const [addedtocartcount, setAddedtocartcount] = useState(0);
  const [Popupopen, SetPopupOpen] = useState(0);
  const[Popupclose,SetPopupclose]=useState(0);
   

  return (
    <div className="App">
      <Header addedtocartcount={addedtocartcount} Popupopen={() => { SetPopupOpen(1) }} />
      <Products
        headercount={(count) => setAddedtocartcount(count)}
        Popupopen={Popupopen}
        Popupclose={() => SetPopupOpen(0)} 
      />
    </div>
  );
}

export default App;
