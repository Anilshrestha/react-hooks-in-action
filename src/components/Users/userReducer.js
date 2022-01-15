export default function userReducer (state, action) {
  switch(action.type) {
    case "SET_USER":
      return {
        ...state,
        userIndex: action.payload
      };

    case "FETCH_USERS_REQUEST":
      return {
        ...state,
        isLoading: true,
        error: false,
        users: []
      };
      
    case "FETCH_USERS_SUCCESS":
      return {
        ...state,
        isLoading: false,
        users: action.payload
      };
      
    case "FETCH_BOOKABLES_ERROR":
      return {
        ...state,
        isLoading: false,
        error:action.payload
      }  

    default:
      return state;  
  }
}