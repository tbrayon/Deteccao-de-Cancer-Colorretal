document.addEventListener('DOMContentLoaded', () => {
    const predictForm = document.getElementById('predictForm');
    if (predictForm) {
        predictForm.addEventListener('submit', async function(event) {
            event.preventDefault();

            const form = event.target;
            const formData = new FormData(form);
            const data = {};

            // Collect form data
            formData.forEach((value, key) => {
                data[key] = value;
            });

            // Add default values for treatment fields if not present in form
            // Ensure these match the defaults or logic in your Flask app
            if (!data.Chemotherapy_Received) data.Chemotherapy_Received = "No";
            if (!data.Radiotherapy_Received) data.Radiotherapy_Received = "No";
            if (!data.Surgery_Received) data.Surgery_Received = "No";
            if (!data.Follow_Up_Adherence) data.Follow_Up_Adherence = "Good"; // Example default
            if (!data.Recurrence) data.Recurrence = "No"; // Example default
            if (!data.Time_to_Recurrence) data.Time_to_Recurrence = 0; // Example default for numeric
            if (!data.Stage_at_Diagnosis) data.Stage_at_Diagnosis = "I"; // Example default


            try {
                const response = await fetch('/predict', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                if (!response.ok) {
                    throw new Error('Error in request: ' + response.statusText);
                }

                const resultados = await response.json();

                // Store the results in sessionStorage
                sessionStorage.setItem('predictionResults', JSON.stringify(resultados));

                // Redirect to the results page
                window.location.href = '/resultados';

            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred while processing the prediction. Please try again.');
            }
        });
    }

    // This part runs on the /resultados page
    const resultsContainer = document.getElementById('resultsContainer');
    if (resultsContainer) {
        const storedResults = sessionStorage.getItem('predictionResults');

        if (storedResults) {
            const results = JSON.parse(storedResults);
            console.log("Prediction Results:", results);

            let htmlContent = '<h2>Prediction Results</h2>';
            htmlContent += '<table border="1" style="width:100%; border-collapse: collapse;">';
            htmlContent += '<thead><tr><th>Strategy</th><th>Model</th><th>Combination</th><th>Probability of Survival</th></tr></thead>';
            htmlContent += '<tbody>';

            results.forEach(item => {
                const combinationStr = `Chemo: ${item.Combination.Chemotherapy_Received}, Radio: ${item.Combination.Radiotherapy_Received}, Surgery: ${item.Combination.Surgery_Received}`;
                htmlContent += `
                    <tr>
                        <td>${item.Strategy}</td>
                        <td>${item.Model}</td>
                        <td>${combinationStr}</td>
                        <td>${item.Probability}</td>
                    </tr>
                `;
            });
            htmlContent += '</tbody></table>';
            resultsContainer.innerHTML = htmlContent;

            // Clear sessionStorage after displaying, if results are meant for one-time display
            // sessionStorage.removeItem('predictionResults');

        } else {
            resultsContainer.innerHTML = '<p>No prediction results found. Please go back and submit the form.</p>';
            console.log("No prediction results found.");
            // Optionally, redirect back to the form page
            // window.location.href = '/';
        }
    }
});