import { Link } from "react-router-dom";
import hogwartsCrest from "../assets/images/hogwarts-crest.png";

function Navbar() {
  return (
    <nav className="hp-navbar">
      <div className="nav-container">
        <section className="nav-side">
          <Link to="/" className="nav-item">
            Home
          </Link>
          <div className="nav-divider"></div>
          <Link to="/students" className="nav-item">
            Manage <br />
            Students
          </Link>
        </section>

        <section className="nav-logo">
          <article className="logo-inner">
            <img src={hogwartsCrest} alt="hogwartsCrest" />
          </article>
        </section>

        <section className="nav-side">
          <Link to="/houses" className="nav-item">
            Houses
          </Link>
          <div className="nav-divider"></div>
          <Link to="/favorites" className="nav-item">
            Favorites
          </Link>
        </section>
      </div>
      <div className="nav-glow-line"></div>
    </nav>
  );
}

export default Navbar;
