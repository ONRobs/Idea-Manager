export default function Navbar() {
  return (
        <nav className="nav">
            <a href="/" className="site-title bold-italic">Create an Idea</a>
            <ul>
                <li>
                    <a href="/rate">Rate</a>
                </li>
                <li>
                    <a href="/table">Table</a>
                </li>
            </ul>
        </nav>
        );
}