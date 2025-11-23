export interface ModalContent {
    title: string;
    description: string;
    image?: string;
    details?: string;
}

let modalContainer: HTMLElement | null = null;

const createModalDOM = () => {
    modalContainer = document.createElement('div');
    modalContainer.id = 'details-modal';
    modalContainer.className = 'modal-overlay';

    modalContainer.innerHTML = `
        <div class="modal-content">
            <button class="modal-close">&times;</button>
            <div class="modal-body">
                <h2 id="modal-title"></h2>
                <div id="modal-image-container"></div>
                <p id="modal-desc"></p>
                <div id="modal-details" class="details-text"></div>
            </div>
        </div>
    `;

    document.body.appendChild(modalContainer);

    // Close handlers
    const closeBtn = modalContainer.querySelector('.modal-close');
    closeBtn?.addEventListener('click', closeModal);

    modalContainer.addEventListener('click', (e) => {
        if (e.target === modalContainer) closeModal();
    });

    // Styles
    const style = document.createElement('style');
    style.innerHTML = `
        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(5px);
            z-index: 2000;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s ease;
        }

        .modal-overlay.open {
            opacity: 1;
            pointer-events: all;
        }

        .modal-content {
            background: rgba(10, 10, 20, 0.95);
            border: 1px solid var(--accent-color);
            border-radius: 12px;
            width: 90%;
            max-width: 800px;
            max-height: 90vh;
            overflow-y: auto;
            position: relative;
            transform: scale(0.9);
            transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            box-shadow: 0 0 50px rgba(191, 161, 95, 0.2);
        }

        .modal-overlay.open .modal-content {
            transform: scale(1);
        }

        .modal-close {
            position: absolute;
            top: 15px;
            right: 20px;
            background: none;
            border: none;
            color: #fff;
            font-size: 2rem;
            cursor: pointer;
            z-index: 10;
            transition: color 0.3s;
        }

        .modal-close:hover {
            color: var(--accent-color);
        }

        .modal-body {
            padding: 2rem;
        }

        #modal-title {
            font-size: 2.5rem;
            margin-bottom: 1.5rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            padding-bottom: 1rem;
        }

        #modal-image-container {
            width: 100%;
            height: 300px;
            background: #000;
            margin-bottom: 2rem;
            border-radius: 8px;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
            color: rgba(255, 255, 255, 0.3);
        }

        #modal-desc {
            font-size: 1.2rem;
            margin-bottom: 2rem;
            color: #fff;
        }

        .details-text {
            color: rgba(255, 255, 255, 0.8);
            line-height: 1.8;
            font-size: 1rem;
        }
        
        /* Scrollbar for modal */
        .modal-content::-webkit-scrollbar {
            width: 8px;
        }
        .modal-content::-webkit-scrollbar-track {
            background: rgba(0,0,0,0.5);
        }
        .modal-content::-webkit-scrollbar-thumb {
            background: var(--accent-color);
            border-radius: 4px;
        }
    `;
    document.head.appendChild(style);
};

export const openModal = (content: ModalContent) => {
    if (!modalContainer) createModalDOM();

    const title = document.getElementById('modal-title');
    const desc = document.getElementById('modal-desc');
    const details = document.getElementById('modal-details');
    const imgContainer = document.getElementById('modal-image-container');

    if (title) title.textContent = content.title;
    if (desc) desc.textContent = content.description;
    if (details) details.innerHTML = content.details || '';

    if (imgContainer) {
        imgContainer.innerHTML = '';
        if (content.image) {
            // In a real app, this would be an <img> tag
            imgContainer.innerHTML = `<div style="font-size: 3rem;">${content.image}</div>`;
            // Or if it's a placeholder key
            imgContainer.setAttribute('data-image', content.image);
        }
    }

    modalContainer?.classList.add('open');
};

export const closeModal = () => {
    modalContainer?.classList.remove('open');
};
