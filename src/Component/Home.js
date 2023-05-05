import React from 'react'
import { AddNote } from './AddNote'
import Notes from './Notes'

export const Home = (props) => {
const {showAlert} = props
  return (
    <div>
      {/* <AddNote /> */}
      <Notes showAlert={showAlert} /> {/* Presenting notes section bottom of the form by importing for Notes.js */}
    </div>
  )
}
