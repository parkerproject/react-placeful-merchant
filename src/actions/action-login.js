export function loginUser ({email, password}) {
  // returning func gives us access to dispatch

  return function (dispatch) {}
  // submit email to server

  // if request is good, update state to indicate that user is authenticated

  // save the JWT token or set auth cookie via server

// if request is bad, show an error to user
}
