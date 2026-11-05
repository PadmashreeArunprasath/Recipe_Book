import { Link } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
  return (
    <div className="not-found">
      <h1>404</h1>

      <h2>Oops! Recipe Not Found</h2>

      <p>
        Looks like this page is not on our menu.
        Let's get you back to something delicious!
      </p>

      <Link to="/" className="back-home-btn">
        Back to Home
      </Link>
    </div>
  );
}

export default NotFound;
