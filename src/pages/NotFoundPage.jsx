import { Link, NavLink } from "react-router";

function NotFoundPage() {
  return (
    <div className="not-found-container">
    <h1>404 NotFound</h1>
    <Link to = "/"> 🔙 Home Page</Link>
    </div>
  )
}

export default NotFoundPage