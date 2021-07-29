import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

export interface SizeOption {
  option: string;
  available: boolean;
}

export interface ClothingArticleProps {
  articleName: string;
  articlePrice: number;
  articleSizeOptions: SizeOption[];
}

const clothinArticle: ClothingArticleProps = {
  articleName: 'CLASS HOODIE BLUE',
  articlePrice: 90,
  articleSizeOptions: [
    { option: 'S', available: true },
    { option: 'M', available: true },
    { option: 'L', available: false },
    { option: 'XL', available: false },
  ],
};

ReactDOM.render(
  <React.StrictMode>
    <App {...clothinArticle} />
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
