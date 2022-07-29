import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import TestRenderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import React from 'react';
import store from './redux/configureStore';
import Mainpage from './components/Mainpage';
import Country from './components/Country';

test('renders Mainpage', () => {
  render(
    <Provider store={store}>
      <Mainpage />
    </Provider>,
  );
  const linkElement = screen.getByText(/Stats By Countries/i);
  expect(linkElement).toBeInTheDocument();
});

it('Country Page renders correctly', () => {
  const Tree = TestRenderer.create(
    <Provider store={store}>
      <BrowserRouter>
        <Country />
      </BrowserRouter>
    </Provider>
    ,
  );
  expect(Tree).toMatchSnapshot();
});

it('Main page renders correctly', () => {
  const Tree = TestRenderer.create(
    <Provider store={store}>
      <Mainpage />
    </Provider>,
  );
  expect(Tree).toMatchSnapshot();
});
