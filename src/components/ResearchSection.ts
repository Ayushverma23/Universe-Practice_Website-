import { researchItems } from '../data';

export default function ResearchSection() {
  const section = document.getElementById('research');
  if (!section) return;

  section.innerHTML = `
    <div class="container">
      <h2>Major Research & Breakthroughs</h2>
      <div class="grid">
        ${researchItems.map(item => `
          <div class="card">
            <div class="card-image placeholder-image" data-image="${item.image}">
              <span>${item.title}</span>
            </div>
            <div class="card-content">
              <h3>${item.title}</h3>
              <div class="scientist">By ${item.scientist}</div>
              <p>${item.description}</p>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  const style = document.createElement('style');
  style.innerHTML = `
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2.5rem;
      margin-top: 3rem;
    }

    .card {
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid rgba(255, 255, 255, 0.05);
      border-radius: 12px;
      overflow: hidden;
      transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      position: relative;
      backdrop-filter: blur(5px);
    }

    .card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 100%);
      opacity: 0;
      transition: opacity 0.4s ease;
      pointer-events: none;
    }

    .card:hover {
      transform: translateY(-10px);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
      border-color: var(--accent-color);
    }

    .card:hover::before {
      opacity: 1;
    }

    .card-image {
      height: 220px;
      background: linear-gradient(135deg, #1a1a2e, #16213e);
      display: flex;
      align-items: center;
      justify-content: center;
      color: rgba(255, 255, 255, 0.4);
      position: relative;
      overflow: hidden;
    }
    
    .card-image::after {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: linear-gradient(to bottom right, transparent, rgba(255,255,255,0.1), transparent);
      transform: rotate(45deg);
      transition: transform 0.6s;
    }
    
    .card:hover .card-image::after {
      transform: rotate(45deg) translate(50%, 50%);
    }

    .card-content {
      padding: 2rem;
    }
    
    .card h3 {
      font-size: 1.4rem;
      margin-bottom: 0.5rem;
    }

    .scientist {
      color: var(--accent-color);
      font-style: italic;
      margin-bottom: 1.5rem;
      font-size: 0.95rem;
      display: flex;
      align-items: center;
    }
    
    .scientist::before {
      content: '';
      display: inline-block;
      width: 20px;
      height: 1px;
      background: var(--accent-color);
      margin-right: 10px;
    }
  `;
  document.head.appendChild(style);
}


