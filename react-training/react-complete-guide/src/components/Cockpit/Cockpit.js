import React from 'react';
import CssModule from './Cockpit.module.css';

const cockpit = (props) => {
    const classes = []; 
    let btnClass = '';
    if (props.showPersons) {
        btnClass = classes.Red;
    }

    if (props.persons.length <= 2) { // classes = ['red']
      classes.push('red');
    } 
    if (props.persons.length <= 1) {
      classes.push('bold'); // classes = ['red' 'bold']
    }

    return (
        <div className={CssModule.Cockpit}>        
            <h1>{props.title}</h1>
            <p className={classes.join(' ')}>This is really working!</p>
            <button className={CssModule.Cockpit.Button} alt={props.showPerson} 
            onClick={props.clicked}>Toggle Persons</button>
        </div>

    );
}

export default cockpit;