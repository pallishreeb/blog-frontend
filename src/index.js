import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
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
