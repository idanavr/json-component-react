import React from 'react';
import JsonComponent from '../../src';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import config from './formConfig';

function File({ config, onChange }) {
  const { title, props } = config;

  return (<div>
    <label htmlFor={props.name}>{title}</label>
    <input
      type="file"
      name={props.name}
      style={{ display: 'block' }}
      {...props}
      onChange={onChange}
    />
  </div>);
}

function Input({ config, onChange }) {
  const { title, props, value } = config;

  return (<div>
    <label htmlFor={props && props.name}>{title}</label>
    <input
      type="text"
      value={value || ''}
      style={{ display: 'block', width: '100%' }}
      {...props}
      onChange={onChange}
    />
  </div>);
}

const components = {
  file: File,
  input: Input,
};

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

