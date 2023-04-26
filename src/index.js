import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import 'leaflet/dist/leaflet.css'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'



const myNewTheme=extendTheme({
    colors:{
        'faded-blue': '#222831',
    }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ChakraProvider theme={myNewTheme}>
        <App />
    </ChakraProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
