import { Link } from '@remix-run/react';

export function NavBar() {
  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/surveys/build">Build</Link>
      <Link to="/surveys">Respond</Link>
      <Link to="/surveys/results">Results</Link>
    </div>
  )
}