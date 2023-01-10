//https://fek.io/blog/add-jest-testing-framework-to-an-existing-next-js-app
import { render, screen, fireEvent } from '@testing-library/react';
import Home from '../pages/index';
import TermsInput from '../pages/termsinput';
import React from 'react';
import '@testing-library/jest-dom';
import { shallow } from 'enzyme';


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
    // fireEvent(btn, new MouseEvent('click', {bubbles: true, cancelable: true}))
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
    const addBtn = screen.getByTestId('addbtn')
    expect(addBtn).toBeInTheDocument()
  })

  it('adds items correctly to list', () => {
    render(<TermsInput/>)
    //test we have rendered everything correctly
    const inputBar = screen.getByRole('textbox')
    const btn = screen.getByTestId('addbtn')
    //test functionality of add btn
    fireEvent.change(inputBar, {target: {value: 'sample user input'} })
    expect(inputBar).toHaveValue('sample user input')
    fireEvent(btn, new MouseEvent('click', {
      bubbles: true,
      cancelable: true, 
    }))
    const bubble = screen.getByText('sample user input')
    //make sure input is displayed to user and inputbar is reinitialised
    expect(bubble).toBeInTheDocument()
    expect(inputBar).toHaveValue('')
    //make sure we are rendering nextpage btn
    const nextPageBtn = screen.getByRole('link', {name: 'Next'})
    expect(nextPageBtn).toBeVisible()
  })


  it('removes items correctly from list', () => {
    render(<TermsInput/>)
    //make sure we have card to remove
    const bubble = screen.getByText('sample user input')
    expect(bubble).toBeInTheDocument()
    //test functionality of remove btn  
    const removeBtn = screen.getByTestId('remove-btn-0')
    expect(removeBtn).toBeInTheDocument()
    fireEvent(removeBtn, new MouseEvent('click', {
      bubbles: true,
      cancelable: true, 
    }))
    //test that no items are in list
    const cardContainer = screen.getByTestId('terms-card-container')
    expect(cardContainer).toBeEmpty()
    //test that nextpage btn is not visible
    const nextPageBtnContainer = screen.getByTestId('nextpage-btn-container')
    expect(nextPageBtnContainer).not.toBeVisible()
  })
})
