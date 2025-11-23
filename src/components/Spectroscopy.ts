export default function Spectroscopy() {
    const section = document.createElement('section');
    section.id = 'spectroscopy';
    section.className = 'spectroscopy-section';

    // Insert after Future Section
    const future = document.getElementById('future');
    if (future && future.parentNode) {
        future.parentNode.insertBefore(section, future.nextSibling);
    }

    section.innerHTML = `
        <div class="container">
            <h2>Stellar Spectroscopy</h2>
            <p class="instruction">Analyze the light from distant stars to determine their composition.</p>
            
            <div class="lab-bench">
                <div class="telescope-view">
                    <h3>Mystery Star</h3>
                    <div id="star-preview" class="star-preview"></div>
                    <div class="spectrum-display">
                        <label>Observed Spectrum:</label>
                        <div id="observed-spectrum" class="spectrum-bar"></div>
                    </div>
                </div>

                <div class="reference-library">
                    <h3>Element Reference</h3>
                    <div class="element-item" draggable="true" data-element="hydrogen">
                        <span>Hydrogen</span>
                        <div class="spectrum-bar hydrogen"></div>
                    </div>
                    <div class="element-item" draggable="true" data-element="helium">
                        <span>Helium</span>
                        <div class="spectrum-bar helium"></div>
                    </div>
                    <div class="element-item" draggable="true" data-element="carbon">
                        <span>Carbon</span>
                        <div class="spectrum-bar carbon"></div>
                    </div>
                    <div class="element-item" draggable="true" data-element="neon">
                        <span>Neon</span>
                        <div class="spectrum-bar neon"></div>
                    </div>
                </div>
            </div>

            <div class="analysis-controls">
                <p id="analysis-result">Drag elements to match the spectrum!</p>
                <button id="next-star">Next Star</button>
            </div>
        </div>
    `;

    // Data
    const elements = {
        hydrogen: 'linear-gradient(90deg, #000 0%, #000 15%, #f00 15.5%, #000 16%, #000 40%, #00ffff 40.5%, #000 41%, #000 70%, #0000ff 70.5%, #000 71%, #000 85%, #800080 85.5%, #000 86%)',
        helium: 'linear-gradient(90deg, #000 0%, #ff0000 10%, #000 11%, #ffff00 30%, #000 31%, #00ff00 50%, #000 51%, #0000ff 80%, #000 81%)',
        carbon: 'linear-gradient(90deg, #000 0%, #ff0000 20%, #000 21%, #ffff00 40%, #000 41%, #0000ff 60%, #000 61%)',
        neon: 'linear-gradient(90deg, #000 0%, #ff0000 5%, #ff0000 10%, #000 15%, #ff9900 30%, #000 35%, #00ff00 55%, #000 60%)'
    };

    const stars = [
        { name: "Star Alpha", composition: "hydrogen", color: "#aaddff" },
        { name: "Star Beta", composition: "helium", color: "#ffddaa" },
        { name: "Star Gamma", composition: "carbon", color: "#ffaa88" },
        { name: "Star Delta", composition: "neon", color: "#ff8888" }
    ];

    let currentStarIndex = 0;

    const loadStar = () => {
        const star = stars[currentStarIndex];
        const preview = document.getElementById('star-preview');
        const spectrum = document.getElementById('observed-spectrum');
        const result = document.getElementById('analysis-result');

        if (preview) {
            preview.style.backgroundColor = star.color;
            preview.style.boxShadow = `0 0 20px ${star.color}`;
        }

        if (spectrum) {
            spectrum.style.background = elements[star.composition as keyof typeof elements];
        }

        if (result) {
            result.textContent = "Identify the element matching this spectrum.";
            result.className = "";
        }
    };

    loadStar();

    document.getElementById('next-star')?.addEventListener('click', () => {
        currentStarIndex = (currentStarIndex + 1) % stars.length;
        loadStar();
    });

    // Interaction (Simple Click Match for now, drag/drop is complex without libraries)
    const elementItems = section.querySelectorAll('.element-item');
    elementItems.forEach(item => {
        item.addEventListener('click', () => {
            const selectedElement = item.getAttribute('data-element');
            const correctElement = stars[currentStarIndex].composition;
            const result = document.getElementById('analysis-result');

            if (result) {
                if (selectedElement === correctElement) {
                    result.textContent = "Correct! Analysis Confirmed.";
                    result.className = "success";
                } else {
                    result.textContent = "Incorrect. Spectrum mismatch.";
                    result.className = "error";
                }
            }
        });
    });

    // Styles
    const style = document.createElement('style');
    style.innerHTML = `
        .spectroscopy-section {
            padding: 4rem 0;
            background: rgba(0,0,0,0.3);
        }

        .lab-bench {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
            margin-top: 2rem;
        }

        .telescope-view, .reference-library {
            background: rgba(255, 255, 255, 0.05);
            padding: 2rem;
            border-radius: 12px;
            border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .star-preview {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            margin: 2rem auto;
            transition: all 0.5s;
        }

        .spectrum-bar {
            height: 40px;
            width: 100%;
            background: #000;
            margin-top: 0.5rem;
            border: 1px solid #555;
        }

        .hydrogen { background: ${elements.hydrogen}; }
        .helium { background: ${elements.helium}; }
        .carbon { background: ${elements.carbon}; }
        .neon { background: ${elements.neon}; }

        .element-item {
            margin-bottom: 1rem;
            cursor: pointer;
            transition: transform 0.2s;
        }

        .element-item:hover {
            transform: scale(1.02);
        }

        .element-item span {
            display: block;
            margin-bottom: 0.2rem;
            color: #aaa;
        }

        .analysis-controls {
            text-align: center;
            margin-top: 2rem;
        }

        #analysis-result {
            font-size: 1.2rem;
            margin-bottom: 1rem;
            min-height: 1.5em;
        }

        .success { color: #4caf50; font-weight: bold; }
        .error { color: #f44336; font-weight: bold; }

        #next-star {
            background: var(--accent-color);
            color: #000;
            border: none;
            padding: 0.8rem 2rem;
            border-radius: 4px;
            cursor: pointer;
            font-weight: bold;
        }

        @media (max-width: 768px) {
            .lab-bench {
                grid-template-columns: 1fr;
            }
        }
    `;
    document.head.appendChild(style);
}
