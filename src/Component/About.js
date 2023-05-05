import React from 'react'
// import noteContext from '../context/notes/NoteContext'

export const About = () => {
  // const a = useContext(noteContext);

  return (

    <div>
      <h2>About</h2>
      <div class="accordion" id="accordionExample">
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingOne">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
              What is NotePad ?
            </button>
          </h2>
          <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
            <div class="accordion-body">
              <strong>NotePad</strong> is an notes web application to store the information or important works its more like to-do list here your notes are save no-one can read them. Notes of an user will store at the backend of the applictaion. User can create, add, edit and delete their notes.
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingTwo">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
              Which tech stack is use to build this application ?
            </button>
          </h2>
          <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
            <div class="accordion-body">
              <strong>Mern</strong> is an very powerfull tech stack. It basically used different tech components and bind them in one web application. Mern stands for "Mongodb, Experess js, React js and Node js". mongodb is use in an database which is use to store the notes information. Express is for backend to manage nodejs. React is an liabrary for front end use to make dynamic web pages. Nodejs is an javaScript runtime environment use in backend of the application. 
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingThree">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
              How to use NotePad?
            </button>
          </h2>
          <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
            <div class="accordion-body">
              <strong>NotePad</strong> is an very easy application to use. A user have to sign in first by entering the asked credentials after the it automatically redirect to Home page where he/she can use the application. After it may also easyly logout from the application. If he again want to use the application he/she have to log in then when they enter thir credentials it automatically redirected to Home pad of an NOTEPAD. 
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
