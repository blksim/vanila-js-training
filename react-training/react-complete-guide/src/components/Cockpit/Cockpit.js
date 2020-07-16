import React, { useEffect, useRef, useContext } from 'react'; 
// useEffect is second most important react hook you can use next to useState because useEffect
// useEffect basically combines the functionality or the use cases you can cover of all these class-based lifecycle hooks in one React hook here and both is called hook, it's actually not related. 
// this is not a lifecycle hook, it's a react hook. -> basically a function you can add into one of your functional components
import CssModule from './Cockpit.module.css';
import AuthContext from '../../context/auth-context'

const Cockpit = (props) => {
    const toggleBtnRef = useRef(null);
    const authContext = useContext(AuthContext); // you simply pass your context object like this, react will make the connection for you behind the scenes.
    console.log(authContext.authenticated);
    useEffect(() => { // you can add it anywhere here in your functional component body and useEffect as a default takes a function that will run for every render cycle.
   /* 
      useEffect()
      so this function I passed to useEffect and that's important, 
      you pass in a function here which doesn't take any arguments but it has to be a function,
      you pass a function to useEffect and this will execute for 'every render cycle' of the cockpit.
      when user inputs, cockpit re-rendered too because App.js includes cockpit.
      *re-render* sth means real DOM(X), virtual DOM(O)

      So useEffect runs here, it runs for every update and this means we can already use it for all the things
      we would have done in componentDidUpdate and indeed that is ok.
      If you need to send an HTTP request or anything like that in here, you can do that.
      It executed because it executes for every render cycle and that includes the first one.
      So it is *componentDidMount() and componentDidUpdate()* combined in one effect.

      Some hooks like *getDerivedStateFromProps()* is not included in here
      but you don't really need it because if you have props as an initial state into this, right?
      So you have that built into this because it is a functional component per definition,
      useEffect is for the other, more important and useful lifecycle hooks I'd say. 
      
      It can be tricky to use because it combines componentDidMount and componentDidUpdate.
      Now what if we were to send an HTTP request here but we only want to do that when the component is rendered for the first time and not for every re-render cycle.
      what would you do then?

      the second argument you pass to the callback is an array 
      where you simply point at all the variables or all the data that actually here
      */
     console.log('[Cockpigt.js] useEffect');
     toggleBtnRef.current.click(); // only after JSX was parsed and rendered for the first time, so That React did have a change of connecting your ref here.

     //  const timer = setTimeout(() => {
      //     alert('Saved data to cloud!');
      //   }, 1000);
        // setTimeout(() => {
        // alert('Saved data to cloud!');
        // }, 1000);
      return () => { // if you add return statement here, 
        // it runs BEFORE the main useEffect function runs,
        // but AFTER the (first) render cycle!
        // clearTimeout(timer);
        console.log('[Cockpit.js] cleanup work in useEffect');
      };
    }, [props.persons]); // So now this effect should only execute when our persons changed.

    // What if we now only want to execute this when the component renders the first time?
    // you can pass an 'empty' array as the second arugment.
    // This tells react this effects has no dependencies and it should rerun whenever one of the dependencies changes.
    // Now if you have no dependencies, they can never change and never rerun. it will run for the first time.
    // So if you just need componentDidMount, you would use useEffect with an empty array passed as a second argument to the useEffect function.
    // If you have a dependency on a certain field, you do hwat we did before, you pass that field in here

    // how to clean up ??
    // if you pass [] as the second argument to useEffect() => 처음 렌더됐을 때, 언마운트될 때만 콜백 호출됨.

    // canceled whenever the component re-renders.
    // so it's an extra bit of flexibility, that you have this cleanup function here
    // and you can either let this run when the component gets destroyed by passing an empty array as a second argument
    // or it runs on every update cycle with no argument or you pass a second argument which is an array that lists all that data 

    useEffect(() => {
      console.log('[Cockpigt.js] 2nd useEffect');
      return () => { // if you add return statement here, 
        // it runs BEFORE the main useEffect function runs,
        // but AFTER the (first) render cycle!
        console.log('[Cockpit.js] 2nd cleanup work in useEffect');
      };
    });
    const classes = []; 
    let btnClass = '';
    if (props.showPersons) {
        btnClass = classes.Red;
    }

    if (props.personsLength <= 2) { // classes = ['red']
      classes.push('red');
    } 
    if (props.personsLength <= 1) {
      classes.push('bold'); // classes = ['red' 'bold']
    }

    return (
        <div className={CssModule.Cockpit}>        
            <h1>{props.title}</h1>
            <p className={classes.join(' ')}>This is really working!</p>
            <button ref={toggleBtnRef} className={CssModule.Cockpit.Button} alt={props.showPerson} 
            onClick={props.clicked}>Toggle Persons</button>
            {/* <AuthContext.Consumer> */}
              {/* {context => <button onClick={context.login}>Log in</button>} */}
              <button onClick={authContext.login}>Log in</button>
            {/* </AuthContext.Consumer> */}
        </div>

    );
}

export default React.memo(Cockpit);
/* React.memo() uses memoization which is a technique where react will memoize,
so basically store a snapshot of this component and only if its input changes,
it will re-render it and otherwise if its input do not change
and some parent component wants to update this cockpit component,
react will give back that stored component.
it re-renders when its props change ---> personsLength

React memo is a great way of also getting optimization for your functional components and therefore 
It is a good idea to wrap functional components that might not need to update with every change
int he parent component with it. */