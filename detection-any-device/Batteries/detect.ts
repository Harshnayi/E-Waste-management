// Batteries Detection Logic

export const detectBattery = (imageData: string): string => {
    console.log("Analyzing image for Batteries...");

    const mockResults = [
        "Li-ion Battery Pack",
        "Lead Acid Car Battery",
        "AA Alkaline Pack",
        "Laptop Internal Battery"
    ];

    return mockResults[Math.floor(Math.random() * mockResults.length)];
};
