function capitalizeWords(str) {
    return str
        .replace(/_/g, " ")
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}

function formatEnvironmental(env) {
    if (!env) return "<li>No environmental requirements listed.</li>";

    return `
        <li><strong>Minimum Sunlight Hours:</strong> ${env.min_sunlight_hours}</li>
        <li><strong>Maximum Sunlight Hours:</strong> ${env.max_sunlight_hours}</li>
        <li><strong>Soil Type:</strong> ${env.soil_type}</li>
        <li><strong>Minimum Rainfall (mm):</strong> ${env.min_rainfall_mm}</li>
        <li><strong>Maximum Rainfall (mm):</strong> ${env.max_rainfall_mm}</li>
        <li><strong>Minimum Temperature (°C):</strong> ${env.min_temp_c}</li>
        <li><strong>Maximum Temperature (°C):</strong> ${env.max_temp_c}</li>
    `;
}


function showPlantModal(data) {
    delete data.environmental.plant_id
    console.log(JSON.stringify(data.environmental))
    const environmentalDetails = formatEnvironmental(data.environmental);

    const tipsList = data.tips.length
        ? data.tips
            .map(tip => `<li><strong>${tip.tip_category}:</strong> ${tip.tip_text}</li>`)
            .join("")
        : "<li>No gardening tips available.</li>";

    const text = `
        <p><strong>Scientific Name:</strong> ${data.scientific_name}</p>
        <p><strong>Description:</strong> ${data.description}</p>
        <p><strong>Growing Season:</strong> ${data.season}</p>

        <u><h4>Environmental Requirements</h4></u>
        <ul>${environmentalDetails}</ul>

        <u><h4>Gardening Tips</h4></u>
        <ul>${tipsList}</ul>
    `;


    const modal = new Modal({
        type: "info",
        title: `${data.name}`,
        text: text,
        image: ""
    });

    modal.Show();
}
