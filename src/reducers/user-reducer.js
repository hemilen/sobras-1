const defaultState = {
  users: [],
  user: {},
  loading: false,
  errors:[]
}

export default (state=defaultState, action={}) => {
  switch (action.type) {
    case 'FETCH_USERS_FULFILLED': {
      return {
        ...state,
        users: action.payload.data,
        loading: false,
        errors: []
      }
    }

    case 'FETCH_USERS_PENDING': {
      return {
        ...state,
        loading: true,
        errors: []
      }
    }

    case 'FETCH_USERS_REJECTED': {
      return {
        ...state,
        loading: false,
        errors: { global: action.payload.message }
      }
    }

    case 'NEW_USER': {
      return {
        ...state,
        user: {}
      }
    }

    case 'SAVE_USER_PENDING': {
      return {
        ...state,
        loading: true
      }
    }

    case 'SAVE_USER_FULFILLED': {
      return {
        ...state,
        users: [...state.users, action.payload.data],
        errors: [],
        loading: false
      }
    }

    case 'SAVE_USER_REJECTED': {
      const data = action.payload.response.data;
      // convert feathers error formatting to match client-side error formatting
      // const { "name.first":first, "name.last":last, phone, email } = data.errors;
      // const errors = { global: data.message, name: { first,last }, phone, email };
      // console.log(data);
      
      return {
        ...state,
        errors: data,
        loading: false
      }
    }

    case 'FETCH_USER_PENDING': {
      return {
        ...state,
        loading: true,
        user: {}
      }
    }

    case 'FETCH_USER_FULFILLED': {
      return {
        ...state,
        user: action.payload.data[0],
        errors: [],
        loading: false
      }
    }

    case 'UPDATE_USER_PENDING': {
      return {
        ...state,
        loading: true
      }
    }

    case 'UPDATE_USER_FULFILLED': {
      const user = action.payload.data;
      return {
        ...state,
        users: state.users.map(item => item.id === user.id ? user : item),
        errors: [],
        loading: false
      }
    }

    case 'UPDATE_USER_REJECTED': {
      const data = action.payload.response.data;
      const { "name.first":first, "name.last":last, phone, email } = data.errors;
      const errors = { global: data.message, name: { first,last }, phone, email };
      return {
        ...state,
        errors: errors,
        loading: false
      }
    }

    // case 'DELETE_USER_FULFILLED': {
    //   const _id = action.payload.data._id;
    //   return {
    //     ...state,
    //     users: state.users.filter(item => item._id !== _id)
    //   }
    // }

    default:
      return state;
  }
}
