import React from 'react';
//import  ToastProvider  from 'react-toast-notification';
//import ToastProvider 
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
//import  toast  from 'react-toast-notification';
import App from './components/App'
import { AuthProvider } from './providers/AuthProvider';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
/*


  });
}*/