import React from 'react';
import JsonComponent from '../../src';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import config from './formConfig';
import components from './formComponents';

export default function App() {
  return (
    <div>
      <div className="header">Module Test</div>
      <div id="form">
        <JsonComponent config={config} components={components} />
      </div>
    </div>
  );
}

