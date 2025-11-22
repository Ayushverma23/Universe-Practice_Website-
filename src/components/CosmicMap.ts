const CosmicMap = () => {
    const sections = [
        { id: 'hero', label: 'Origin' },
        { id: 'timeline', label: 'Timeline' },
        { id: 'research', label: 'Breakthroughs' },
        { id: 'failures', label: 'Failures' },
        { id: 'future', label: 'Future' }
    ];

    const mapContainer = document.createElement('nav');
    mapContainer.id = 'cosmic-map';

    const ul = document.createElement('ul');
    mapContainer.appendChild(ul);

    sections.forEach(section => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = `#${section.id}`;
        a.dataset.target = section.id;

        const dot = document.createElement('span');
        dot.className = 'map-dot';

        const label = document.createElement('span');
        label.className = 'map-label';
        label.textContent = section.label;

        a.appendChild(label);
        a.appendChild(dot);
        li.appendChild(a);
        ul.appendChild(li);

        // Smooth scroll click handler
        a.addEventListener('click', (e) => {
            e.preventDefault();
            const targetElement = document.getElementById(section.id);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    document.body.appendChild(mapContainer);

    // Scroll Spy using Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: '-50% 0px -50% 0px', // Active when element is in middle of screen
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove active class from all
                document.querySelectorAll('#cosmic-map a').forEach(link => {
                    link.classList.remove('active');
                });

                // Add active class to current
                const activeLink = document.querySelector(`#cosmic-map a[data-target="${entry.target.id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        const element = document.getElementById(section.id);
        if (element) {
            observer.observe(element);
        }
    });
};

export default CosmicMap;
