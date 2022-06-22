import React from 'react';
import { render, screen } from '@testing-library/react';
import SelectorWidget from './SelectorWidget';

test('renders learn react link', () => {
  render(<SelectorWidget />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
