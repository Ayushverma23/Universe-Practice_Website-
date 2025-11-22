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
      gap: 2rem;
      max-width: 800px;
      margin: 0 auto;
    }

    .future-item {
      display: flex;
      align-items: center;
      gap: 2rem;
      background: rgba(255, 255, 255, 0.02);
      padding: 2rem;
      border-radius: 12px;
      border: 1px solid rgba(255, 255, 255, 0.05);
    }

    .icon-placeholder {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background: var(--secondary-color);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
      font-family: var(--font-heading);
      flex-shrink: 0;
      box-shadow: 0 0 20px rgba(74, 74, 138, 0.4);
    }

    .future-content h3 {
      color: #fff;
      margin-bottom: 0.5rem;
    }

    @media (max-width: 600px) {
      .future-item {
        flex-direction: column;
        text-align: center;
      }
    }
  `;
  document.head.appendChild(style);
}


