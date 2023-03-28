import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import Captions from '../pages/captions';
import TermsInput from '../pages/termsinput';

describe('CaptionsPage', () => {
  //make sure we are rendering a heading
  it('renders a heading', () => {
    render(<Captions/>)
    const heading = screen.getByRole('heading', {
      name: /Captions/i,
    })
    expect(heading).toBeInTheDocument()
  })

  //test state functionality
  it('test what goes into state, ', () => {
    const setState = jest.fn();
    jest
      .spyOn(React, 'useState')
      .mockImplementationOnce(initState => [initState, setState])
  })

  it('renders the nav section (home/settings/help)', () => {
    render(<Captions/>)
    const navsection = screen.getByTestId('settingsmenu')
    expect(navsection).toBeInTheDocument()
  })

  it('should display correct help info', () => {
    render(<Captions/>)
    Object.defineProperty(window, "location", { //simulate the window location
      value: new URL("http://localhost:3000/captions"),
        configurable: true,
      });
    const helpicon = screen.getByTestId('helpicon')
    fireEvent(helpicon, new MouseEvent('click', {
      bubbles: true,
      cancelable: true, 
    }))
    const helpSection = screen.getByText('Your Search Results')//if this is in document, then we have displayed the correct help menu
    expect(helpSection).toBeInTheDocument()
  })

})

