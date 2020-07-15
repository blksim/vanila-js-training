import React, { Component } from 'react';
import propTypes from 'prop-types'; // you can add an extra property and now this works in both functional and class-based components.
//import Radium from 'radium';
//import styled from 'styled-components';
import CssModules from './Person.module.css';
import Auxiliary from '../../hoc/Auxiliary';
import withClass from '../../hoc/withClass';

/* props is simply an object giving us access to all the attributes we pass to our own components.
But sometimes you don't want to get some information from outside but you want to have it inside a component and change it from inside there, too.
state property here is only available like this in components that extend components

two-way binding : propagate the change so that we can update the state
listen to the nameChangeHandler which updates the state --> pass down tghe value to the Person and age 
--> output the value to the input
*/

/* 
USING STYLED COMPONENTS
- already returns our react component so this already is a functional or class based.
  so instead of creating a function here a functional component we just stored the result of this method call in our style.
  With using styled components library we can have a nice mixture of CSS and JavaScript "all in one file" with help of these installed compoents.

- the styles set up here are *not added as inline styles* but instead the style components package takes them 
  puts them into see us as class selectors and adds them to the head of document and then 
  just adds the appropriate CSS class to the div which is returned by this component or which is created as part of this component. 

- that means you're not working with inline styles which can have certain disadvantages e.g cascading nature of CSS
*/
// const StyledDiv = styled.div `
// width: 60%;
// margin: 16px auto;
// border: 1px solid #eee;
// box-shadow:  0 2px 3px #ccc;
// padding: 16px;
// text-align: center;

// @media (min-width: 500px) {
//         width: 450px;
// } 
//    `

class Person extends Component {
    componentDidMount() {
        this.inputElement.focus();
    }
    
    render() {
        console.log('[Person.js] rendering...');
/*         you must never forget these JSX elements are always call to React.createElement() 
        and in a return statement, you couldn't return multiple React.createElement()
        But the moment you wrap this with one React.createElement(), technically fro ma JS point of view, that is fine.
         
    return (
        <Auxiliary>
            <p key="i1" onClick={this.props.click}>I'm {this.props.name} and I am {this.props.age} years old!</p>
            <p key="i2">{this.props.children}</p>
            <input key="i3" type="text" onChange={this.props.changed} value={this.props.name}/>
        </Auxiliary>
        );  
         return (
                <div className={CssModules.Person}>
                    <p onClick={this.props.click}>I'm {this.props.name} and I am {this.props.age} years old!</p>
                    <p>{this.props.children}</p>
                    <input type="text" onChange={this.props.changed} value={this.props.name}/>
                </div>
        )
 */
    return (
        <React.Fragment>
           <p key="i1" onClick={this.props.click}>I'm {this.props.name} and I am {this.props.age} years old!</p>
            <p key="i2">{this.props.children}</p>
            <input key="i3" ref={(inputEl) => { this.inputElement = inputEl }} type="text" onChange={this.props.changed} value={this.props.name}/>
        </React.Fragment>
    ) 
    // ref, just like key, is a special property you can pass into any component, it is detected and understood by React.
    
}
}
const person = (props) => {
    console.log('[Person.js] rendering...');
    // const style = {
    //     '@media (min-width: 500px)': {
    //         width: '450px'
    //     }
    // }
    // <div className="Person" style={style}>
    
/*     how to handle error gracefully? ==> consider ErrorBoundary
    React will not overwrite your error page like development mode when you built it for production
    Instead what you will then see is whatever your render inside your error boundary.
    This doesn not mean that you should cluster your whole application with error boundaries, only use them when it makes sense.
    Only use error boundaries for cases where you know that it might fail and you can't control that.
 */
    //const rnd = Math.random();
   // if (rnd > 0.7) { throw new Error('something went wrong!')};
/*     return (

//        <StyledDiv>
         <div className={CssModules.Person}>
            <p onClick={props.click}>I'm {props.name} and I am {props.age} years old!</p>
            <p>{props.children}</p>
            <input type="text" onChange={props.changed} value={props.name}/>
        </div>
            //   </StyledDiv>
    )
 */
};
/**
 * - we can output dynamic content as part of our jsx content
 * - You will receive one argument in your function, one argument which is passwd into it by default by react
 * which is an object with all the properties of his component and properties means the attributes you add on your component
 * and properties means the attributes you add on your component.
 * - we have a reusable component which has a clearly defined template but in there,
 * we use dynamic content which we set from outside in the place where we actually use our component.
 * - props.children property is a reserved word. 
 * Children refers to any elements and this includes plain text and you could nest complex html code inbetween too.
 * - you can put your content into your compoent from outside, also by placing it between the opening and closing tag and accessing it with props.children.
 */

/**
 * we need to wrap our application in a style root element.
 * this is a component made available by Radium 
 * and whilst wrapping the export with radium is enough for its pseudo selectors,
 * for basically transforming selectors like media queries or other animations with keyframes.
 * 
 */

 // proptypes is a special property which you add to any JS object or any JS component object, that React will watch out for in development mode and give you a warning if you then pass in incorrect props.
 // you now define which props this component uses and which type of data each component should be of.
//if someone uses your component incorrectly, during development, they will get such a warning and then they can fix their error.
 Person.propTypes = {
    click: propTypes.func,
    name: propTypes.string,
    age: propTypes.number,
    changed: propTypes.func
 };

//export default Radium(person);
//export default person;
//export default Person;
export default withClass(Person, CssModules.Person); // The data is missing because what we're doing is we're taking our person component and right before we export it, we pass it into the withClass function.
// this withClass figure returns the functional component that wraps our person component,

/* 
// when using class-based components, it's this.props
class Person extends Component {
    render () {
        return <p>My name is {this.props}</p>;
    }
}
 */