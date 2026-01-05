import { AiFillGithub } from "react-icons/ai";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="hp-footer">
      <div className="footer-glow-line"></div>
      <section className="footer-container">
        <article>
          <Link
            to="https://github.com/pablovqueiroz"
            target="_blank"
            className="footer-link"
          >
            <AiFillGithub className="git-icon" />
            <p>Pablo Queiroz</p>
          </Link>
        </article>

        <article className="repo-link">
          <Link
            to="https://github.com/andresgonzalezperez/harry-potter-react-app"
            target="_blank"
            className="footer-link"
          >
            <AiFillGithub className="git-icon" />
            <p>REPOSITORY</p>
          </Link>
        </article>

        <article>
          <Link
            to="https://github.com/andresgonzalezperez"
            target="_blank"
            className="footer-link"
          >
            <AiFillGithub className="git-icon" />
            <p>Andres Gonzalez</p>
          </Link>
        </article>
      </section>
    </footer>
  );  
}

export default Footer;
