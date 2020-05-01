# Json-Component-React
[![NPM Version](https://img.shields.io/npm/v/json-component-react.svg?branch=master)](https://www.npmjs.com/package/json-component-react)

## Installation

```
npm install json-component-react
```

or

```
yarn add json-component-react
```

## Try it out to see how easy it is

[![Sample project for using the package](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/json-component-react-j03v6?file=/src/App.js)

## Basic example
The package has default components based on `Reactstrap` so in case of using those components, you have to import `Bootstrap` css and our base css.

``` js
import "bootstrap/dist/css/bootstrap.min.css";
import "json-component-react/dist/main.css";
```

``` jsx
import JsonComponent from "json-component-react";
const config = {
  fields: {
    fullName: {
      title: 'Full Name',
      required: true,
    }
  },
  controllers: {
    submit: {
      content: 'Submit',
      props: {
        onClick: (fields) => {
          console.log(fields);
        }
      }
    }
  }
};

export default function App() {
  return (
    <div>
      <JsonComponent config={config} />
    </div>);
}
```

## Configuration interface:
Package support either an object or an array as 'fields'.

❗ if 'fields' is an array - the key of the object is props.name and if not exist it's a random index.
If 'fields' is an object, each field key copied to be props.name.

``` ts
{
    "fields": [{
        "index": number, // (optional) - in order to define the order of the components
        "tag": string, // (default: input) input/select/btn/btn-controller
        "title": string, // (optional)
        "dataTip": string // (optional) -  show tip on hover
        "validation": function (value) { }, // (optional)
        "defaultMsg": string, // (optional)
        "required": boolean, // (optional)
        "valueType": string, // (default: string) - if value need type convertion (string/boolean/number)
        "defaultValue": any, // (optional)
        "props": { // additional props will be passed down to the component
            "name": string, // Mandetory and have to be unique or else set to an index!
            "type": string, // (optional - if tag is input, default is "text")
            "onChange": function (e, fields, updateField) { }, // (optional)
            "onClick": function (fields, updateField) { }, // (optional for buttons)
        },
        "options": [ // (for "select" tag)
            {
                "value": any, // if it's not string, fill valueType
                "text": string,
                "disabled": boolean
            }
        ]
    }],
    "controller": [{
        "index": number, // (optional) - in order to define the order of the components
        "tag": string, // (default: btn-controller)
        "content": string, // (text inside the button)
        "props": { // additional props will be passed down to the component
            "onClick": function (fields, updateField) { }, // (optional for buttons)
        },
    }]
}
```
## Use Your Own Components
### Implementation
In case you have your own components you want to use, you have to add the prop `components` to Json-Component.

You components will inherit 2 props: 
- config - all of the configuration you set in your json for this component, so you can make your component as dynamic as possible.
- onChange - this will enable the onChange method mentioned above, to update the Json-Component State.

``` jsx
const components = {
  [tag]: ReactComponent, // (tag is the text you will put in field's 'tag')
}
<JsonComponent config={config} components={components} />
```

### Example
``` jsx
import JsonComponent from "json-component-react";

function InputComponent({ config, onChange }) {
  const { title, props, value } = config;

  return (<div>
    <label htmlFor={props && props.name}>{title}</label>
    <input
      type="text"
      value={value || ''}
      style={{
        display: 'block',
        width: '100%',
        padding: '5px',
        borderRadius: '5px'
      }}
      {...props}
      onChange={onChange}
    />
  </div>);
}

const config = {
  fields: {
    fullName: {
      tag: 'tagName',
      title: 'Full Name'
    }
  }
};

const components = {
  tagName: InputComponent
};

export default function App() {
  return (
    <div
      style={{
        width: '200px',
        margin: 'auto',
        fontFamily: 'arial'
      }}>
      <JsonComponent config={config} components={components} />
    </div>);
}
```