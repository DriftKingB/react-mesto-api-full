import { Redirect, Route } from "react-router"

export default function ProtectedRoute({ component: Component, tokenIsValid, path, ...props }) {
  return(
    <Route path={path}>
      { tokenIsValid ? <Component {...props} /> : <Redirect to='/sign-in' /> }
    </Route>
  )
}