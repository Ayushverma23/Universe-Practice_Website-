import { futureResearch } from '../data';

export default function FutureSection() {
  const section = document.getElementById('future');
  if (!section) return;

  section.innerHTML = `
    <div class="container">
      <h2>The Future of Cosmology</h2>
      <div class="future-grid">
        ${futureResearch.map(item => `
          <div class="future-item">
            <div class="icon-placeholder" data-image="${item.image}">?</div>
            <div class="future-content">
              <h3>${item.title}</h3>
              <p>${item.description}</p>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  const style = document.createElement('style');
  style.innerHTML = `
    .future-grid {
      display: flex;
      flex-direction: column;
      gap: 2.5rem;
      max-width: 900px;
      margin: 0 auto;
    }

    .future-item {
      display: flex;
      align-items: center;
      gap: 3rem;
      background: rgba(5, 5, 20, 0.4);
      padding: 2.5rem;
      border-radius: 16px;
      border: 1px solid rgba(74, 74, 138, 0.2);
      transition: all 0.4s ease;
      position: relative;
      overflow: hidden;
    }
    
    .future-item::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 4px;
      height: 100%;
      background: var(--secondary-color);
      opacity: 0.5;
      transition: all 0.3s ease;
    }

    .future-item:hover {
      background: rgba(5, 5, 20, 0.6);
      border-color: var(--secondary-color);
      transform: translateX(10px);
      box-shadow: 0 0 30px rgba(74, 74, 138, 0.2);
    }
    
    .future-item:hover::before {
      opacity: 1;
      width: 6px;
      box-shadow: 0 0 15px var(--secondary-color);
    }

    .icon-placeholder {
      width: 90px;
      height: 90px;
      border-radius: 50%;
      background: rgba(74, 74, 138, 0.1);
      border: 2px solid var(--secondary-color);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2.5rem;
      font-family: var(--font-heading);
      flex-shrink: 0;
      box-shadow: 0 0 20px rgba(74, 74, 138, 0.2);
      transition: all 0.5s ease;
      color: #fff;
    }
    
    .future-item:hover .icon-placeholder {
      transform: rotate(360deg);
      background: var(--secondary-color);
      box-shadow: 0 0 40px rgba(74, 74, 138, 0.6);
    }

    .future-content h3 {
      color: #fff;
      margin-bottom: 0.8rem;
      font-size: 1.6rem;
    }
    
    .future-content p {
      color: rgba(255, 255, 255, 0.8);
    }

    @media (max-width: 768px) {
      .future-item {
        flex-direction: column;
        text-align: center;
        padding: 2rem;
        gap: 1.5rem;
      }
      
      .future-item::before {
        width: 100%;
        height: 4px;
        top: 0;
        left: 0;
      }
      
      .future-item:hover {
        transform: translateY(-5px);
      }
      
      .future-item:hover::before {
        width: 100%;
        height: 6px;
      }
    }
  `;
  document.head.appendChild(style);
}


