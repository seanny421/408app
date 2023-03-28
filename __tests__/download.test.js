import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import Download from '../pages/download';

describe('DownloadPage', () => {

  it('renders the nav section (home/settings/help)', () => {
    render(<Download/>)
    const navsection = screen.getByTestId('settingsmenu')
    expect(navsection).toBeInTheDocument()
  })

  it('should display correct help info', () => {
    render(<Download/>)
    Object.defineProperty(window, "location", { //simulate the window location
      value: new URL("http://localhost:3000/download"),
        configurable: true,
      });
    const helpicon = screen.getByTestId('helpicon')
    fireEvent(helpicon, new MouseEvent('click', {
      bubbles: true,
      cancelable: true, 
    }))
    const helpSection = screen.getByText('This page is dedicated to the downloaded clips you have selected')//if this is in document, then we have displayed the correct help menu
    expect(helpSection).toBeInTheDocument()
  })

})

