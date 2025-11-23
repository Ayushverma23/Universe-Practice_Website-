import { quizQuestions } from '../data';

export default function QuizSection() {
    const section = document.createElement('section');
    section.id = 'quiz';

    // Insert before footer
    const footer = document.getElementById('main-footer');
    if (footer && footer.parentNode) {
        footer.parentNode.insertBefore(section, footer);
    }

    let currentScore = 0;
    let answeredCount = 0;

    section.innerHTML = `
    <div class="container">
      <h2>Cosmic Knowledge Check</h2>
      <div class="quiz-container">
        ${quizQuestions.map((q, index) => `
          <div class="quiz-item" id="q-${index}">
            <div class="question">${index + 1}. ${q.question}</div>
            <div class="options">
              ${q.options.map((opt, optIndex) => `
                <button class="option-btn" data-q="${index}" data-opt="${optIndex}">${opt}</button>
              `).join('')}
            </div>
            <div class="feedback"></div>
          </div>
        `).join('')}
        <div class="quiz-result" id="quiz-result">
            <button id="calculate-score" class="submit-btn" disabled>Calculate Cosmic Rank</button>
            <div id="rank-display"></div>
        </div>
      </div>
    </div>
  `;

    // Add interactions
    const optionBtns = section.querySelectorAll('.option-btn');
    const submitBtn = document.getElementById('calculate-score') as HTMLButtonElement;
    const rankDisplay = document.getElementById('rank-display');

    optionBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const target = e.target as HTMLButtonElement;
            const qIndex = parseInt(target.getAttribute('data-q') || '0');
            const optIndex = parseInt(target.getAttribute('data-opt') || '0');
            const question = quizQuestions[qIndex];
            const parent = target.closest('.quiz-item');

            if (!parent || parent.classList.contains('answered')) return;

            // Mark as answered
            parent.classList.add('answered');
            answeredCount++;

            // Check answer
            if (optIndex === question.correct) {
                target.classList.add('correct');
                currentScore++;
                parent.querySelector('.feedback')!.innerHTML = '<span class="correct-text">Correct!</span>';
            } else {
                target.classList.add('wrong');
                const correctBtn = parent.querySelector(`.option-btn[data-opt="${question.correct}"]`);
                correctBtn?.classList.add('correct');
                parent.querySelector('.feedback')!.innerHTML = '<span class="wrong-text">Incorrect.</span>';
            }

            // Enable submit if all answered
            if (answeredCount === quizQuestions.length) {
                submitBtn.disabled = false;
                submitBtn.classList.add('ready');
            }
        });
    });

    submitBtn?.addEventListener('click', () => {
        if (!rankDisplay) return;

        let rank = "Space Tourist";
        let color = "#aaa";

        if (currentScore === 5) {
            rank = "Time Lord";
            color = "#bfa15f"; // Gold
        } else if (currentScore >= 3) {
            rank = "Galaxy Explorer";
            color = "#4ca1af"; // Blue
        }

        rankDisplay.innerHTML = `
      <div class="rank-card">
        <h3>Your Cosmic Rank</h3>
        <div class="rank-title" style="color: ${color}">${rank}</div>
        <p>Score: ${currentScore} / ${quizQuestions.length}</p>
      </div>
    `;

        rankDisplay.classList.add('visible');
        submitBtn.style.display = 'none';
    });

    const style = document.createElement('style');
    style.innerHTML = `
    .quiz-container {
      max-width: 800px;
      margin: 0 auto;
      background: rgba(255, 255, 255, 0.02);
      padding: 2rem;
      border-radius: 12px;
      border: 1px solid rgba(255, 255, 255, 0.05);
    }

    .quiz-item {
      margin-bottom: 2rem;
      padding-bottom: 2rem;
      border-bottom: 1px dashed rgba(255, 255, 255, 0.1);
    }

    .quiz-item:last-child {
      border-bottom: none;
    }

    .question {
      font-size: 1.2rem;
      margin-bottom: 1rem;
      color: #fff;
    }

    .options {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }

    .option-btn {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      padding: 1rem;
      color: rgba(255, 255, 255, 0.8);
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.3s;
      text-align: left;
    }

    .option-btn:hover:not(:disabled) {
      background: rgba(255, 255, 255, 0.1);
      border-color: var(--accent-color);
    }

    .quiz-item.answered .option-btn {
      cursor: default;
      pointer-events: none;
    }

    .option-btn.correct {
      background: rgba(76, 175, 80, 0.2);
      border-color: #4caf50;
      color: #fff;
    }

    .option-btn.wrong {
      background: rgba(244, 67, 54, 0.2);
      border-color: #f44336;
      color: #fff;
    }

    .feedback {
      margin-top: 1rem;
      font-weight: bold;
      height: 1.5rem;
    }

    .correct-text { color: #4caf50; }
    .wrong-text { color: #f44336; }

    .quiz-result {
      text-align: center;
      margin-top: 2rem;
    }

    .submit-btn {
      background: var(--accent-color);
      color: #000;
      border: none;
      padding: 1rem 2rem;
      font-size: 1.1rem;
      font-weight: bold;
      border-radius: 30px;
      cursor: pointer;
      opacity: 0.5;
      transition: all 0.3s;
    }

    .submit-btn.ready {
      opacity: 1;
      box-shadow: 0 0 20px rgba(191, 161, 95, 0.4);
    }

    .submit-btn.ready:hover {
      transform: scale(1.05);
      box-shadow: 0 0 30px rgba(191, 161, 95, 0.6);
    }

    .rank-card {
      background: rgba(0, 0, 0, 0.8);
      border: 2px solid var(--accent-color);
      padding: 2rem;
      border-radius: 12px;
      animation: popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    .rank-title {
      font-size: 2.5rem;
      font-family: var(--font-heading);
      margin: 1rem 0;
      text-transform: uppercase;
      letter-spacing: 2px;
      text-shadow: 0 0 20px currentColor;
    }

    @keyframes popIn {
      from { transform: scale(0.8); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }

    @media (max-width: 600px) {
      .options {
        grid-template-columns: 1fr;
      }
    }
  `;
    document.head.appendChild(style);
}
