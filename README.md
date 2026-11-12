# CampusPool – Modern College Carpooling Platform

> **"Your Campus. Your Route. Your Ride."**

CampusPool is a modern, responsive, premium-looking collegiate carpooling web application built with **React 18**, **TypeScript**, **Tailwind CSS**, and **React Router**. It is tailored exclusively for verified college students to coordinate daily campus commutes, weekend getaways, airport transfers, and train station shuttles safely and affordably.

---

## 🚀 Key Features

### 1. 🎓 Verified Student Community
- **.edu Email & Student ID Verification**: Badges indicating authenticated student credentials.
- **Safety Preferences**: Women-only ride filtering, peer trust ratings, and verified student profiles.
- **Campus Specific Corridors**: Stanford, UC Berkeley, SJSU, SFO Airport, Diridon Caltrain, and Silicon Valley Tech Park routes.

### 2. 🔍 Interactive Ride Search & Filtering
- Search by **Pickup Location**, **Destination**, **Travel Date**, and **Number of Seats**.
- Real-time filters:
  - Max price slider ($3 – $30)
  - Departure time slots (Morning, Afternoon, Evening, Night)
  - Student preference (All / Women-Only)
  - Vehicle type (Sedan, SUV, Electric / EV, Hatchback)
  - Instant Booking & Verified Driver toggles
  - Sort by earliest departure, price, or driver rating

### 3. 🚗 Offer a Ride (Driver Portal)
- Intuitive multi-step publishing form with live route landmarks, pickup notes, schedule, and luggage capacity.
- **Live Preview Card**: Instant visual feedback of how the ride card appears to other students while typing.
- **Smart Fare Split Recommendation**: Suggested gas contribution calculator based on campus distance.

### 4. 🗺️ Route Map Visualizer & Ride Details
- Dynamic SVG route schematic showing pickup point, intermediate stops, destination, travel time, and distance.
- Full driver dossier, vehicle specifications, passenger list, rules (music, luggage, pets, smoking), and peer reviews.
- Modal for booking seats with instant confirmation or driver approval requests.

### 5. 📊 Personalized Student Dashboard
- Real-time metrics: **Total Money Saved**, **Rides Shared**, **Student Trust Rating**, and **Campus CO2 Prevented**.
- **Interactive Tabs**:
  - Upcoming travel with status badges and driver contact details.
  - Rides offered with cancellation controls.
  - Passenger requests manager (1-click **Accept** or **Decline**).
  - Past trip history and receipts.
- **Environmental Impact Widget**: CO2 emissions saved and tree absorption equivalents.

### 6. 👤 Student Profiles & Multi-Persona Demo Switcher
- View university major, graduation year, verified badges, ratings, and vehicle details.
- Edit profile modal with instant persistence.
- **1-Click Demo Persona Switcher** in Navbar:
  - **Driver Persona (Ethan Cole)**: Tesla Model 3 driver, Stanford CS Senior.
  - **Passenger Persona (Maya Lin)**: UC Berkeley student commuter.

---

## 🛠️ Tech Stack & Design System

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS
- **Design Tokens**:
  - *Primary Navy*: `#14213D`
  - *Secondary Blue*: `#2563EB`
  - *Accent Green*: `#22C55E`
  - *Background Light Slate*: `#F8FAFC`
  - *Text Slate*: `#1E293B`
- **Typography**: Plus Jakarta Sans & Inter
- **Icons**: Lucide React
- **Architecture**: Decoupled service layer (`src/services/rideService.ts`, `src/services/authService.ts`) with `localStorage` persistence, easily swapped with a REST or GraphQL backend.

---

## 📦 Getting Started

### Install Dependencies
```bash
npm install
```

### Run Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build Production Bundle
```bash
npm run build
```
Generates an optimized production build in `/dist`.

