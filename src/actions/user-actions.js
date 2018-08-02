import { sobras } from './';

const url = '/rest/users';

export function fetchUsers(){
  return dispatch => {
    dispatch({
      type: 'FETCH_USERS',
      payload: sobras.get(url)
    })
  }
}


export function newUser() {
  return dispatch => {
    dispatch({
      type: 'NEW_USER'
    })
  }
}


export function saveUser(user) {
  return dispatch => {
    return dispatch({
      type: 'SAVE_USER',
      payload: sobras.post("/rest/user", user)
    })
  }
}

export function fetchUser(id) {
  return dispatch => {
    return dispatch({
      type: 'FETCH_USER',
      payload: sobras.get(`/rest/user/${id}`)
    })
  }
}

export function updateUser(user) {
  return dispatch => {
    return dispatch({
      type: 'UPDATE_USER',
      payload: sobras.put(`/rest/user`, user)
    })
  }
}

// export function deleteUser(_id) {
//   return dispatch => {
//     return dispatch({
//       type: 'DELETE_USER',
//       payload: sobras.delete(`${url}/${_id}`)
//     })
//   }
// }
