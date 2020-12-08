export const initialState = {
    
    user:null,
    update:null,
    id:null
   
    };

function reducer(state,action){
    console.log(action);
    switch(action.type){
         
        case "SET_CURRENT_USER":
                return{
                    ...state,
                    user:action.user, 
                };

        case "SET_EDIT":
            return{
                ...state,
                update:action.update,
                id:action.id,
            };
    
            
        default:
            return state;
    }
}

export default reducer;