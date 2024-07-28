import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="container">
      <h1>...Ooops! Something really bad has just happened!...</h1>
      <Link to="/">To main page</Link>
    </div>
  );
}

export default NotFound;
