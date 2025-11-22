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
      gap: 2rem;
      margin-top: 2rem;
    }

    .card {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.05);
      border-radius: 8px;
      overflow: hidden;
      transition: transform 0.3s, box-shadow 0.3s;
    }

    .card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
      border-color: var(--accent-color);
    }

    .card-image {
      height: 200px;
      background: linear-gradient(135deg, #2c3e50, #4ca1af);
      display: flex;
      align-items: center;
      justify-content: center;
      color: rgba(255, 255, 255, 0.5);
    }

    .card-content {
      padding: 1.5rem;
    }

    .scientist {
      color: var(--accent-color);
      font-style: italic;
      margin-bottom: 1rem;
      font-size: 0.9rem;
    }
  `;
  document.head.appendChild(style);
}


