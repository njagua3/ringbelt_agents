# Ringbelt Agents Limited - Real Estate & Asset Management

Ringbelt Agents Limited is a high-authority real estate and asset management platform designed to deliver premium property solutions in the Central Kenya market. Built with a focus on marketing, trust, and professional integrity, the website serves as both a public catalog and a sophisticated management workstation.

---

## 🏗️ Tech Stack

- **Frontend:** [React 19](https://react.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations:** [Framer Motion (motion/react)](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Backend/Database:** [Firebase Firestore](https://firebase.google.com/products/firestore)
- **Authentication:** [Firebase Auth](https://firebase.google.com/products/auth) (Local logic implementation)
- **State Management:** React Context API (Theming and Toasts)

---

## ✨ Key Features

### 🏢 Public Experience
- **Institutional Trust Bar:** Showcasing professional associations with major financial institutions (KCB, Equity, NCBA, etc.) to signal reliability.
- **Dynamic Property Portfolio:** A curated grid of apartments, commercial spaces, and student hostels with real-time availability filters.
- **Property Finder (Lead Magnet):** A dedicated acquisition request channel for high-intent clients looking for off-market opportunities.
- **Client Perspectives:** Authentic testimonials from verified property owners and investors.
- **Dark/Light Mode:** Seamless transition between themes to accommodate user preference.
- **WhatsApp Concierge:** Floating WhatsApp button for immediate lead conversion.

### 🛡️ Management Workstation (Admin Portal)
- **Asset Dashboard:** Real-time statistics on total assets, availability, and occupancy rates.
- **Full CRUD Operations:** Create, Update, and Delete property listings directly from the interface.
- **Status Toggling:** Quickly mark properties as "Available" or "Occupied."
- **Data Seeding:** Built-in tool to hydrate the database with professionally curated sample listings.
- **Authentication:** Secure login portal to protect administrative controls.

---

## 📂 Project Structure

```text
/src
 ├── components/     # Reusable UI elements (Navbar, Footer, Toast, etc.)
 ├── constants/      # Initial data and configuration (initialData.ts)
 ├── context/        # Global state (ThemeContext, ToastProvider)
 ├── lib/            # Utility functions (cn helper) and Firebase initialization
 ├── pages/          # Full-page components (Home, Properties, Services, Admin)
 ├── App.tsx         # Main routing and layout orchestration
 └── index.css       # Global styles and Tailwind v4 themes
```

---

## 🛠️ Configuration & Maintenance

### 1. Firebase Synchronization
To connect your live database:
-   Update `src/lib/firebase.ts` with your actual credentials from the [Firebase Console](https://console.firebase.google.com/).
-   Ensure **Email/Password** or **Google Auth** is enabled for the Admin Portal to function correctly.

### 2. Marketing Customization
To update global marketing data (logo names, initial properties, etc.):
-   **Initial Data:** Edit `src/constants/initialData.ts`.
-   **Location:** The Nyeri office location is embedded in `src/pages/Contact.tsx`.
-   **Testimonials:** Portraits and quotes can be refined in `src/pages/Home.tsx`.

### 3. Management Best Practices
-   **Seeding:** Use the "Seed Data" button in the Admin Console only once to populate the catalog. After seeding, use "New Asset" for manual entries.
-   **Availability:** Mark properties as "Occupied" instantly to remove them from the "Currently Available" count on the home page stats.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- Firebase Account (for database hooks)
- Google Maps API (or free embed code for location)

### Installation
1.  **Clone the project**
    ```bash
    git clone [repository-url]
    cd ringbelt-agents
    ```
2.  **Install dependencies**
    ```bash
    npm install
    ```
3.  **Run in development**
    ```bash
    npm run dev
    ```

---

## 🏆 Marketing & Authority Guidelines

This project has been optimized for **High-End Conversion**:
1.  **Transparency:** All pricing and availability are synchronized in real-time via the Admin Dashboard.
2.  **Authority:** Typography (Inter & Playfair Display) and the "Gold/Navy" color palette convey financial stability and professional heritage.
3.  **Lead Velocity:** The WhatsApp and Property Finder channels are prioritized for "one-click" client engagement.
4.  **Local Trust:** Imagery and testimonials have been specifically curated to feature African faces, reflecting the local demographic and Ringbelt's team pride.

---

## 📞 Support & Inquiries

**Ringbelt Agents Limited**
- **Head Office:** Umoja Chambers, Rm 4, Nyeri
- **Murang'a Branch:** Waguta Plaza
- **Email:** ringbelt2011@gmail.com
- **Core Pillars:** *Honesty • Integrity • Professionalism*
