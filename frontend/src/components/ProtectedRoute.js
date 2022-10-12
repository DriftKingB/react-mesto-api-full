import { Redirect, Route } from "react-router"

export default function ProtectedRoute({ component: Component, authToken, path, ...props }) {
  return(
    <Route path={path}>
      {authToken ? <Component {...props} /> : <Redirect to='/sign-in' />}
    </Route>
  )
}