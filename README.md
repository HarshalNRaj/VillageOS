# 🌾 VillageOS

> **Digital Rural AI Infrastructure & Public Services Platform for Indian Governance & Citizens**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-10B981?style=for-the-badge&logo=github&logoColor=white)](https://harshalnraj.github.io/VillageOS/)

---

## 🌟 Overview

**VillageOS** is an AI-powered digital operating system built to bridge the gap between rural citizens, agricultural governance, healthcare, education, and employment. Designed with modern glassmorphism aesthetics, fluid micro-animations, and full responsive layout, VillageOS empowers farmers, rural youth, women, and Panchayat officers with real-time digital services.

🌐 **Live Website Link**: [https://harshalnraj.github.io/VillageOS/](https://harshalnraj.github.io/VillageOS/)

---

## ✨ Key Features

### 🌾 Krishi AI (Crop Disease Diagnostics)
- **Neural Scan Simulation**: Upload photos of field crops to detect blights, fungal infections, and pest attacks.
- **Actionable Remedies**: Instant confidence scores, severity status, and step-by-step treatment recommendations.

### 📜 Scheme AI (Government Scheme Matcher)
- **Demographic Engine**: Evaluates age, gender, occupation, and annual income to filter matching public schemes.
- **Top Welfare Schemes**: PM Kisan Samman Nidhi, Ayushman Bharat PM-JAY, Kisan Credit Card (KCC), Pradhan Mantri Fasal Bima Yojana, and more.

### 💼 Employment & Skills Hub
- **Rural & Urban Job Listings**: Browse active vacancies across local sectors.
- **MGNREGA Work Portal**: 100 days guaranteed wage employment information.
- **PMKVY & Vocational Training**: Free skill development centers for rural youth.

### 🎓 Education & Digital Literacy
- **Free Learning Portals**: Direct integration with DIKSHA, SWAYAM, and NPTEL.
- **National Scholarships**: Up to ₹75,000/year assistance for SC/ST/OBC/minority students.
- **PMGDISHA**: Digital literacy training for adults in rural blocks.

### 🏥 Healthcare & Tele-Medicine
- **Emergency Services**: 108 Ambulance response details.
- **e-Sanjeevani Tele-Consultation**: Free online doctor appointments in regional languages.
- **Jan Aushadhi Kendras**: Affordable generic medicines (50-90% discount).

### 🔐 Glassmorphism Auth System
- **Sign In & Register Modals**: Dark glassmorphism styling with backdrop blur and smooth tab transitions.
- **Role-Based Profiles**: Support for Farmers, Citizens, Students, and Panchayat Officers.
- **1-Click Demo Login**: Quick-access button for hackathon presentations and instant live demos.
- **Persistent Storage**: Client-side state retention with animated Toast Notifications.

---

## 🛠️ Tech Stack

| Domain | Technology |
| :--- | :--- |
| **Frontend Framework** | React 18, Vite |
| **Styling & Theme** | Tailwind CSS, Custom Dark Mode, Glassmorphism CSS |
| **UI Components** | Lucide React Icons, Framer Motion Animations |
| **Backend Service** | Python, FastAPI, Uvicorn (Optional Local Server) |
| **Routing** | React Router v6 |
| **Deployment** | GitHub Actions & GitHub Pages |

---

## 📂 Project Structure

```
VillageOS/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AuthModal.jsx        # Animated Sign In / Create Account modal
│   │   │   ├── Sidebar.jsx          # Responsive Navigation & User Profile bar
│   │   │   └── ToastNotification.jsx# Animated feedback notifications
│   │   ├── context/
│   │   │   └── AuthContext.jsx      # Global User Auth & LocalStorage State
│   │   ├── pages/
│   │   │   ├── LandingPage.jsx      # Hero landing page
│   │   │   ├── Dashboard.jsx        # Main operational dashboard
│   │   │   ├── KrishiAI.jsx         # Crop disease detection page
│   │   │   ├── SchemeAI.jsx         # Government scheme matching page
│   │   │   ├── Education.jsx        # Learning & scholarship resources
│   │   │   ├── HealthCare.jsx       # Medical services & doctor consultations
│   │   │   ├── Livelihood.jsx       # Agricultural market prices & soil care
│   │   │   └── EmploymentHub.jsx    # Job opportunities & skill development
│   │   ├── App.jsx                  # Main routing & app provider setup
│   │   ├── main.jsx                 # Vite entry point
│   │   └── index.css                # Custom glassmorphism & Tailwind design system
│   ├── package.json
│   └── vite.config.js
├── backend/
│   ├── api/
│   │   ├── krishi_ai.py            # Crop detection API endpoints
│   │   └── scheme_ai.py            # Scheme matching API endpoints
│   ├── main.py                     # FastAPI backend application
│   └── requirements.txt
├── .github/
│   └── workflows/
│       └── deploy.yml               # Automated GitHub Pages CI/CD pipeline
└── README.md
```

---

## ⚡ How to Run Locally

### Prerequisites
- **Node.js** (v18 or higher) - [Download Node.js](https://nodejs.org/)
- **Git** - [Download Git](https://git-scm.com/)

### 1. Clone the Repository
```bash
git clone https://github.com/HarshalNRaj/VillageOS.git
cd VillageOS
```

### 2. Run the Frontend
```bash
cd frontend
npm install
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

### 3. (Optional) Run the Backend
```bash
cd backend
pip install -r requirements.txt
python -m uvicorn main:app --reload
```
The FastAPI server will start at `http://localhost:8000`. You can inspect the Swagger API docs at `http://localhost:8000/docs`.

---

## 🚀 Deployment (GitHub Pages)

VillageOS includes an automated CI/CD pipeline built with **GitHub Actions** (`.github/workflows/deploy.yml`). Any commit pushed to the `main` branch automatically triggers a build and deploys the static application to the `gh-pages` branch.

To deploy your own fork:
1. Go to **Repository Settings** > **Pages**.
2. Under **Build and deployment**, set Source to **Deploy from a branch**.
3. Select branch **`gh-pages`** and folder **`/ (root)`**, then click **Save**.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [Issues](https://github.com/HarshalNRaj/VillageOS/issues) page.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

<p align="center">
  Made with ❤️ by <b>Harshal Raj</b> • Dedicated to Digital Rural Empowerment 🌾
</p>
