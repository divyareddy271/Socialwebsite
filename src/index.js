import React from 'react';
//import  ToastProvider  from 'react-toast-notification';
//import ToastProvider 
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
//import  toast  from 'react-toast-notification';
import App from './components/App'
//import { ToastContainer, toast } from 'react-toastify';
//import 'react-toastify/dist/ReactToastify.css';
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>

    <App />


    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
/*


  });
}*/