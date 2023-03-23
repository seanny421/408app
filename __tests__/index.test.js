import { render, screen, fireEvent, getByRole, waitFor } from '@testing-library/react';
import Home from '../pages/index';
import React from 'react';
import '@testing-library/jest-dom';
import URL_List from '../components/URL/URL_List';
import renderer from 'react-test-renderer'

describe('Home', () => {
  it('renders a heading', () => {
    render(<Home/>)
    const heading = screen.getByRole('heading', {
      name: /Vashup/i,
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

  it('correctly renders user input', () => {
    render(<Home/>)
    const input = screen.getByRole('textbox')
    fireEvent.change(input, {target: {value: 'https://www.youtube.com/watch?v=V8sZY5idx8c&ab_channel=TheoBaker'} })
    expect(input).toHaveValue('https://www.youtube.com/watch?v=V8sZY5idx8c&ab_channel=TheoBaker')
  })
})

