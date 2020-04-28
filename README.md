# Json-Component-React
[![NPM Version](https://img.shields.io/npm/v/json-component-react.svg?branch=master)](https://www.npmjs.com/package/json-component-react)

The package has default components based on `Reactstrap` so in case of using those components, you have to import `Bootstrap` css and our base css.

``` js
import "bootstrap/dist/css/bootstrap.min.css";
import "json-component-react/dist/main.css";
```

Package support either an object or an array as 'fields'.

Important: if 'fields' is an array - the key of the object is props.name and if not exist it's a random index.
If 'fields' is an object, each field key copied to be props.name.

``` js
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

Try out the sample to get a better understanding:

[![Sample project for using the package](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/json-component-react-j03v6?file=/src/App.js)

Configuration interface:

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
        "props": { // any react props that the tag may accept are optional
            "name": string, // Mandetory and have to be unique or else set to an index!
            "type": string, // (optional - if tag is input, default is "text")
            "onChange": function (e, fields, updateField) { }, // (optional)
            "onClick": function (fields, updateField) { }, // (optional for buttons)
        },
        "options": [ // (for "ddl" tag)
            {
                "value": any, // if it's not string, fill valueType
                "text": string,
                "disabled": boolean
            }
        ]
    }
    ],
    "controller": [{
        "index": number, // (optional) - in order to define the order of the components
	    "tag": string, // (default: btn-controller)
	    "content": string, // (text inside the button)
            "props": {
                "onClick": function (fields, updateField) { }, // (optional for buttons)
            },
    }]
}
```
