import React from 'react';
import renderer from 'react-test-renderer'; // ES6
import '@testing-library/jest-dom/extend-expect'; // ES6
import FormGenerator from '..';
import config from './testConfig';

it('matches snapshot', () => {
    const tree = renderer.create(<FormGenerator config={config} />).toJSON();
    expect(tree).toMatchSnapshot();
});