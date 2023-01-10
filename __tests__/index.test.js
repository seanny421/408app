//https://fek.io/blog/add-jest-testing-framework-to-an-existing-next-js-app
import { render, screen, fireEvent } from '@testing-library/react';
import Home from '../pages/index';
import TermsInput from '../pages/termsinput';
import React from 'react';
import '@testing-library/jest-dom';


describe('Home', () => {
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

  it('renders the next btn after adding item to urllist', () => {
    render(<Home/>)
    const addSomethingToUrlList = jest.fn()
    expect(addSomethingToUrlList).not.toHaveBeenCalled()

    const input = screen.getByRole('textbox')
    // const submitbtn = screen.getByRole('button')
    const btn = screen.getByTestId('submitbtn')

    fireEvent.change(input, {target: {value: 'https://www.youtube.com/watch?v=V8sZY5idx8c&ab_channel=TheoBaker'} })
    expect(input).toHaveValue('https://www.youtube.com/watch?v=V8sZY5idx8c&ab_channel=TheoBaker')
    // fireEvent.click(btn, new MouseEvent('click', {bubbles: true, cancelable: true}))
    jest.advanceTimersByTime(500)
    // expect(addSomethingToUrlList).toHaveBeenCalledWith('https://www.youtube.com/watch?v=V8sZY5idx8c&ab_channel=TheoBaker')

  })

})

describe('TermsInput', () => {
  it('renders a heading', () => {
    render(<TermsInput/>)
    const heading = screen.getByRole('heading', {
      name: /TermsInput/i,
    })
    expect(heading).toBeInTheDocument()
  })

  it('renders the user instructions', () => {
    render(<TermsInput/>)
    const paragraph = screen.getByText('Please input any words/phrases you wish to search for')
    expect(paragraph).toBeInTheDocument()
  })

  it('renders input bar', () => {
    render(<TermsInput/>)
    //this also ensures that input is initialised to ''
    const inputBar = screen.getByDisplayValue('')
    expect(inputBar).toBeInTheDocument()
    // const input = screen.getByRole('textbox')
    // expect(input).toBeInTheDocument()

  })

})
