import React from 'react'
import ReactDOM from 'react-dom'
import Editor from '../editor.todo'
import * as utilsMock from '../../utils/api'

jest.mock('../../utils/api', () => {
  return {
    posts: {
      create: jest.fn(() => Promise.resolve()),
    },
  }
})

const flushPromises = () => {
  return new Promise(resolve => {
    setTimeout(resolve, 0)
  })
}

test('calls onSubmit with the username and password when submitted', async () => {
  // Arrange
  // create a fake user, post, history, and api
  const container = document.createElement('div')
  //
  const fakeUser = {id: 'test id'}
  const fakeHistory = {
    push: jest.fn(),
  }
  // use ReactDOM.render() to render the editor to a div
  ReactDOM.render(<Editor user={fakeUser} history={fakeHistory} />, container)
  //
  const form = container.querySelector('form')
  // fill out form elements with your fake post
  const {title, content, tags} = form.elements
  // ARRANGE
  title.value = 'Alger la blanche'
  content.value = 'Vive algeria'
  tags.value = 'twix,     my  ,likes'
  // ACT
  const submit = new window.Event('submit')
  form.dispatchEvent(submit)

  // await till the next sync of the event loop to run the
  // rest of the assertions
  await flushPromises()

  // ASSERT
  expect(fakeHistory.push).toHaveBeenCalledTimes(1)
  expect(fakeHistory.push).toHaveBeenCalledWith('/')

  expect(utilsMock.posts.create).toHaveBeenCalledTimes(1)
  expect(utilsMock.posts.create).toHaveBeenCalledWith({
    authorId: fakeUser.id,
    title: title.value,
    content: content.value,
    tags: ['twix', 'my', 'likes'],
    date: expect.any(String),
  })
})
// test('snapshot', () => {})
