import { render, screen, fireEvent, getByRole, waitFor } from '@testing-library/react';
import Home from '../pages/index';
import React from 'react';
import '@testing-library/jest-dom';

describe('SettingsMenu', () => {
  it('correctly displays the theme selector', ()=> {
    render(<Home/>)
    const themeSelectorIcon = screen.getByTestId('settingsicon')
    fireEvent(themeSelectorIcon, new MouseEvent('click', {
      bubbles: true,
      cancelable: true, 
    }))
    const themeToggler = screen.getByLabelText('Dark mode')
    expect(themeToggler).toBeInTheDocument()
  })
})
