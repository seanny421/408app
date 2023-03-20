import { render, screen, fireEvent } from '@testing-library/react';
import TermsInput from '../pages/termsinput';
import '@testing-library/jest-dom';

describe('TermsInput', () => {
  it('renders a heading', () => {
    render(<TermsInput/>)
    const heading = screen.getByRole('heading', {
      name: /Words to search for/i,
    })
    expect(heading).toBeInTheDocument()
  })

  it('renders the user instructions', () => {
    render(<TermsInput/>)
    const paragraph = screen.getByText('Please input any words you wish to search the captions for, separated by a space if you want to search for multiple')
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
    fireEvent.change(inputBar, {target: {value: 'sample'} })
    expect(inputBar).toHaveValue('sample')
    fireEvent(btn, new MouseEvent('click', {
      bubbles: true,
      cancelable: true, 
    }))
    const bubble = screen.getByText('sample')
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
    const bubble = screen.getByText('sample')
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
    expect(cardContainer).toBeEmptyDOMElement()
    //test that nextpage btn is not visible
    const nextPageBtnContainer = screen.getByTestId('nextpage-btn-container')
    expect(nextPageBtnContainer).not.toBeVisible()
  })
})
