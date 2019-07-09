# Testing and QA

As of March 2019 we are transitioning out of enzyme as our component testing library to instead use
`react-testing-library` which is more lightweight solution. 

## The Motivation

React has recently added some great new features, namely the __Hooks API__ and __Memoization__

Enzyme does not currently support these features and fails :( React testing library works out of the
box with these features.
> hurrah for no more finding npm plugins to patch a leaky testing library

## Ongoing development

There are MANY tests utilizing enzyme and obviously we cannot take on the task of re writing these
into react-testing-library all at once. For the time being only NEW tests will be based of this new framework. 

