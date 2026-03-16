// TVs & Displays Detection Logic

export const detectDisplay = (imageData: string): string => {
    console.log("Analyzing image for TVs & Displays...");

    const mockResults = [
        "OLED Smart TV",
        "LCD Gaming Monitor",
        "CRT Vintage Television",
        "4K Curved Display"
    ];

    return mockResults[Math.floor(Math.random() * mockResults.length)];
};
