import { Redirect, Route } from "react-router"

export default function ProtectedRoute({ component: Component, tokenIsPresent, path, ...props }) {
  return(
    <Route path={path}>
      { tokenIsPresent ? <Component {...props} /> : <Redirect to='/sign-in' /> }
    </Route>
  )
}