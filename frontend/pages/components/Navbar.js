export default function Navbar() {
  return (
    <div>
      <nav class="navbar">
        <a href="#" class="logo">
          Logo
        </a>
        <div class="nav-links">
          <ul class="nav-menu">
            <li class="active">
              <a href="">Home</a>
            </li>
            <li>
              <a href="">Movies</a>
            </li>
            <li>
              <a href="">Series</a>
            </li>
            <li>
              <a href="">Books</a>
            </li>
            <li>
              <a href="">Login</a>
            </li>
          </ul>
        </div>
        <i class="bx bx-grid-alt menu-hamburger"></i>
      </nav>
    </div>
  );
}
