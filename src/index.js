import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import App from './App'

ReactDOM.render(

    <BrowserRouter>

            <div>
        
                <App />

            </div>
       
    </BrowserRouter>
    
    ,

    document.getElementById('root')
);