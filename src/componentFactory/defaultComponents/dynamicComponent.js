import React from 'react';
import PropTypes from 'prop-types';

const tagsWithoutContent = ['input'];

export default function DynamicComponent({ config }) {
    const { tag: TagName = 'input', type, props, content } = config;

    if (tagsWithoutContent.includes(TagName.toLowerCase()))
        return <TagName type={type} {...props} />;
    return <TagName type={type} {...props}> {content} </TagName>;
}

DynamicComponent.propTypes = {
    config: PropTypes.shape({
        tag: PropTypes.string,
        type: PropTypes.string,
        content: PropTypes.string,
        // title: PropTypes.string,
        // value: PropTypes.string,
        // isValid: PropTypes.bool,
        // defaultErrMsg: PropTypes.string,
        // dataTip: PropTypes.string,
        props: PropTypes.shape({
            // name: PropTypes.string,
            // onClick: PropTypes.func,
        }),
    }),
    onChange: PropTypes.func,
};