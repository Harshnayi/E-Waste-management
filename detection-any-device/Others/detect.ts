// Others Detection Logic

export const detectMiscGadget = (imageData: string): string => {
    console.log("Analyzing image for Miscellaneous Gadgets...");

    const mockResults = [
        "Laser Printer",
        "Gaming Controller",
        "Smart Watch",
        "Wireless Router"
    ];

    return mockResults[Math.floor(Math.random() * mockResults.length)];
};
