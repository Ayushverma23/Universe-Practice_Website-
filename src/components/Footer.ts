export default function Footer() {
  const footer = document.getElementById('main-footer');
  if (!footer) return;

  const year = new Date().getFullYear();

  footer.innerHTML = `
    <div class="container">
      <p>&copy; ${year} History of the Universe. Created for educational purposes.</p>
      <p class="small">"The universe is under no obligation to make sense to you." - Neil deGrasse Tyson</p>
    </div>
  `;

  const style = document.createElement('style');
  style.innerHTML = `
    #main-footer {
      padding: 4rem 0;
      text-align: center;
      background: #000;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      margin-top: 4rem;
      color: rgba(255, 255, 255, 0.5);
      box-shadow: 0 -10px 30px rgba(0, 0, 0, 0.5);
      position: relative;
    }
    
    #main-footer::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 1px;
      background: linear-gradient(90deg, transparent, var(--secondary-color), transparent);
      opacity: 0.5;
    }

    #main-footer p {
      margin-bottom: 0.5rem;
    }

    .small {
      font-size: 0.8rem;
      font-style: italic;
    }
  `;
  document.head.appendChild(style);
}


