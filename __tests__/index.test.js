//https://fek.io/blog/add-jest-testing-framework-to-an-existing-next-js-app
import { render, screen } from '@testing-library/react';
import Home from '../pages/index';
import React from 'react';
import '@testing-library/jest-dom';

const sum = (a, b) => a + b;

describe('Home', () => {
  // it('should return 5 if given 2 and 3', () => {
  //   expect(sum(2, 3)).toBe(5)
  // })

  it('renders a heading', () => {
    render(<Home/>)
    const heading = screen.getByRole('heading', {
      name: /welcome to 408 project/i,
    })
    expect(heading).toBeInTheDocument()
  })

  it('renders the user instructions', () => {
    render(<Home/>)
    const paragraph = screen.getByText('Please enter a url to get started.')
    expect(paragraph).toBeInTheDocument()
  })

  it('input bar rendered & is empty', () => {
    render(<Home/>)
    const inputBar = screen.getByDisplayValue('')
    expect(inputBar).toBeInTheDocument()
  })

})
