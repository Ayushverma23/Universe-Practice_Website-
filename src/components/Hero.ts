export default function Hero() {
  const hero = document.getElementById('hero');
  if (!hero) return;

  hero.innerHTML = `
    <div class="hero-content">
      <h1>The History of the Universe</h1>
      <p>From the Big Bang to the End of Time</p>
      <div class="scroll-indicator">
        <span>Explore</span>
        <div class="arrow">↓</div>
      </div>
    </div>
    <div class="hero-bg"></div>
  `;

  const style = document.createElement('style');
  style.innerHTML = `
    #hero {
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      position: relative;
      overflow: hidden;
      padding-top: 80px; /* Header height */
    }

    .hero-content {
      z-index: 2;
      position: relative;
      background: rgba(0, 0, 0, 0.6);
      padding: 2rem 3rem;
      border-radius: 20px;
      backdrop-filter: blur(8px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      box-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
    }

    #hero h1 {
      font-size: 4rem;
      margin-bottom: 1rem;
      background: linear-gradient(to right, #fff, #bfa15f);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: fadeIn 2s ease-out;
    }

    #hero p {
      font-size: 1.5rem;
      color: rgba(255, 255, 255, 0.8);
      margin-bottom: 3rem;
      animation: fadeIn 2s ease-out 0.5s backwards;
    }

    .scroll-indicator {
      position: absolute;
      bottom: 2rem;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
      opacity: 0.7;
      animation: bounce 2s infinite;
    }

    .arrow {
      font-size: 1.5rem;
    }

    /* CSS-only Big Bang effect since image gen failed */
    .hero-bg {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 0;
      height: 0;
      border-radius: 50%;
      box-shadow: 
        0 0 100px 50px #fff,
        0 0 200px 100px #ffeb3b,
        0 0 300px 150px #ff9800,
        0 0 500px 250px #f44336,
        0 0 1000px 500px #3f51b5;
      z-index: 1;
      animation: bigBang 3s ease-out forwards;
    }

    @keyframes bigBang {
      0% {
        box-shadow: 0 0 0 0 #fff;
        opacity: 1;
      }
      100% {
        box-shadow: 
          0 0 100px 50px #fff,
          0 0 200px 100px #ffeb3b,
          0 0 300px 150px #ff9800,
          0 0 500px 250px #f44336,
          0 0 1000px 500px #3f51b5;
        opacity: 0.3;
      }
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @keyframes bounce {
      0%, 20%, 50%, 80%, 100% {transform: translateX(-50%) translateY(0);}
      40% {transform: translateX(-50%) translateY(-10px);}
      60% {transform: translateX(-50%) translateY(-5px);}
    }
  `;
  document.head.appendChild(style);
}


