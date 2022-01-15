import {useEffect, useReducer, Fragment} from "react";
import userReducer from "./userReducer";
import Spinner from "../UI/Spinner";
import getData from "../../utils/api";

const initialState = {
  userIndex: 1,
  users: [],
  isLoading: true,
  error: false
}

export default function UsersList () {
  const [state, dispatch] = useReducer(userReducer, initialState);
  const {users, userIndex} = state;
  const {isLoading, error} = state;

  useEffect(() => {
    dispatch({type: "FETCH_USERS_REQUEST"});

    getData("http://localhost:3001/users")

      .then(users => dispatch({
        type: "FETCH_USERS_SUCCESS",
        payload: users
      }));
  }, []);

  const user = users?.[userIndex];

  function changeUser (selectedIndex) {
    dispatch({
      type: "SET_USER",
      payload: selectedIndex
    })
  }
  
  if(error) {
    return <p>{error.message}</p>
  }

  if (isLoading)
    return <p><Spinner/> Loading users...</p>

  return (
    <Fragment>
      <ul>
        {
          users.map((u, i) => (
            <li 
              key={u.id}
              className={i === userIndex ? "selected" : null}
            >
              <button
                onClick={() => changeUser(i)}
              >
                {u.name}
              </button>
            </li>
          ))
        }
      </ul>
      <div>
        {users && (
          <div className="item user">
            <div className="item-header">
              <h1>{user.name}</h1>
            </div>
            <div className="user-details">
              <p>{user.title}</p>
              <p>{user.notes}</p>
            </div>
          </div>
        )}
      </div>
    </Fragment>
  )
}