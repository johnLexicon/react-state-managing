import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const active = {
  color: 'purple'
};

export default function Header() {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">
              <img alt="Carved Rock Fitness" src="/images/logo.png" />
            </Link>
          </li>
          <li>
            <NavLink activeStyle={active} to="/products/shoes">
              Shoes
            </NavLink>
          </li>
          <li>
            <NavLink activeStyle={active} to="/cart">
              Cart
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
