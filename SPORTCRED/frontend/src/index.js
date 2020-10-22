import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import EntryPage from './EntryPage';

ReactDOM.render((
  <BrowserRouter>
    <EntryPage />
  </BrowserRouter>
), document.getElementById('root'));