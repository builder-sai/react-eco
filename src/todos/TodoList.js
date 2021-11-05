import React, { useEffect } from 'react';
import TodoListItem from './TodoListItem';
import NewTodoForm from './NewTodoFrom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { loadTodos, removeTodoRequest, markTodoAsCompletedRequest } from './thunks';
import { getCompletedTodos, getIncompleteTodos,
     getTodosLoading } from './selectors';

     //functions tag ``
const ListWrapper = styled.div`
max-width: 70%;
    margin: auto;
    `


const TodoList = ({completedTodos, incompletedTodos,
        onRemovePressed, onCompletedPressed, isLoading, startLoadingTodos}) => {
    useEffect(() => {
        startLoadingTodos()
    }, [])
    
    const loadingMessage = <div>Loading todos...</div>;
    const content = (
<ListWrapper>
    <NewTodoForm />
    <h3>Incompleted todos: </h3>
        {incompletedTodos.map(todo => 
            <TodoListItem
            todo={todo}
            onRemovePressed={onRemovePressed}
            onCompletedPressed={onCompletedPressed} />)}
    <h3>Completed todos:</h3>
            {completedTodos.map(todo => 
                <TodoListItem
                todo={todo}
                onRemovePressed={onRemovePressed} />)}
</ListWrapper>
);
return isLoading ? loadingMessage : content;
    };

const mapStateToProps = state =>({
    completedTodos: getCompletedTodos(state),
    incompletedTodos: getIncompleteTodos(state),
    isLoading: getTodosLoading(state)
});
const mapDispatchToProps = dispatch => ({
    onRemovePressed: id => dispatch(removeTodoRequest(id)),
    onCompletedPressed: id => dispatch(markTodoAsCompletedRequest(id)),
    startLoadingTodos: () => dispatch(loadTodos())
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);