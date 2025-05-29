let current = 1;
const total = 8; // Total number of sections/steps

function updateProgressBar() {
    for (let i = 1; i <= total; i++) {
        const indicator = document.getElementById(`step-indicator-${i}`);
        // IMPORTANT: Check the browser console if this console.warn appears!
        if (!indicator) {
            console.warn(`Progress indicator 'step-indicator-${i}' not found. Skipping.`);
            continue;
        }

        indicator.classList.remove('progress-step-completed', 'progress-step-current', 'border-violet-600', 'text-white', 'border-gray-300', 'text-gray-500'); // Clean all possible states
        indicator.innerHTML = i; // Reset to number first

        if (i < current) {
            indicator.classList.add('progress-step-completed', 'border-violet-600', 'bg-violet-600', 'text-white');
            indicator.innerHTML = '&#10003;'; // Unicode checkmark
        } else if (i === current) {
            indicator.classList.add('progress-step-current', 'border-violet-600', 'text-violet-600');
            indicator.innerHTML = `<div class="w-2 h-2 bg-violet-600 rounded-full mx-auto"></div>`; // mx-auto for centering
        } else {
            indicator.classList.add('border-gray-300', 'text-gray-500');
        }
    }
}

function showSection(n) {
    document.querySelectorAll('.section').forEach(div => {
        div.classList.remove('active');
        div.style.display = 'none'; // Ensure all sections are hidden
    });

    const targetSection = document.getElementById(`section-${n}`);
    // IMPORTANT: Check the browser console if this console.error appears!
    if (targetSection) {
        targetSection.classList.add('active');
        targetSection.style.display = 'block'; // Show the specific active section
    } else {
        console.error(`Section 'section-${n}' not found.`);
    }

    updateProgressBar();
}

function nextSection() {
    // Basic validation example: ensures current section is visible before attempting to move
    const currentSectionElement = document.getElementById(`section-${current}`);
    if (currentSectionElement && currentSectionElement.style.display !== 'block') {
        console.warn(`Attempted to move next from hidden section-${current}.`);
        return; // Don't proceed if current section isn't visible
    }

    if (current < total) {
        current++;
        showSection(current);
    }
}

function prevSection() {
    if (current > 1) {
        current--;
        showSection(current);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    showSection(current); // Show the first section on initial page load

    const predictForm = document.getElementById('predictForm');
    if (predictForm) {
        predictForm.addEventListener('submit', async function(event) {
            event.preventDefault();

            const formData = new FormData(predictForm);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });

            // Ensure all expected fields are present with default values if not explicitly set
            // These lines are critical if fields are in sections not currently displayed
            data.Chemotherapy_Received = data.Chemotherapy_Received || "No";
            data.Radiotherapy_Received = data.Radiotherapy_Received || "No";
            data.Surgery_Received = data.Surgery_Received || "No";
            data.Follow_Up_Adherence = data.Follow_Up_Adherence || "Good";
            data.Recurrence = data.Recurrence || "No";
            data.Time_to_Recurrence = data.Time_to_Recurrence || 0;
            data.Stage_at_Diagnosis = data.Stage_at_Diagnosis || "I";

            try {
                const response = await fetch('/predict', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`Error in request: ${response.status} - ${errorText}`);
                }

                const resultados = await response.json();
                sessionStorage.setItem('predictionResults', JSON.stringify(resultados));
                window.location.href = '/resultados';

            } catch (error) {
                console.error('Submission Error:', error);
                alert(`Ocorreu um erro ao processar a previsão: ${error.message}. Tente novamente.`);
            }
        });
    }
});