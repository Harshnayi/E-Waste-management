// Large Appliances Detection Logic

export const detectLargeAppliance = (imageData: string): string => {
    console.log("Analyzing image for Large Appliances...");

    const mockResults = [
        "Double Door Refrigerator",
        "Split AC Indoor Unit",
        "Front Load Washing Machine",
        "Electric Cooking Range"
    ];

    return mockResults[Math.floor(Math.random() * mockResults.length)];
};
