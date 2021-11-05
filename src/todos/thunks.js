import {
    loadTodosInProgress,
    loadTodosSuccess,
    loadTodosFailure,
    createTodo,
    removeTodo,
    markTodoAsCompleted
} from './actions';


export const loadTodos = () => async (dispatch, getState) =>{
    try{
        //as soon as we fire this function we want to notify we are inprogess
        //using the dispatch argument that we have access to
        dispatch(loadTodosInProgress());
        
        const response = await fetch ('http://localhost:8080/todos');
        const todos = await response.json();
        
        //once we've loaded the todos we can dispatch the loadtodosSuccess
        dispatch(loadTodosSuccess(todos));
    } catch(e) {
        dispatch(loadTodosFailure());
        dispatch(displayAlert(e));
    }
}

export const addTodoRequest = text => async dispatch => {
    try{
        const body = JSON.stringify({ text });
        
        const response = await fetch('http://localhost:8080/todos', {
        headers:{
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body
    });
        const todo = await response.json();
        dispatch(createTodo(todo));
    } catch(e){
        dispatch(loadTodosFailure());
        //in real apps we don't really do this but this is just a POC
        dispatch(displayAlert(e));
    }
}
export const removeTodoRequest = id => async dispatch => {
    try {
        
        const response = await fetch(`http://localhost:8080/todos/${id}`, {
        headers:{
            'Content-Type': 'application/json'
        },
        method: 'DELETE'
    });
        const removedTodo = await response.json();
        dispatch(removeTodo(removedTodo));
    } catch(e){
        dispatch(loadTodosFailure());
        //in real apps we don't really do this but this is just a POC
        dispatch(displayAlert(e));
    }
}

export const markTodoAsCompletedRequest = id => async dispatch => {
    try {
        
        const response = await fetch(`http://localhost:8080/todos/${id}/completed`, {
        method: 'POST'
    });
    
        const updatedTodo = await response.json();
        dispatch(markTodoAsCompleted(updatedTodo));
    } catch(e){
        dispatch(loadTodosFailure());
        //in real apps we don't really do this but this is just a POC
        
        dispatch(displayAlert(e));
    }
}

export const displayAlert = msg => () => {
    alert(msg);
};

