//import React, { Component } from 'react'; 
import React, { PureComponent } from 'react'; 
import Person from './Person';

// PureComponent works just as before and result will be the same, but it just a normal component that already implements shouldComponentUpdate with a complete props check,
// so that checks for any changes in any prop of that component.
// So you can also just PureComponent instead of manually implementing this shouldComponentUpdate check.
class Persons extends PureComponent {
  // static getDerivedStateFromProps(props, state) {
  //   console.log('[Persons.js] getDerivedStateFromProps');
  //   return state;
  // }

  componentWillReceiveProps(props) {
    console.log('[Persons.js] componentWillReceiveProps', props);
/*  If you use this, It will triggers the messages below:
    
  Unsafe legacy lifecycles will not be called for components using new component APIs.
    App uses getDerivedStateFromProps() but also contains the following legacy lifecycles:
      componentWillMount
    The above lifecycles should be removed. Learn more about this warning here: */
  }

  // if you are checkign all properties like below, you can also not use shouldComponentUpdate but instead a different type of compoent: PureComponet
  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('[Persons.js] shouldComponentUpdate');
  //   if (nextProps.persons !== this.props.persons || 
  //       nextProps.changed !== this.props.changed || 
  //       nextProps.clicked !== this.props.clicked
  //     ) {
  //       return true;
  //     } else {
  //       return false;
  //     }
    // You have to return true if react should continue updating or false if it shouldn't.
    // of course you don't typically hardcode then in here but instead you add some condition
    // where you compare the curernt props to your next props, to the upcoming props to find out if they changed and if they changed, you want to permit this.
  //}

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('[Persons.js] getSnapshotBeforeUpdate');
    // Now after getSnapshotBeforeUpdate, render() will execute and I already have a login here,
    // then the render cycle or the update cycle of all child components of this component will execute,
    // so of all the person components in this case and thereafter, we'll have componentDidUpdate and componentDIdUpdate will run once we're done with all the updating.
    return { messages: 'Snapshot!' };
  }
  
  /* componentWillUpdate() {
     It was often used incorrectly and there for this is now also removed too
     but if you are seeign this in older projects, it was a hook that existed historically,
     that technically still could be used but that shouldn't be used anymore because you never really needed it.
   }*/

  // the most frequently used method you'll use when you need to fetch new data form a server. 
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('[Persons.js] componentDidUpdate');
    console.log(snapshot);
  }

  // if you have a live connection to some server or something like that, you can add componentWillUnmount()
  componentWillUnmount() {
    console.log('[Persons.js] componentWillUnmount');
    // you could have any code that needs to run right before the component is removed
  }

  render() {
    console.log('[Person.js] rendering....');
    //React does allow us to return an array of adjacent elements as long as all the items in there
    //have a key and that key is required so that React can efficiently update and reorder these elements
    //as it might be required by your app.
    return this.props.persons.map((person, index) => {
    return (
      <Person 
          click={() => this.props.clicked(index)}
          name={person.name} 
          age={person.age}
          key={person.id}
          changed={(event) => this.props.changed(event, person.id)}/>
    );
   });
  }
}
/* const persons = (props) => { 
  console.log('[Person.js] rendering....');
  return props.persons.map((person, index) => {
      return <Person 
        click={() => props.clicked(index)}
        name={person.name} 
        age={person.age}
        key={person.id}
        changed={(event) => props.changed(event, person.id)}/>
  });
}; */
//export default persons;
export default Persons;