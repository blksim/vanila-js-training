import React, { Component } from 'react';
//import React, { useState } from 'react'; // useState is the hook that allows us to manage state in a functional component.
//import styled from 'styled-components';
import CssModule from '../containers/App.module.css';
//import Radium, { StyleRoot } from 'radium';
//import './Person/Person.css'; // thanks to webpack, we can actually import css into js though it will not really merge the two files.
import Persons from '../components/Person/Persons';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';
import Cockpit from '../components/Cockpit/Cockpit';
import withClass from '../hoc/withClass';
import Auxiliary from '../hoc/Auxiliary';
import AuthContext from '../context/auth-context';

// dynamic expression is also syntax of template literal, not react
// styled component will have a look at that function and pass the props as argument
// then we can use the props here and returned text 
// const StyledButton = styled.button`
//   background-color: ${props => props.alt ? 'red' : 'green'};
//   color: white;
//   font: inherit;
//   border: 1px solid blue;
//   padding: 8px;
//   cursor: pointer;
  
//   &:hover {
//     background-color: ${props => props.alt ? 'salmon' : 'lightgreen'};
//     color: black;
//   }
// `;
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


// App.js is a class-based component and therefore here, we have access to lifecycle hooks.
class App extends Component {
  // This will basically execute the constructor of the component you're extending.
  // and that's important to make sure that everything gets initialized correctly and you can do things like access this set state.
  constructor(props) {
    super(props); 
    console.log('[App.js] constructor');
    // old syntax which call super props and set the state up in the constructor.
    // you can't use setState() because there's no state to merge this state with.
    this.state = { 
      persons: [
        { id: 123, name: 'Max', age: 28 },
        { id: 456, name: 'Manu', age: 30 },
        { id: 789, name: 'Stephanie', age: 26}
      ],
      otherState: 'some other value', // React will not discard other state but it will simply merge the old state with the new one.
      showPersons: false,
      showCockpit: true,
      changeCounter: 0,
      authenticated: false
    }
  }

  /**
   * IMPORTANT: you should know how they actually are created and where you can execute your custom code during that lifecycle process.
   * componentDidMount(), componentDidUpdate() 
   * and also for performance improvements, shouldComponentUpdate() are THE MOST IMPORTANT HOOKS 
   * 
   * because in componentDidMount() and componentDidUpdate(),
   * you will typically do things like fetching new data from a server, shouldComponentUpdate() can be used for performance improvements.
   * 
   * What about functional components?
   * now with react hooks, you can actually build your entire react app with functional components only
   * because you can manage the state in here.
   */

  static getDerivedStateFromProps(props, state) {
    // you'll not actually not use that too often either.
    console.log('[App.js] getDerivedStateFromProps', props);
    return state;
  }

  // componentWillMount() {
  //   // these hooks were very rarely used and could be incorrectly
  //   // and gtherefore they will be removed in the future. 
  //   console.log('[App.js] componentWillMount');
  // }

  componentDidMount() {
    console.log('[App.js] componentDIdMount');
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('[App.js] shouldComponentUpdate');
    // SUPER IMPORTANT: This is super powerful because it can save us a performance, for that removal of the cockpit,
    // we did not go through the entire persons component tree to re-render that virtually.
    //if (nextProps.persons !== this.props.persons) { // what we do compare is actually pointer
      // if I would just manipulated the old array directly ?
      // the object in memory would be the same even if some property of it changed
      // then our shouldComponentUpdate check would not work because it doesn't *deeply* compare this.
    //   return true;
    // } else {
    //   return false; //if you return false, toggle will not work because you're preventing the update
    // } 

    /*   **** It's not a super performance heavy check but still,
    let's say 60% of your components actually always need to update when their parent updates,
    welle if you the wrapped all your components with these extra checkx, then you're running unnecessary cehcks on 60% of your component codebase
    so you should evaluate this carefully.

    Otherwise if you're pretty sure that in all or almost all cases where your parent updates, you will need to update too,
    then you should not add shouldComponentUpdate or React memo because you will just execute some extra logic that makes no sense and actually just slows down the application a tiny bit.
 */    return true; 
  }

  componentDidUpdate() {
    console.log('[App.js] componentDidUpdate');
  }

  /* state can be changed and if it changes and that's the special thing about it
  and only works on that state property, if it changes, it will lead React to re-render our DOM or update the DOM
  only class-based components can define and use state.
  whenever state changes, the component will re-render and  reflect the new state.
  the difference to props is, that this happens within one and the same component 
  state = { <-- more modern way to initialize the state than above
    persons: [
      { id: 123, name: 'Max', age: 28 },
      { id: 456, name: 'Manu', age: 29 },
      { id: 789, name: 'Stephanie', age: 26}
    ],
    otherState: 'some other value', // React will not discard other state but it will simply merge the old state with the new one.
    showPersons: false
  }
  */
//   switchNameHandler = (newName) => {
//   // DONT DO THIS: this.state.persons[0].name = 'Maximilian'; // we shouldn't mutate which means change the state directly like this.
//   // this.setState() only availabe in class-based components.
//   // and it was the only way of managing state in React app in class-based components. 
//   // since React 16.8, there is also a way for us to manage state in functional components with a featrue called React hooks.
//   this.setState({persons: [
//       { name: newName, age: 28 },
//       { name: 'Manu', age: 29 },
//       { name: 'Stephanie', age: 27}
//     ]})
// /*     DOM will be updated because React recognized that the state of the application changes and this is really a special thing.
//     but keep in mind what we actually output for each person is defined in this person component
//     If state or props changes, it basically analyze the code it already rendered to the DOM
//     and the code it would now render if it were to re-render everything and then it updates to existing DOM in all the places where it needs to update it to reflect your new state and props. */
//   }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    // spread operator also available for objects. 
    // it will distribute all the properties of the object we fetch here 
    // into this new object we're creating here.
    const person =  {
      ...this.state.persons[personIndex]
    };

    // Alternative approach : object assigned with an empty object and then the object of which we want to get the properties
    // const person = Object.assign({}, this.state.persons[personIndex]);

    person.name = event.target.value;
  
    const persons = [...this.state.persons];
    persons[personIndex] = person;

  //   this.setState({persons: [
  //     { id: 'sjdje1', name: 'Max', age: 28 },
  //     { id: 'sjdje2', name: event.target.value, age: 29 },
  //     { id: 'sjdje3', name: 'Stephanie', age: 26}
  //   ]
  // })

  // SUPER IMPORTANT TO KEEP THAT IN MIND : it's an important pattern, not an optional solution but really the best practice for state updates that depend on the old state.
    this.setState( (prevState, props) => {
      return {
        persons: persons,
        changeCounter: this.state.changeCounter + 1
      }
    });
  }
    /* this.setState(() => { person: persons, changeCounter: this.state.changeCounter + 1})
    you call setState synchronously here but it's not guaranteed to execute and finish immediately and therefore,  
    this state when used for a state update is not guaranteed to be the latest state or the previous state on which you depend, it could be an older state.
    yet it is the wrong way of updating changeCounter. Behind the scenes, setState() does not immediately trigger an update of the state of this component in a re-render cycle,
    instead it's basically scheduled by React and React will then perform the state update and re-render cycle when it has the available reousrces to do taht. */

  /**
   * - we did this by getting access to all the persons in the state, removing the one element we wanted to remove 
   *   by using the index of the person and updating the state.
   * - The flaw of this approach is that in javascript, objects and arrays are reference types.
   * 
   * => A good practice is to "create a copy" of your persons array before manipulating it.
   */
  deletePersonHandler = (personsIndex) => {
 /* const persons = this.state.persons; // actually get a pointer to the original person's object managed by react, to the original state
    persons.splice(personsIndex, 1); // if then splice it here, I already mutate this original data and whilst it does work, **this is not really how you should do it**.
    this.setState({persons: persons}); // this can lead to unpredictable apps and is definately a bad practice.

    - Slice without arguments simply copies the full array and returns a new one which is then stored here.
      and you can now safely edit this new one and then update to react state with your new array.
    const persons = this.state.persons.slice(); 
    
    - An alternative is to use spread operator.
      you can simply set persons equal to a new array and this new array can now use the spread operator
      which are three dots where are you now reach out to state persons.

      it spreads out the elements in this array into a list of elements simply then
      gets added to this array, so that now we have an array, a new array, with the objects from the old array but not the old array itself.
    
    IMPORTANT :  You should always update state in an immutable fashion, os without mutating the original state first.
  */
    const persons = [...this.state.persons];
    persons.splice(personsIndex, 1); 
    this.setState({persons: persons}); 
 
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    //console.log(doesShow); 
    this.setState({showPersons: !doesShow}); 
    /* this gets merged with the other state.
    it does not mean that the entire state gets replaced with showPersons only.
    the old state persons, another state simply is not touched, react merges the update showPersons value for us into the state. */
  }

  loginHandler = () => {
    const authenticated = this.state.authenticated;
    this.setState({authenticated: !authenticated});
  }

/*
  don't add parantheses to switchNameHandler . 
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
    console.log('[App.js] render');
    // const style = {// using inline styles are only applied to single element and no other element or even in the same component.
    //   backgroundColor: 'green',
    //   color: 'white',
    //   font: 'inherit',
    //   border: '1px solid blue',
    //   padding: '8px',
    //   cursor: 'pointer',
    //   ':hover': {
    //     backgroundColor: 'lightgreen',
    //     color: 'black'
    //   }
    // }; 

    let persons = null;

    if (this.state.showPersons) {
     /*  
     
      - Hardcoded three data => inflexible.
      
      - map() simply maps every element is a given array such as our persons array here into something else.
        It does this by executing a method on every element in a given array.
        since I just print this new array like this inside jsx, react will basically just try to take the individual elements 
        of this new array and render them to the dom if they are valid jsx. 
      
      - The good thing is the map method also exposes a second argument. the index
      - execute as a arrow function or use bind

      - By passing unique id using 'key' prop, react can use to compare the elements of the future with the elements of the past
        and only update the dom in places where it needs to update it.
      */

      /**
       * ERROR BOUNDARY
       * error boundary is so-called higher order component.
       * it's a component which simply wraps a component with the goal of handling 
       * any errors that component might throw.
       */
      persons = (
        <div>
          <Persons persons={this.state.persons}
          clicked={this.deletePersonHandler}
          changed={this.nameChangedHandler}/>
        </div>
      //   <div>
      //     {this.state.persons.map((person, index) => {
      //       return <ErrorBoundary><Person 
      //         click={() => this.deletePersonHandler(index)}
      //         name={person.name} 
      //         age={person.age}
      //         key={person.id}
      //         changed={(event) => this.nameChangedHandler(event, person.id)}/>
      //         </ErrorBoundary>
      //       })
      //     }
      //     {/* <Person name={this.state.persons[0].name} age={this.state.persons[0].age}/> 
      //     <Person name={this.state.persons[1].name} age={this.state.persons[1].age} 
      //     click={this.switchNameHandler.bind(this, 'Max!')}
      //     changed={this.nameChangedHandler}>My Hobbies: Racing</Person> 
      //     <Person name={this.state.persons[2].name} age={this.state.persons[2].age}/>   */}
      // </div>
      );
    }
      // assign a value to one of its properties
      //style.backgroundColor = 'red';
/*    
      So this is pretty cool because now you have the best of both worlds,
      you have the normal css pseudo selectors you can add and you still have scoped styles
      which you can easily edit from within your javascript code, as you can see below.
    
        style[':hover'] = {
        backgroundColor: 'salmon',
        color: 'black'
      }
    }
    
    /*
    

    - You can render content conditionally by adding a ternary expression.
      but as our app grows as we possibly nest conditions, it can be hard to keep track of which expression is responsible for what
      and to spot them in our jsx code.
      
    - So there is a cleaner & prferred solution for that is kind of outsourcing this check from JSX we return to
      a variable we conditionally assign before returning.
    
    */ 
  //  const classes = []; 
  //  if (this.state.persons.length <= 2) { // classes = ['red']
  //    classes.push('red');
  //  } 
  //  if (this.state.persons.length <= 1) {
  //    classes.push('bold'); // classes = ['red' 'bold']
  //  }
   // to use inline media queries with Radium, you should wrap JSX with StyleRoot component
    return (
      <Auxiliary>
        <button onClick={() => {this.setState({ showCockpit: false})}}>Remove Cockpit</button>
        <AuthContext.Provider value={{authenticated: this.state.authenticated, login: this.login}} >
          {this.state.showCockpit ? (<Cockpit title={this.props.appTitle}
          showPersons={this.state.showPersons} 
          personsLength={this.state.persons.length}
          clicked={this.togglePersonsHandler}/>
          ) : null}
          {persons}
        </AuthContext.Provider>
      </Auxiliary>
    /**
     * Provider
     *  - it takes a *value* prop **and this is why the default value here don't really matter**,
     *    the default value will apply when you don't sent any other vlaue.
     *    However in many use cases like one, you actually want to have a dynamic value, the auth status can change afterall and therefore, I'll manage the status here in app.js
     *    and I pass my current state of authentication status here to value.
     */
      // <div>
      //   <button onClick={() => {this.setState({ showCockpit: false})}}>Remove Cockpit</button>
      //   {this.state.showCockpit ? (<Cockpit title={this.props.appTitle}
      //   showPersons={this.state.showPersons} 
      //   personsLength={this.state.persons.length}
      //   clicked={this.togglePersonsHandler}/>
      //   ) : null}
      //   {persons}
      // </div>
//      <StyleRoot>
      // <div className="App">
      //   <h1>Hi. I'm a React App!</h1>
      //   <p className={classes.join(' ')}>This is really working!</p>
      //   <button className={CssModule.Button} alt={this.state.showPerson} 
      //   onClick={this.togglePersonsHandler}>Toggle Persons</button>
      //   {persons} 
      //   {
           /* { this.state.showPersons ? 
        <div>
          <Person name={this.state.persons[0].name} age={this.state.persons[0].age}/> 
          <Person name={this.state.persons[1].name} age={this.state.persons[1].age} 
          click={this.switchNameHandler.bind(this, 'Max!')}
          changed={this.nameChangedHandler}>My Hobbies: Racing</Person> 
          <Person name={this.state.persons[2].name} age={this.state.persons[2].age}/>  
        </div>
         </div> : null
        }  }*/
 //     </div> 
//      </StyleRoot>
//      );
     
      /* 
        JSX
        
        - looks like html but it's not. just some syntactical sugar.
          it was basically invented by the react team and we can write it in our javascript files because of the build workflow we're usign here.
          it will basically automatically transpile it to valid js in the end. 
        
      */ 

      //return React.createElement('div', null, 'h1', 'Hi, I am react app!'); <--- 'h1' passed as a text, not element
      //return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));

      /*
        React.createElement()
        
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
   
    );
  }
}
// you can use this on both components created with class and extends component as well as functional components
//export default Radium(App); 
// export default App;
 export default withClass(App, CssModule.App);


