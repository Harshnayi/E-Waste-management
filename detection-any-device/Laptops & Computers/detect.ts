// Laptops & Computers Detection Logic

export const detectComputer = (imageData: string): string => {
    console.log("Analyzing image for Laptops & Computers...");

    const mockResults = [
        "MacBook Pro 14",
        "Dell XPS 15",
        "HP Spectre x360",
        "Lenovo ThinkPad X1"
    ];

    return mockResults[Math.floor(Math.random() * mockResults.length)];
};
