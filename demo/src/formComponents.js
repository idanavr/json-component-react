import React from 'react';

export function MyInput({ config, onChange }) {
    const { title, props, value } = config;

    return (<div className="my-input-container">
        <label htmlFor={props && props.name}>{title}</label>
        <input
            type="text"
            value={value || ''}
            {...props}
            onChange={onChange}
        />
    </div>);
}

export function MyButton({ config, onClick }) {
    const { content, props } = config;

    return (<div className="my-btn-container">
        <button
            {...props}
            onClick={onClick}
        >
            {content}
        </button>
    </div>);
}

const components = {
    myInput: MyInput,
    myBtn: MyButton,
};

export default components;