import React from 'react';
// THe general concept is simply that you have component that wraps other components that adds something to it, that could be styling, that could be additional HTML structure around it or that could also
// be some logic and we'll add that logic later once we added HTTP request as I said, to automatically handle HTTP errors.
// const withCLass = props => (
//     <div className={props.classes}>
//         {props.children}
//     ></div>
// );

// This HOC has the purpose of adding a div with a certain CSS class around any element
// The withClass function takes the component and outputs it not before wrapping it into extra div that adds the CSS class.
const withCLass = (WrappedComponent, className) => {
    // first arg will actually be our wrapped component and you can name this whatever you want but it must start with a capital character because this will actually be a reference to a component 
    // second arg then is something that you need in your higher order component and of course that depends on which kind of higher order componentg you're creating and what your idea berhind the higher order component could be.
    return props => (
                <div className={className}>
            <WrappedComponent {...props} />   
        </div>
    );
    // the spread operator pulls out all the properties that are inside of this props object and distributes them 

};

export default withCLass;