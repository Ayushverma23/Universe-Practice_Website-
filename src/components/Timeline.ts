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
      padding: 4rem 0;
    }

    .timeline-container {
      position: relative;
      max-width: 1000px;
      margin: 0 auto;
      padding: 2rem 0;
    }

    .timeline-container::after {
      content: '';
      position: absolute;
      width: 4px;
      background: linear-gradient(to bottom, transparent, var(--accent-color), transparent);
      top: 0;
      bottom: 0;
      left: 50%;
      margin-left: -2px;
      box-shadow: 0 0 15px var(--accent-color);
      border-radius: 2px;
    }

    .timeline-item {
      padding: 10px 50px;
      position: relative;
      background-color: inherit;
      width: 50%;
      box-sizing: border-box;
    }

    .timeline-item.left {
      left: 0;
      text-align: right;
    }

    .timeline-item.right {
      left: 50%;
      text-align: left;
    }

    .timeline-item::after {
      content: '';
      position: absolute;
      width: 24px;
      height: 24px;
      right: -12px;
      background-color: var(--bg-color);
      border: 2px solid var(--accent-color);
      top: 20px;
      border-radius: 50%;
      z-index: 1;
      box-shadow: 0 0 10px var(--accent-color), inset 0 0 10px var(--accent-color);
      transition: all 0.3s ease;
    }

    .timeline-item.right::after {
      left: -12px;
    }
    
    .timeline-item:hover::after {
      background-color: var(--accent-color);
      box-shadow: 0 0 20px var(--accent-color), 0 0 40px var(--accent-color);
      transform: scale(1.2);
    }

    .content {
      padding: 30px;
      background-color: rgba(255, 255, 255, 0.03);
      backdrop-filter: blur(10px);
      position: relative;
      border-radius: 12px;
      border: 1px solid rgba(255, 255, 255, 0.05);
      transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    }

    .content:hover {
      transform: translateY(-5px) scale(1.02);
      background-color: rgba(255, 255, 255, 0.08);
      border-color: var(--accent-color);
      box-shadow: 0 15px 30px rgba(0,0,0,0.4), 0 0 20px rgba(191, 161, 95, 0.2);
    }

    .date {
      color: var(--accent-color);
      font-weight: 700;
      margin-bottom: 0.5rem;
      font-family: var(--font-heading);
      font-size: 1.1rem;
      letter-spacing: 1px;
    }
    
    .timeline-item h3 {
      margin-bottom: 1rem;
      font-size: 1.5rem;
    }

    .placeholder-image {
      width: 100%;
      height: 180px;
      background: linear-gradient(45deg, rgba(26, 26, 46, 0.8), rgba(22, 33, 62, 0.8));
      margin-top: 1.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 8px;
      color: rgba(255, 255, 255, 0.4);
      font-size: 0.9rem;
      border: 1px dashed rgba(255, 255, 255, 0.1);
      transition: all 0.3s ease;
    }
    
    .content:hover .placeholder-image {
      border-color: rgba(191, 161, 95, 0.3);
      background: linear-gradient(45deg, rgba(26, 26, 46, 0.9), rgba(22, 33, 62, 0.9));
    }

    @media screen and (max-width: 768px) {
      .timeline-container::after {
        left: 31px;
      }
      
      .timeline-item {
        width: 100%;
        padding-left: 80px;
        padding-right: 20px;
        text-align: left;
      }
      
      .timeline-item.left {
        text-align: left;
      }
      
      .timeline-item::after {
        left: 19px;
      }
      
      .timeline-item.right {
        left: 0%;
      }
      
      .timeline-item.right::after {
        left: 19px;
      }
    }
  `;
  document.head.appendChild(style);
}


