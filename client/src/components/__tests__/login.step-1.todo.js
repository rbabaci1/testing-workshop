import React from 'react'
import ReactDOM from 'react-dom'
import Login from '../login'

// Basic unit test
test('calls onSubmit with the username and password when submitted', () => {
  //! ARRANGE
  const container = document.createElement('div')
  // create a fake object to hold the form field values (username and password)
  const fakeFormValues = {
    username: 'rbabaci1',
    password: '1234',
  }
  //  create a jest.fn() for your submit handler
  const handleSubmit = jest.fn()
  // render the Login component to a div
  ReactDOM.render(<Login onSubmit={handleSubmit} />, container)
  // get the form container
  const form = container.querySelector('form')
  // get the field nodes
  const {username, password} = form.elements
  // fill in the field values
  username.value = 'rbabaci1'
  password.value = '1234'

  //! ACT
  // submit the form:
  const submit = new window.Event('submit')
  form.dispatchEvent(submit)

  //! ASSERT
  // ensure your submit handler was called properly
  expect(handleSubmit).toHaveBeenCalledTimes(1)
  expect(handleSubmit).toHaveBeenCalledWith(fakeFormValues)
})

//////// Elaboration & Feedback /////////
// When you've finished with the exercises:
// 1. Copy the URL below into your browser and fill out the form
// 2. remove the `.skip` from the test below
// 3. Change submitted from `false` to `true`
// 4. And you're all done!
/*
http://ws.kcd.im/?ws=Testing&e=login.step-1&em=4rabah@gmail.com
*/
test.skip('I submitted my elaboration and feedback', () => {
  const submitted = false // change this when you've submitted!
  expect(submitted).toBe(true)
})
////////////////////////////////
