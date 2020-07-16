import React from 'react';

/**
 * context is globally available Javascript object you could say
 * technically, it doesn't have to be an object. you could also have an array, string, a number etc. as a context value!
 * 
 * if I initialize my default value with everything I want to be able to access on this context from different context from different components in my app,
 * then I actually get better auto-completion from the IDE and that's the only reason and I don't care too much about that default value 
 */
const authContext = React.createContext({
    authenticated: false,
    login: () => {}
});

export default authContext;