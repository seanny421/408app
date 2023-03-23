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

  //test caption matching functionality
  //we need to render multiple pages here to test this
  // it('matches captions correctly', () => {
  //   const {get}

  // })
})

