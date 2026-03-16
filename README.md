# E-Waste Locator

A high-fidelity, advanced e-waste management system designed to streamline the recycling process through AI-driven device identification and professional logistics mapping.

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm

### Installation

1. **Clone the repository**
   ```sh
   git clone <YOUR_REPOSITORY_URL>
   cd e-waste-locator
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Set up Environment Variables**
   Create a `.env` file in the root directory and add your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Start Development Server**
   ```sh
   npm run dev
   ```

## 🛠️ Technology Stack
- **Frontend**: React, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn-ui
- **Icons**: Lucide-React
- **Database/Auth**: Supabase
- **Backend Simulation**: custom Vite middleware (for CSV logging and image storage)

## 📁 Key Directories
- `/src`: Core application logic and components.
- `/src/pages`: Individual page views and workflows.
- `/recycle-logs`: Local CSV storage for recycling data.
- `/user-device-pics`: Local storage for device identification images.

## 📄 Documentation
For a detailed breakdown of the features, AI logic, and technical implementation, refer to:
- [report-elocator.md](file:///c:/Users/Nayi%20Harsh/OneDrive/Desktop/SAP/SIH-project/e-waste-locator-main/report-elocator.md)

## ⚖️ License
This project is for educational and environmental management purposes as part of the SIH-project initiative.
