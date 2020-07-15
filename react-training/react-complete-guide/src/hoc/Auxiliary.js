import React from 'react';

const Auxiliary = props => props.children; // children is a special property that simply outputs whatever gets entered between the opening and closing tag of this component.

export default Auxiliary;

/**
 * only is outputs component
 * It is an empty wrapper using that special children property which React reserves for us,
 * so that really is a reserved property name, that react reserves for us and children will always refer
 * to the content between the opening and closing tag of your component.
 */