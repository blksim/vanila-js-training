import React, { Component } from 'react';
//import React, { useState } from 'react'; // useState is the hook that allows us to manage state in a functional component.
import './App.css';
import './Person/Person.css'; // thanks to webpack, we can actually import css into js though it will not really merge the two files.
import Person from './Person/Person';

// const App = props => {
// /* we can pass initial state into the function.
//   IMPORTANT : useState returns an array with exactly two elements always.
//   the first element will always be our current state. 
//   the second element will always be a function that allows us to update this state, 
//   which is also happens with this.setState() in class-based components.
//   we can use array destructuring instead of const stateArr = useState(state = { 

//   SUPER IMPORTANT : function which your get as the second element in this array 
//   does not merge whatever you pass to it the old state.
  
//   this means whenever you updating the state like this, 
//   You manually make sure you include all old state data. */
//     const [personsState, setPersonsState] = useState({
//       persons: [
//           { name: 'Max', age: 28 },
//           { name: 'Manu', age: 29 },
//           { name: 'Stephanie', age: 26}
//         ]
//     });

// /*     
//   multiple useState() with different state slices
//   that is how you manage state in a functional component with react hooks.
  
//   To summarize it, react hooks is all about these use something functions with useState() being the most important,
//   that allows you to add functionality to functional components, like here useState() allows us to add state management to functional components.
// */    
//     const [otherState, setOtherState] = useState('some other value');
//     console.log(personsState, otherState);

//     const switchNameHandler = () => {
//     setPersonsState({persons: [
//         { name: 'Maximilian', age: 28 },
//         { name: 'Manu', age: 29 },
//         { name: 'Stephanie', age: 27}
//       ]})
//     }
  
// return (
//         <div className="App">
//           <h1>Hi. I'm a React App!</h1>
//           <p>This is really working!</p>
//           <button onClick={switchNameHandler}>Swtich Name</button>
//           <Person name={personsState.persons[0].name} age={personsState.persons[0].age}/> 
//           <Person name={personsState.persons[1].name} age={personsState.persons[1].age}>My Hobbies: Racing</Person> 
//           <Person name={personsState.persons[2].name} age={personsState.persons[2].age}/>  
//         </div> 
//         )
// }
// export default App;
/**
 * A stateful component : a component that manages state(the useState hook or a class-based approach with the state property)
 * A stateless component : a component that has no internal state management 
 */



class App extends Component {
  /* state can be changed and if it changes and that's the special thing about it
  and only works on that state property, if it changes, it will lead React to re-render our DOM or update the DOM
  only class-based components can define and use state.
  whenever state changes, the component will re-render and  reflect the new state.
  the difference to props is, that this happens within one and the same component */
  state = {
    persons: [
      { name: 'Max', age: 28 },
      { name: 'Manu', age: 29 },
      { name: 'Stephanie', age: 26}
    ],
    otherState: 'some other value' // React will not discard other state but it will simply merge the old state with the new one.
  }

  switchNameHandler = (newName) => {
  // DONT DO THIS: this.state.persons[0].name = 'Maximilian'; // we shouldn't mutate which means change the state directly like this.
  // this.setState() only availabe in class-based components.
  // and it was the only way of managing state in React app in class-based components. 
  // since React 16.8, there is also a way for us to manage state in functional components with a featrue called React hooks.
  this.setState({persons: [
      { name: newName, age: 28 },
      { name: 'Manu', age: 29 },
      { name: 'Stephanie', age: 27}
    ]})
/*     DOM will be updated because React recognized that the state of the application changes and this is really a special thing.
    but keep in mind what we actually output for each person is defined in this person component
    If state or props changes, it basically analyze the code it already rendered to the DOM
    and the code it would now render if it were to re-render everything and then it updates to existing DOM in all the places where it needs to update it to reflect your new state and props. */
  }

  nameChangedHandler = (event) => {
    this.setState({persons: [
      { name: 'Max', age: 28 },
      { name: event.target.value, age: 29 },
      { name: 'Stephanie', age: 26}
    ]})
  }

/*
  don't add switchNameHandler inside of parantheses. 
  you will run into errors if you try to use this because this will then not refer to the class at runtime
  important: we only want to pass 'a reference' and we do this by using 'this' and then referring to that 'property' which holds a function.
  list of supported events in react : https://reactjs.org/docs/events.html#supported-events
 
  we can actually pass a reference to onClick handler as a property to our component
  IMPORTANT : you can pass methods also as props so that you can call a method which might change the state in another component 
  which doesn't have direct access to the state and which shouldn't have direct access to the state.
  
  how to pass a data to the function?
  1. RECOMMENDED : call bind() then pass data as parameter onClick={this.switchNameHandler.bind(this, 'Maximilian')}
  2. NOT RECOMMENDED : use arrow function with inside of curly brace. it is convenient but can be inefficient because react can re-render certain things too often 
  */  
  render() {
    const style = {// using inline styles are only applied to single element and no other element or even in the same component.
      backgroundColor: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    }; 
    
    return (
      <div className="App">
        <h1>Hi. I'm a React App!</h1>
        <p>This is really working!</p>
        <button 
        style={style}
        onClick={() => this.switchNameHandler('Maximilian!!')}>Swtich Name</button>
        <Person name={this.state.persons[0].name} age={this.state.persons[0].age}/> 
        <Person name={this.state.persons[1].name} age={this.state.persons[1].age} 
        click={this.switchNameHandler.bind(this, 'Max!')}
        changed={this.nameChangedHandler}>My Hobbies: Racing</Person> 
        <Person name={this.state.persons[2].name} age={this.state.persons[2].age}/>  
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



