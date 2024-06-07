import { Link } from '@remix-run/react';

export function NavBar() {
  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/surveys/build">Build</Link>
      <Link to="/surveys">View</Link>
    </div>
  )
}