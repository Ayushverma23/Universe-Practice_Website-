export default function Dashboard() {
    const section = document.createElement('section');
    section.id = 'dashboard';
    section.className = 'dashboard-section';

    // Insert after Hero, before Timeline
    const hero = document.getElementById('hero');
    if (hero && hero.parentNode) {
        hero.parentNode.insertBefore(section, hero.nextSibling);
    }

    section.innerHTML = `
        <div class="container">
            <h2>Live Cosmic Data</h2>
            <div class="dashboard-grid">
                <div class="data-card apod-card">
                    <h3>Astronomy Picture of the Day</h3>
                    <div id="apod-content" class="loading">Loading NASA Data...</div>
                </div>
                <div class="data-card stats-card">
                    <h3>Near Earth Objects (Today)</h3>
                    <div id="neo-count" class="stat-number">...</div>
                    <p>Asteroids passing nearby</p>
                </div>
                <div class="data-card stats-card">
                    <h3>Confirmed Exoplanets</h3>
                    <div id="exoplanet-count" class="stat-number">5,500+</div>
                    <p>Worlds beyond our sun</p>
                </div>
            </div>
        </div>
    `;

    // Helper to get cached data
    const getCachedData = (key: string) => {
        const cached = localStorage.getItem(key);
        if (!cached) return null;
        const { date, data } = JSON.parse(cached);
        const today = new Date().toISOString().split('T')[0];
        if (date === today) return data;
        return null;
    };

    // Helper to set cached data
    const setCachedData = (key: string, data: any) => {
        const today = new Date().toISOString().split('T')[0];
        localStorage.setItem(key, JSON.stringify({ date: today, data }));
    };

    // Fetch APOD
    const loadApod = async () => {
        const container = document.getElementById('apod-content');
        if (!container) return;

        const cached = getCachedData('nasa_apod');
        if (cached) {
            renderApod(cached, container);
            return;
        }

        try {
            const response = await fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY');
            if (!response.ok) throw new Error('API Error');
            const data = await response.json();
            setCachedData('nasa_apod', data);
            renderApod(data, container);
        } catch (err) {
            // Fallback content
            container.innerHTML = `
                <div class="apod-image" style="background-image: url('https://apod.nasa.gov/apod/image/2311/OrionBelt_AlHarbi_960.jpg')"></div>
                <p class="apod-title">The Belt of Orion (Offline Fallback)</p>
            `;
            container.classList.remove('loading');
        }
    };

    const renderApod = (data: any, container: HTMLElement) => {
        if (data.media_type === 'image') {
            container.innerHTML = `
                <div class="apod-image" style="background-image: url('${data.url}')"></div>
                <p class="apod-title">${data.title}</p>
            `;
        } else {
            container.innerHTML = `
                <div class="video-container">
                    <iframe src="${data.url}" frameborder="0" allowfullscreen></iframe>
                </div>
                <p class="apod-title">${data.title}</p>
            `;
        }
        container.classList.remove('loading');
    };

    // Fetch NEO (Near Earth Objects)
    const loadNeo = async () => {
        const container = document.getElementById('neo-count');
        if (!container) return;

        const cached = getCachedData('nasa_neo');
        if (cached) {
            container.textContent = cached;
            return;
        }

        try {
            const today = new Date().toISOString().split('T')[0];
            const response = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${today}&end_date=${today}&api_key=DEMO_KEY`);
            if (!response.ok) throw new Error('API Error');
            const data = await response.json();
            const count = data.element_count;
            setCachedData('nasa_neo', count);
            container.textContent = count;
        } catch (err) {
            container.textContent = '12'; // Fallback
        }
    };

    loadApod();
    loadNeo();

    // Styles
    const style = document.createElement('style');
    style.innerHTML = `
        .dashboard-section {
            padding: 4rem 0;
            background: linear-gradient(to bottom, rgba(0,0,0,0), rgba(10, 10, 30, 0.5), rgba(0,0,0,0));
        }

        .dashboard-grid {
            display: grid;
            grid-template-columns: 2fr 1fr 1fr;
            gap: 2rem;
            margin-top: 2rem;
        }

        .data-card {
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            padding: 1.5rem;
            backdrop-filter: blur(10px);
            transition: transform 0.3s;
        }

        .data-card:hover {
            transform: translateY(-5px);
            border-color: var(--accent-color);
        }

        .data-card h3 {
            color: var(--accent-color);
            margin-bottom: 1rem;
            font-size: 1.2rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            padding-bottom: 0.5rem;
        }

        .apod-card {
            grid-row: span 2;
        }

        .apod-image {
            width: 100%;
            height: 300px;
            background-size: cover;
            background-position: center;
            border-radius: 8px;
            margin-bottom: 1rem;
        }

        .video-container {
            position: relative;
            padding-bottom: 56.25%;
            height: 0;
            overflow: hidden;
            border-radius: 8px;
            margin-bottom: 1rem;
        }

        .video-container iframe {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }

        .apod-title {
            font-style: italic;
            color: rgba(255, 255, 255, 0.8);
        }

        .stat-number {
            font-size: 3.5rem;
            font-weight: 700;
            color: #fff;
            text-shadow: 0 0 20px rgba(191, 161, 95, 0.3);
            margin: 1rem 0;
        }

        .loading {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 200px;
            color: rgba(255, 255, 255, 0.5);
            font-style: italic;
        }

        @media (max-width: 900px) {
            .dashboard-grid {
                grid-template-columns: 1fr;
            }
        }
    `;
    document.head.appendChild(style);
}
