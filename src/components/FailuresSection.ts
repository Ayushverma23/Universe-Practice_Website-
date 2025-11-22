import { failedTheories } from '../data';

export default function FailuresSection() {
  const section = document.getElementById('failures');
  if (!section) return;

  section.innerHTML = `
    <div class="container">
      <h2>Failed Proofs & Theories</h2>
      <p class="intro-text">Science advances not just by success, but by disproving the incorrect.</p>
      <div class="grid">
        ${failedTheories.map(item => `
          <div class="card failure-card">
            <div class="card-image placeholder-image failure-image" data-image="${item.image}">
              <span>${item.title}</span>
            </div>
            <div class="card-content">
              <h3>${item.title}</h3>
              <div class="proponent">Proponent: ${item.proponent}</div>
              <p>${item.description}</p>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  const style = document.createElement('style');
  style.innerHTML = `
    .failure-card {
      border-color: rgba(138, 74, 74, 0.3);
    }

    .failure-card:hover {
      border-color: var(--fail-color);
    }

    .failure-image {
      background: linear-gradient(135deg, #480048, #C04848);
    }

    .proponent {
      color: #aaa;
      font-size: 0.9rem;
      margin-bottom: 1rem;
    }

    .intro-text {
      text-align: center;
      margin-bottom: 2rem;
      color: rgba(255, 255, 255, 0.6);
    }
  `;
  document.head.appendChild(style);
}


