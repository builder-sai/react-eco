import React, { useState } from 'react';
//let's connect our component to the store
import { connect } from 'react-redux';
import { addTodoRequest } from './thunks';
import styled from 'styled-components';
import { getTodos } from './selectors';




const NewTodoForm = ({ todos, onCreatePressed }) =>{
    const [inputValue, setInputValue] = useState("");
    
    return (
<NewTodoFormContainer>
    <NewTodoInput
        className="new-todo-input"
        type="text"
        placeholder="Type your new todo here"
        value={inputValue}
        onChange={e => setInputValue(e.target.value)} />
    <NewTodoButton
     onClick={()=> {
         //having the todos stored in the state we can check
         //so our new todo is not already there
        //using the array some to see if we already have the same text
            const isDuplicateText =
                todos.some(todo => todo.text === inputValue);
            if(!isDuplicateText){
                //create action to store with text
                onCreatePressed(inputValue);
                //empty the input
                setInputValue('');
            }
     }}>
         Create Todo
    </NewTodoButton>
</NewTodoFormContainer>
);
}

//connect()()
//args passed to the second set of parenthesis
//is the component we want to connecto to the redux store
//and connect would return a "connected" version of
//that component.
//---
//connect is a higher order func which means it
// takes two diff sets of args connect()()
//first set of () take the "mapStateToProps" and "mapDispatchToProps"

//mapStateToProps takes a state as an arg which
//is the entire redux state
//it takes (in arg) the state obj and return another obj
//containing parts of that state that our component needs access to
//component needs access to
const mapStateToProps = state =>({
    //return an obj with the prop todos, with the state of todos
    todos: getTodos(state)
    //new we need to add our todos state to the NewTodoForm props obj
    //so it can see the todos that are currently in the state
});
//similar to mapStateToProps as in the properties
//of the object that we return will be passed to our
//component as props _but_ instead of taking the
//redux state as an argument it takes a function (dispatch) that allows
//our components to trigger actions that our redux store would
//respond to
const mapDispatchToProps = dispatch =>({
    //here we want to trigger a redux action when someone clicks
    //the create todo btn (we need to import the createTodo action creator)
    //we will pass our props a component called onCreatePressed
    //it's a function that takes an arg text, calls dispatch and the
    //item we will be dispatching called createTodo passed with the text
    onCreatePressed: text => dispatch(addTodoRequest(text))
    //now we need to add onCreatePressed to our NewTodoForm props obj
    //so it can dispatch a new action to the store when  we want to
});
export default connect(mapStateToProps, mapDispatchToProps)(NewTodoForm);


const NewTodoFormContainer = styled.div`
border-radius: 8px;
    padding: 16px;
    text-align: center;
    box-shadow: 0 4px 8px grey;
`;
const NewTodoButton = styled.button`
font-size: 16px;
padding: 8px;
border: none;
border-radius: 8px;
outline: none;
cursor: pointer;
    margin-left: 8px;
    width: 20%;
    background-color: #22ee22;
`;
const NewTodoInput = styled.input`
font-size: 16px;
    padding: 8px;
    border: none;
    border-radius: 8px;
    outline: none;
    border-bottom: 2px solid #ddd;
    width: 70%;
    `;