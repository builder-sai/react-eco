//create todo action whenever the user types into the 
//input and presses Create Todo btn
//start by creating constant for the actions type
export const CREATE_TODO = 'CREATE_TODO';

//if no payload is needed just export the type e.g.
//export const createTodo = { type: CREATE_TODO}
//but for the payload we would need to make a function
export const createTodo = todo => ({
    type: CREATE_TODO,
    payload: { todo }
});

//todos will be unique by text so we can remove by it
export const REMOVE_TODO = 'REMOVE_TODO';
export const removeTodo = todo => ({
    type: REMOVE_TODO,
    payload: { todo }
});

// export const MARK_TODO_AS_COMPLETED = 'MARK_TODO_AS_COMPLETED';
// export const markTodoAsCompleted = todo => ({
//     //will return en action with type
//     type: MARK_TODO_AS_COMPLETED,
//     //and a payload which as an obj with the id prop in it
//     payload: { todo }
// });
export const MARK_TODO_AS_COMPLETED = 'MARK_TODO_AS_COMPLETED';
export const markTodoAsCompleted = todo => ({
    type: MARK_TODO_AS_COMPLETED,
    payload: { todo },
});


export const LOAD_TODOS_IN_PROGRESS = 'LOAD_TODOS_IN_PROGRESS';
export const loadTodosInProgress = () => ({
    type: LOAD_TODOS_IN_PROGRESS
});

export const LOAD_TODOS_SUCCESS = 'LOAD_TODOS_SUCCESS';
//takes arg, the todos we are loading
export const loadTodosSuccess = todos => ({
    type: LOAD_TODOS_SUCCESS,
    payload: {todos}
});

export const LOAD_TODOS_FAILURE = 'LOAD_TODOS_FAILURE';
export const loadTodosFailure = () => ({
    type: LOAD_TODOS_FAILURE
});