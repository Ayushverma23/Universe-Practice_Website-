import { timelineEvents } from '../data';

export default function Timeline() {
  const section = document.getElementById('timeline');
  if (!section) return;

  section.innerHTML = `
    <div class="container">
      <h2>Cosmic Timeline</h2>
      <div class="timeline-container">
        ${timelineEvents.map((event, index) => `
          <div class="timeline-item ${index % 2 === 0 ? 'left' : 'right'}">
            <div class="content">
              <div class="date">${event.year}</div>
              <h3>${event.title}</h3>
              <p>${event.description}</p>
              <div class="placeholder-image" data-image="${event.image}">
                <span>Image: ${event.title}</span>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  const style = document.createElement('style');
  style.innerHTML = `
    #timeline {
      position: relative;
    }

    .timeline-container {
      position: relative;
      max-width: 1000px;
      margin: 0 auto;
    }

    .timeline-container::after {
      content: '';
      position: absolute;
      width: 2px;
      background-color: var(--accent-color);
      top: 0;
      bottom: 0;
      left: 50%;
      margin-left: -1px;
    }

    .timeline-item {
      padding: 10px 40px;
      position: relative;
      background-color: inherit;
      width: 50%;
      box-sizing: border-box;
    }

    .timeline-item.left {
      left: 0;
    }

    .timeline-item.right {
      left: 50%;
    }

    .timeline-item::after {
      content: '';
      position: absolute;
      width: 20px;
      height: 20px;
      right: -10px;
      background-color: var(--bg-color);
      border: 4px solid var(--accent-color);
      top: 15px;
      border-radius: 50%;
      z-index: 1;
    }

    .timeline-item.right::after {
      left: -10px;
    }

    .content {
      padding: 20px 30px;
      background-color: rgba(255, 255, 255, 0.05);
      position: relative;
      border-radius: 6px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      transition: transform 0.3s;
    }

    .content:hover {
      transform: scale(1.02);
      background-color: rgba(255, 255, 255, 0.08);
    }

    .date {
      color: var(--accent-color);
      font-weight: bold;
      margin-bottom: 0.5rem;
      font-family: var(--font-heading);
    }

    .placeholder-image {
      width: 100%;
      height: 150px;
      background: linear-gradient(45deg, #1a1a2e, #16213e);
      margin-top: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
      color: rgba(255, 255, 255, 0.3);
      font-size: 0.8rem;
    }

    @media screen and (max-width: 600px) {
      .timeline-container::after {
        left: 31px;
      }
      
      .timeline-item {
        width: 100%;
        padding-left: 70px;
        padding-right: 25px;
      }
      
      .timeline-item::after {
        left: 21px;
      }
      
      .timeline-item.right {
        left: 0%;
      }
    }
  `;
  document.head.appendChild(style);
}


