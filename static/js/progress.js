// /static/js/progress.js

document.addEventListener('DOMContentLoaded', () => {
    if (!document.getElementById('predictForm')) return;

    let currentSection = 1;
    const totalSections = 5;

    window.showSection = (sectionNumber) => {
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });
        const activeSection = document.getElementById(`section-${sectionNumber}`);
        if (activeSection) activeSection.classList.add('active');
        updateProgress(sectionNumber);
    };

    window.updateProgress = (currentStep) => {
        for (let i = 1; i <= totalSections; i++) {
            const indicator = document.getElementById(`step-indicator-${i}`);
            if (indicator) {
                indicator.classList.remove('progress-step-current', 'progress-step-completed');
                if (i < currentStep) indicator.classList.add('progress-step-completed');
                else if (i === currentStep) indicator.classList.add('progress-step-current');
            }
        }
    };
    
    window.validateCurrentSection = () => {
        const section = document.getElementById(`section-${currentSection}`);
        if (!section) return false;

        const inputs = section.querySelectorAll('input[required], select[required]');
        let firstInvalidField = null;

        section.querySelectorAll('.border-red-500').forEach(el => el.classList.remove('border-red-500', 'focus:ring-red-500'));

        for (const input of inputs) {
            if (!input.value) {
                input.classList.add('border-red-500', 'focus:ring-red-500');
                if (!firstInvalidField) firstInvalidField = input;
            } else {
                input.classList.remove('border-red-500', 'focus:ring-red-500');
            }
        }

        if (firstInvalidField) {
            const isSmallScreen = window.innerWidth < 640;
            const labelText = firstInvalidField.labels && firstInvalidField.labels[0] ? firstInvalidField.labels[0].textContent : 'um campo';
            const message = `Por favor, preencha o campo: "${labelText}"`;

            if (isSmallScreen) {
                alert(message);
            } else {
                showModal('Campo Obrigatório', message, true);
            }
            
            firstInvalidField.focus();
            return false;
        }
        return true;
    };

    window.nextSection = () => {
        if (!window.validateCurrentSection()) return;
        if (currentSection < totalSections) {
            currentSection++;
            window.showSection(currentSection);
        }
    };

    window.prevSection = () => {
        if (currentSection > 1) {
            currentSection--;
            window.showSection(currentSection);
        }
    };

    showSection(currentSection);
});