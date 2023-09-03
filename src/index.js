import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import './css/bootstrap.min.css'
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom"
import AuthState from './context/authState';
import { CommentApiProvider } from './context/commentProvider'
import { PostApiProvider } from './context/PostProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthState>
      <PostApiProvider>
          <CommentApiProvider>
            <App />
          </CommentApiProvider>
      </PostApiProvider>
      </AuthState>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
