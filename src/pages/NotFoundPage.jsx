import { Link, NavLink } from "react-router";

function NotFoundPage() {
  return (
    <div className="not-found-container">
    <h1 className="favorites-title">404 NotFound</h1>
    <div  className="empty-list-container">

    <Link className="empty-list" to = "/"> 🔙 Home Page</Link>
    </div>
    </div>
  )
}

export default NotFoundPage