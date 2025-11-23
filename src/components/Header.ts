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
      font-size: 1.8rem;
      font-weight: 700;
      letter-spacing: 2px;
      color: #fff;
      text-shadow: 0 0 10px rgba(191, 161, 95, 0.5);
      transition: text-shadow 0.3s ease;
    }

    .logo:hover {
      text-shadow: 0 0 20px rgba(191, 161, 95, 0.8), 0 0 40px rgba(191, 161, 95, 0.4);
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
      position: relative;
      padding-bottom: 5px;
    }

    #main-header a::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0;
      height: 2px;
      background: var(--accent-color);
      transition: width 0.3s ease;
      box-shadow: 0 0 10px var(--accent-color);
    }

    #main-header a:hover {
      color: #fff;
    }

    #main-header a:hover::after {
      width: 100%;
    }
  `;
  document.head.appendChild(style);
}
