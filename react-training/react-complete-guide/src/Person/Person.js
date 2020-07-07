import React from 'react';
import './Person.css';

/* props is simply an object giving us access to all the attributes we pass to our own components.
But sometimes you don't want to get some information from outside but you want to have it inside a component and change it from inside there, too.
state property here is only available like this in components that extend components

two-way binding : propagate the change so that we can update the state
listen to the nameChangeHandler which updates the state --> pass down tghe value to the Person and age 
--> output the value to the input
*/

const person = (props) => {
    return (
    <div className="Person">
        <p onClick={props.click}>I'm {props.name} and I am {props.age} years old!</p>
        <p>{props.children}</p>
        <input type="text" onChange={props.changed} value={props.name}/>
    </div>
    )
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

export default person;

/* 
// when using class-based components, it's this.props
class Person extends Component {
    render () {
        return <p>My name is {this.props}</p>;
    }
}
 */