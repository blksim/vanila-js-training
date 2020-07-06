import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Hi. I'm a React App!</h1>
        <p>This is really working!</p>
        <Person name="Max" age="28"/> 
        <Person name="Manu" age="29">My Hobbies: Racing</Person> 
        <Person name="Stephanie" age="26"/>  
      </div> 
      )
     
      /* looks like html but it's not. just some syntactical sugar.
      it was basically invented by the react team
      and we can write it in our javascript files because of the build workflow we're usign here.
      it will basically automatically transpile it to valid js in the end. */ 

      // return React.createElement('div', null, 'h1', 'Hi, I am react app!'); <--- 'h1' passed as a text, not element
      //return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));

      /* 
      - The nested createElement above is exact equivalent of this jsx code.
      and it's actually what this code here will get compiled by one of the many build tools.
      This is the reason why we use jsx but it's super important to understand 
      the internals and understand what this compiles to and also, understand what whilst it does look like html, it isn't.
      This is javascript in the end. it gets compiled to this code.

      - some words can't be used(e.g class which is a reserved word in javascript)
      
      - react converts html-like tags behind the scenes and react defines the attributes in quotation marks.
      - we can define on all these elements and we don't have the class attribute as we have on the regular html element like 'className' here to add css class.

      - jsx expression must have one root element.
      - It is a typical thing to wrap everything into one root element per component 
    */  
   }
}

export default App;
