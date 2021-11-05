//to make assertion we need...
import { expect } from 'chai';
//and our reducer to be tested
import { todos } from '../reducers';

//now we create a describe block that will contain
//the tests for our todos reducer
//this is how mocha organizes it tests
describe('The todos reducer', () => {
    it('Adds a new todo when CREATE_TODO action is received',() =>{
        //in order for this to work we need 2 things
        //a fake/mock current state to pass to the first arg in our reducer
        //and a fake action with a payload to pass to the second argument
    const fakeTodo = { text: 'hello', isCompleted: false};
    const fakeAction = {
        //hardcoded type
        type: 'CREATE_TODO',
        payload: {todo : fakeTodo}
    };
       //now the mock original state that would be passed to the reducer
       const originalState = { isLoading: false, data:[]};
    
       const expected = {
           isLoading: false,
           data: [fakeTodo]
       };
       const actual = todos(originalState, fakeAction);

       expect(actual).to.deep.equal(expected);
    });
});