import './style.css'
import Header from './components/Header.ts'
import Hero from './components/Hero.ts'
import Timeline from './components/Timeline.ts'
import ResearchSection from './components/ResearchSection.ts'
import FailuresSection from './components/FailuresSection.ts'
import FutureSection from './components/FutureSection.ts'
import Footer from './components/Footer.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <header id="main-header"></header>
  <main>
    <section id="hero"></section>
    <section id="timeline"></section>
    <section id="research"></section>
    <section id="failures"></section>
    <section id="future"></section>
  </main>
  <footer id="main-footer"></footer>
`

// Initialize components after DOM is ready
Header();
Hero();
Timeline();
ResearchSection();
FailuresSection();
FutureSection();
Footer();

// Intersection Observer for fade-in animations
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
  observer.observe(section);
});
