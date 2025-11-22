export default function Header() {
  const header = document.getElementById('main-header');
  if (!header) return;

  header.innerHTML = `
    <nav class="container">
      <div class="logo">COSMOS</div>
      <ul>
        <li><a href="#hero">Home</a></li>
        <li><a href="#timeline">Timeline</a></li>
        <li><a href="#research">Research</a></li>
        <li><a href="#failures">Failures</a></li>
        <li><a href="#future">Future</a></li>
      </ul>
    </nav>
  `;

  // Add styles for header
  const style = document.createElement('style');
  style.innerHTML = `
    #main-header {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 1000;
      padding: 1.5rem 0;
      background: rgba(5, 5, 5, 0.8);
      backdrop-filter: blur(10px);
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      transition: all 0.3s ease;
    }
    
    #main-header nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .logo {
      font-family: var(--font-heading);
      font-size: 1.5rem;
      font-weight: 700;
      letter-spacing: 2px;
      color: #fff;
    }

    #main-header ul {
      display: flex;
      list-style: none;
      gap: 2rem;
    }

    #main-header a {
      font-family: var(--font-body);
      font-size: 0.9rem;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: rgba(255, 255, 255, 0.7);
    }

    #main-header a:hover {
      color: var(--accent-color);
    }
  `;
  document.head.appendChild(style);
}
