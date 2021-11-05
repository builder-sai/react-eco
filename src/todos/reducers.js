import {
    CREATE_TODO,
    REMOVE_TODO,
    MARK_TODO_AS_COMPLETED,
    LOAD_TODOS_IN_PROGRESS,
    LOAD_TODOS_SUCCESS,
    LOAD_TODOS_FAILURE
} from './actions';

//a reducer is just a function named after whatever
//resources in the redux store it is managing
//a reducer takes two args, state and an action
//how does reducers work?
//-Everytime, any action is fired on our application,
// our reducer will get called
//when this happens, two arguments that will get passed
//to our reducer are the currentstate of the resource the
//reducer is managing (here it will be an
//array of the current todos in our application)
//and the second arg is the action that was
//triggered, which is an object with type and payload props

//so what reducers do, they take the current state and the
// action that was triggered and decides what changes
// should happen to the satate as a result of this action
//reducer would then return the updated state and redux
//would take that return value and set the current state to that.
const initialState = { isLoading: false, data: []};
export const todos = (state = initialState, action) =>{
    const { type, payload } = action;

    switch(type){
        case CREATE_TODO: {
            const { todo } = payload;
            //and we return our array state +
            //this creation state added to the end
            //concat() does not mutate the array
            //very important not to mutate the sate because
            //it can result in some bugs from time to time.
            return {
                ...state,
                data: state.data.concat(todo)
            }

        }

        case REMOVE_TODO: {
            const { todo: todoToRemove } = payload;
            //to remove we filter out the removed text and 
            //return our state
            return {
                ...state, 
                data: state.data.filter(todo => todo.id !== todoToRemove.id)
            }
        }
        case MARK_TODO_AS_COMPLETED: {
            //alias/nickname to updatedTodo
            const {todo: updatedTodo } = payload;
            //to remove we filter out the removed text and 
            //return our state
             return {
                 ...state, 
                 data: state.data.map(todo => {
                 if(todo.id === updatedTodo.id){
                     return updatedTodo;
                 }
                 return todo;
             })
            }
        }
        case LOAD_TODOS_SUCCESS:{
            //we get the payload from the action at the begining of this func
            const { todos } = payload;
            //as we get all todos then we can replace the current state
            //with our newly fetched todos as the main state
            return {
                ...state,
                isLoading: false,
                data: todos
            };
        }
        case LOAD_TODOS_IN_PROGRESS:{
            return {
                ...state,
                isLoading: true
            }
        }
        case LOAD_TODOS_FAILURE:{
            return {
                ...state,
                isLoading: false
            }
        }
        default:
            //reducers get called on ANY action called in 
            //our application (bad?)
            // that's why we return the state as is in here
            return state;
    }  
}

