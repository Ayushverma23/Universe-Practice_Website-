export const timelineEvents = [
    {
        year: "13.8 Billion Years Ago",
        title: "The Big Bang",
        description: "The universe begins as an infinitely hot and dense point. Space itself expands faster than light (Inflation).",
        image: "big_bang",
        details: `
            <p>The <strong>Big Bang</strong> theory is the prevailing cosmological model for the universe from the earliest known periods through its subsequent large-scale evolution.</p>
            <p>Crucially, the Big Bang was not an explosion <em>in</em> space, but an explosion <em>of</em> space. At the moment of the singularity, all matter and energy were compressed into a point of infinite density.</p>
            <h3>Key Phases:</h3>
            <ul>
                <li><strong>Planck Epoch:</strong> The earliest period of time in the history of the universe, from zero to approximately 10<sup>-43</sup> seconds.</li>
                <li><strong>Inflationary Epoch:</strong> Space expanded by a factor of 10<sup>26</sup> in a fraction of a second.</li>
            </ul>
        `
    },
    {
        year: "380,000 Years After Big Bang",
        title: "Recombination",
        description: "The universe cools enough for protons and electrons to form neutral hydrogen atoms. The Cosmic Microwave Background (CMB) is released.",
        image: "cmb",
        details: `
            <p><strong>Recombination</strong> refers to the epoch during which charged electrons and protons first became bound to form electrically neutral hydrogen atoms.</p>
            <p>Before this, the universe was a hot, dense plasma of photons, electrons, and baryons. Photons were constantly scattered by free electrons, making the universe opaque (like a dense fog).</p>
            <p>When recombination occurred, the fog lifted, and light could travel freely. This light is what we observe today as the <strong>Cosmic Microwave Background (CMB)</strong> radiation.</p>
        `
    },
    {
        year: "400 Million Years After Big Bang",
        title: "First Stars Form",
        description: "Gravity pulls gas together to ignite the first stars, ending the 'Dark Ages'.",
        image: "first_stars",
        details: `
            <p>The <strong>Cosmic Dark Ages</strong> ended when the first stars, known as Population III stars, ignited.</p>
            <p>These stars were massive, luminous, and short-lived. They were composed almost entirely of hydrogen and helium, with virtually no "metals" (elements heavier than helium).</p>
            <p>Their intense ultraviolet light began to re-ionize the surrounding neutral hydrogen gas, leading to the <strong>Epoch of Reionization</strong>.</p>
        `
    },
    {
        year: "9 Billion Years After Big Bang",
        title: "Formation of Solar System",
        description: "Our Sun and planets form from a cloud of gas and dust.",
        image: "solar_system",
        details: `
            <p>Our solar system formed from the gravitational collapse of a giant interstellar molecular cloud.</p>
            <p>Most of the collapsing mass collected in the center, forming the <strong>Sun</strong>, while the rest flattened into a protoplanetary disk out of which the planets, moons, asteroids, and other small Solar System bodies formed.</p>
            <p>This process is known as the <strong>Nebular Hypothesis</strong>.</p>
        `
    }
];

export const researchItems = [
    {
        title: "General Relativity (1915)",
        scientist: "Albert Einstein",
        description: "Proposed that gravity is the curvature of spacetime caused by mass and energy. It predicted the expansion of the universe.",
        image: "relativity"
    },
    {
        title: "Hubble's Law (1929)",
        scientist: "Edwin Hubble",
        description: "Observed that galaxies are moving away from us, implying the universe is expanding.",
        image: "hubble"
    },
    {
        title: "Cosmic Microwave Background (1964)",
        scientist: "Penzias & Wilson",
        description: "Accidental discovery of the afterglow of the Big Bang, providing strong evidence for the theory.",
        image: "penzias_wilson"
    }
];

export const failedTheories = [
    {
        title: "Steady State Theory",
        proponent: "Fred Hoyle",
        description: "Proposed the universe has no beginning or end and creates matter as it expands. Disproven by the discovery of the CMB.",
        image: "steady_state"
    },
    {
        title: "Luminiferous Aether",
        proponent: "Various (19th Century)",
        description: "Hypothetical medium for light waves. Disproven by the Michelson-Morley experiment.",
        image: "aether"
    },
    {
        title: "Geocentric Model",
        proponent: "Ptolemy",
        description: "Earth is the center of the universe. Disproven by Copernicus, Galileo, and Kepler.",
        image: "geocentric"
    }
];

export const futureResearch = [
    {
        title: "Dark Energy & Dark Matter",
        description: "Understanding the 95% of the universe we can't see. What is driving the accelerated expansion?",
        image: "dark_matter"
    },
    {
        title: "The Multiverse",
        description: "Are there other universes with different physical laws? String theory suggests it's possible.",
        image: "multiverse"
    },
    {
        title: "The Big Freeze (Heat Death)",
        description: "The likely end of the universe where entropy reaches a maximum and all activity ceases.",
        image: "heat_death"
    }
];

export const quizQuestions = [
    {
        question: "How old is the universe?",
        options: ["4.5 Billion Years", "13.8 Billion Years", "100 Billion Years", "Infinite"],
        correct: 1
    },
    {
        question: "What is the Cosmic Microwave Background?",
        options: ["Light from the first stars", "Radiation from black holes", "Afterglow of the Big Bang", "Radio waves from aliens"],
        correct: 2
    },
    {
        question: "Who proposed the theory of General Relativity?",
        options: ["Isaac Newton", "Albert Einstein", "Galileo Galilei", "Stephen Hawking"],
        correct: 1
    },
    {
        question: "What is the most abundant element in the universe?",
        options: ["Helium", "Oxygen", "Carbon", "Hydrogen"],
        correct: 3
    },
    {
        question: "What is driving the accelerated expansion of the universe?",
        options: ["Dark Matter", "Dark Energy", "Gravity", "Supernovas"],
        correct: 1
    }
];
