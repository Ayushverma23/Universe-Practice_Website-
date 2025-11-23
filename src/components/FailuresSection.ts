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
      border-color: rgba(138, 74, 74, 0.2);
      position: relative;
    }

    .failure-card:hover {
      border-color: var(--fail-color);
      box-shadow: 0 0 20px rgba(138, 74, 74, 0.2);
      animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
    }

    .failure-image {
      background: linear-gradient(135deg, #2c0000, #4a0000);
      position: relative;
    }
    
    .failure-card:hover .failure-image::before {
      content: 'DISPROVEN';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(-15deg);
      font-size: 1.5rem;
      font-weight: bold;
      color: rgba(255, 0, 0, 0.5);
      border: 2px solid rgba(255, 0, 0, 0.5);
      padding: 5px 10px;
      letter-spacing: 2px;
    }

    .proponent {
      color: #aaa;
      font-size: 0.9rem;
      margin-bottom: 1rem;
      border-bottom: 1px dashed rgba(255, 255, 255, 0.1);
      padding-bottom: 0.5rem;
    }

    .intro-text {
      text-align: center;
      margin-bottom: 3rem;
      color: rgba(255, 255, 255, 0.6);
      font-size: 1.1rem;
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
    }
    
    @keyframes shake {
      10%, 90% { transform: translate3d(-1px, 0, 0); }
      20%, 80% { transform: translate3d(2px, 0, 0); }
      30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
      40%, 60% { transform: translate3d(4px, 0, 0); }
    }
  `;
  document.head.appendChild(style);
}


