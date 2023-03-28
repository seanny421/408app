import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import Editor from '../pages/editor';
import {act} from 'react-test-renderer';

describe('Editor Page', () => {
  //make sure we are rendering a heading
  it('renders a heading', async() => {
    await act(() => render(<Editor/>))
    const heading = screen.getByRole('heading', {
      name: /Editor/i,
    })
    expect(heading).toBeInTheDocument()
  })

  it('renders the nav section (home/settings/help)', async() => {
    await act(async () => render(<Editor/>))
    const navsection = screen.getByTestId('settingsmenu')
    expect(navsection).toBeInTheDocument()
  })

  it('should display correct help info', async() => {
    await act(() => render(<Editor/>))
    Object.defineProperty(window, "location", { //simulate the window location
      value: new URL("http://localhost:3000/editor"),
        configurable: true,
      });
    const helpicon = screen.getByTestId('helpicon')
    fireEvent(helpicon, new MouseEvent('click', {
      bubbles: true,
      cancelable: true, 
    }))
    const helpSection = screen.getByText('How do I edit videos?')//if this is in document, then we have displayed the correct help menu
    expect(helpSection).toBeInTheDocument()
  })

})

