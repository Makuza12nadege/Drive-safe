# 🚗 Drive Safe

> **GPS-Powered Roadside Assistance Platform · Kigali, Rwanda**

Drive Safe is a mobile application prototype that connects drivers stranded on the road with nearby verified garages and professional mechanics. Think of it like Uber — but for vehicle emergencies. You press a button, a mechanic comes to you.

[![React](https://img.shields.io/badge/React-18-blue?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?logo=tailwindcss)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-10-purple)](https://www.framer.com/motion)
[![Vite](https://img.shields.io/badge/Vite-5-yellow?logo=vite)](https://vitejs.dev)

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Then open `http://localhost:5173` in your browser.

---

## 🖥️ How the Simulator Works

The app runs as a **3-screen simulator** — all connected in real time:

| Screen | Role |
|--------|------|
| **Left** | Driver App (guest + registered) |
| **Middle** | Garage Operations Portal |
| **Right** | Mechanic Mobile App |

An action on one screen instantly updates the others. Use the **Start Auto-Demo** button at the top to watch the full journey run automatically, or interact manually.

---

## 📱 Screens & Features

### 1. Splash Screen

The first screen when the app opens. Shows for ~3 seconds then moves to the home screen automatically.

- Drive Safe logo (`src/Logo.png`)
- Custom SVG car illustration with orange wheel accents and a GPS pin
- Slogan: *"Reliable Vehicle Assistance Anytime, Anywhere."*
- Animated loading dots

📸 `[INSERT SCREENSHOT: screenshots/01-splash.png]`

---

### 2. Emergency Home Screen

The main screen. Designed for emergency use — **no login required** to ask for help.

- Large pulsing orange **REQUEST ROAD ASSISTANCE** button (main action)
- Live GPS location badge showing current location with green active dot
- Create Account / Login CTA section
- Help & Support footer (toll-free: **912**, verified garages badge)
- Login / Guest Mode toggle in top-right

📸 `[INSERT SCREENSHOT: screenshots/02-home.png]`

---

### 3. Vehicle Problem Selection

After pressing the emergency button the driver picks what is wrong with their car.

**7 problem cards:**
- 🔋 Battery problem
- 🔧 Flat tire
- 🚫 Car won't start
- ⚙️ Engine issue
- 🚨 Accident assistance
- ⛽ Out of fuel
- 🔍 Need inspection (I don't know)

Each card highlights orange when selected. Also includes:
- Extra details text box
- Vehicle photo upload
- "Find Garages" button (activates only after a problem is chosen)

📸 `[INSERT SCREENSHOT: screenshots/03-problems.png]`

---

### 4. Location Search Screen

The app scans for nearby verified garages after the driver selects their problem.

- Dark Kigali map with the driver's GPS pin at the center
- Animated radar rings pulsing outward
- Spinning search indicator — "Searching Kigali Verified Garages"
- Back arrow + Cancel button

📸 `[INSERT SCREENSHOT: screenshots/04-searching.png]`

---

### 5. Nearby Garages Screen

Shows all verified garages near the driver. The driver picks one and sends a request.

Each garage card shows:
- Logo, name, and **VERIFIED** badge
- ⭐ Rating and review count
- Distance in km
- Live mechanic availability — 🟢 green if free, 🔴 red if all on duty
- Services offered (as small tags)
- Estimated arrival time (ETA)
- **Request Assistance** button

> **If all mechanics are on duty:** a toast message blocks the request — *"All mechanics at [Garage] are currently on duty. Try another garage."*

📸 `[INSERT SCREENSHOT: screenshots/05-garages.png]`

📸 `[INSERT SCREENSHOT: screenshots/05b-onduty-toast.png]`

---

### 6. Service Tracking Screen

After sending the request, the driver sees a live map and a timeline of the job progress.

**Map area:**
- Driver's orange GPS pin (pulsing)
- Garage pin
- Mechanic's pin animating along the route toward the driver
- Back arrow + Cancel SOS button in floating header

**Mechanic assignment card** (once dispatched):
- Photo, name, garage, star rating
- Live ETA counter
- Call button (orange) + Message button

**Progress timeline — 7 stages:**
1. Request received
2. Garage accepted
3. Mechanic assigned
4. Mechanic on the way
5. Mechanic arrived
6. Vehicle diagnosed
7. Tow truck dispatched *(if car can't be repaired on-site)*

**If garage declines:** A full screen appears with the garage's name, explanation, and quick-pick cards to try the other 2 garages.

**Tow truck scenario:** A dark navy banner appears:
> *"🚛 Tow Truck on the Way! Your vehicle cannot be repaired on-site. A tow truck from [Garage] has been dispatched. Please stay with your vehicle."*

📸 `[INSERT SCREENSHOT: screenshots/06-tracking-map.png]`

📸 `[INSERT SCREENSHOT: screenshots/06b-timeline.png]`

📸 `[INSERT SCREENSHOT: screenshots/06c-tow-banner.png]`

📸 `[INSERT SCREENSHOT: screenshots/06d-declined.png]`

---

### 7. Service Completion Screen

After the mechanic closes the job, the driver rates their experience.

- Green checkmark + "Assistance Successful!"
- Summary card: mechanic photo, name, garage, problem solved
- 5-star rating system (tap 1–5 stars)
- Written review text box
- Submit Feedback button
- Account creation popup for guest users

📸 `[INSERT SCREENSHOT: screenshots/07-completion.png]`

---

### 8. Registered Driver Dashboard

For drivers with accounts. Manage profile, vehicle, and service history.

- Dark navy header: driver photo, name, phone, VIP badge, back arrow, logout
- **Vehicle card:** model, type, year, plate number
- **Quick SOS button:** orange card for fast emergency requests
- **Favorite Garages:** top 2 saved garages with rating and distance
- **Service History:** all past jobs with problem, garage, mechanic, date, rating, review
- **Notifications & Settings:** badge count and app version

📸 `[INSERT SCREENSHOT: screenshots/08-dashboard.png]`

---

### 9. Garage Dashboard

Professional operations portal for the garage team.

#### Header
- Garage logo, name, VERIFIED badge
- SOS Desk toggle (Online / Offline)

#### Floating Notification Toast
Every important event (new request, job completed, review received) slides down as a toast — with a message **specific to the garage**, not the driver.

#### 4 Tabs

**🚨 SOS Tab — Emergency Dispatch**
- Red pulsing badge on tab when a request arrives
- Driver card: photo, name, phone, vehicle + plate
- Problem card: problem type, GPS location, driver notes, vehicle photo
- **Accept** (orange) / **Decline** (grey) buttons
- After accepting: mechanic assignment list
  - 🟢 Available → "Assign" button shown
  - 🟠 On Duty → no button, labelled clearly
  - ⚫ Offline → no button, labelled clearly
- Working hours editor

**Tow Alert (when mechanic requests tow):**
- Driver name, vehicle, and location displayed
- Amber **"Confirm Tow Dispatch"** button
- After confirming → turns green: *"✓ Tow truck dispatched — En route"*

**👥 Team Tab**
- Full mechanic roster with live status dots
- 🟢 Available · 🟠 On Duty · ⚫ Offline

**📋 History Tab**
- All completed jobs: driver, plate, problem, mechanic, date, rating

**⭐ Reviews Tab**
- Rating bar chart (5→1 stars)
- Individual reviews with driver name, written comment, rating

📸 `[INSERT SCREENSHOT: screenshots/09-garage-sos.png]`

📸 `[INSERT SCREENSHOT: screenshots/09b-garage-assign.png]`

📸 `[INSERT SCREENSHOT: screenshots/09c-tow-confirm.png]`

📸 `[INSERT SCREENSHOT: screenshots/09d-garage-team.png]`

📸 `[INSERT SCREENSHOT: screenshots/09e-garage-notif.png]`

---

### 10. Mechanic Dashboard

Mobile app for the mechanic. When assigned to a job, they see the driver's full details, location, and step-by-step job controls.

#### Header
- Mechanic photo with live status dot
- Name + status (Available / On Duty / Job Active)
- Go Offline button

#### My Job Tab — Active Job

The screen is built around the **driver's location as the #1 priority:**

**Map section (tall):**
- Mechanic's pin animating toward the driver
- SOS job ID badge (top-left)
- Job status badge (top-right)

**Location bar (pinned to bottom of map):**
- 📍 Address: *"Kigali, Kiyovu — KN 3 Rd"*
- GPS coordinates: *"1.9462° S, 30.0612° E"*
- Orange **Navigate** button to open turn-by-turn directions

**Driver profile card:**
- Large photo, name, phone
- Vehicle model badge (orange) + plate badge (dark)
- 🟢 GPS Live indicator
- 📞 Call button (solid orange) + 💬 Message button

**Vehicle card:** Model, type, year

**Problem card:** Problem icon + name, driver's notes, incident photo

**Action buttons (bottom):**
1. "Start Journey (On the Way)"
2. "Mark as Arrived"
3. "Start Diagnostics"
4. "Complete Repair" → opens service report form (notes + photo + submit)
5. "Tow" (red) → requests tow truck if car can't be fixed on-site

#### Team Tab
- Full garage roster with live status dots and "You" badge on the active mechanic
- Status legend at bottom

📸 `[INSERT SCREENSHOT: screenshots/10-mechanic-job.png]`

📸 `[INSERT SCREENSHOT: screenshots/10b-driver-card.png]`

📸 `[INSERT SCREENSHOT: screenshots/10c-actions.png]`

📸 `[INSERT SCREENSHOT: screenshots/10d-report-form.png]`

---

## 🔔 Notifications — Role-Specific Messages

The driver and garage receive **completely different notifications** — each person only sees what is relevant to them.

### Driver receives:

| Event | Message |
|-------|---------|
| Request sent | "Your request has been dispatched to [Garage]. Stay with your vehicle." |
| Garage accepts | "[Garage] accepted your request and is assigning a mechanic." |
| Garage declines | "[Garage] is unable to take your call. Please select another garage." |
| Mechanic assigned | "[Mechanic] has been assigned to your case and is reviewing your vehicle details." |
| Mechanic en route | "[Mechanic] is heading to your location. ETA: [X] mins." |
| Mechanic arrived | "[Mechanic] has arrived. Please come meet him." |
| Diagnosing | "[Mechanic] is inspecting your [Vehicle] and running a full diagnostic." |
| Tow requested | "🚛 Your vehicle cannot be repaired on-site. A tow truck is on the way." |
| Service completed | "✅ [Mechanic] has successfully completed the service. Please rate." |
| Review submitted | "Thank you for your [X]-star review for [Garage]!" |

### Garage receives:

| Event | Message |
|-------|---------|
| New request | "🚨 Emergency call from [Driver] ([Vehicle] · [Plate]). Problem: [X]. At KN 3 Rd." |
| Request accepted | "You accepted the call. Please assign an available mechanic immediately." |
| Request declined | "You declined the request. Driver has been redirected to another garage." |
| Mechanic assigned | "[Mechanic] has been assigned to the job for [Driver]." |
| Mechanic en route | "[Mechanic] has left and is en route to KN 3 Rd." |
| Mechanic arrived | "[Mechanic] has arrived at the driver's location." |
| Diagnosing started | "[Mechanic] has begun diagnosing [Driver]'s [Vehicle]." |
| Job completed | "🔧 [Mechanic] has closed the job for [Driver]. Problem resolved. Mechanic now available." |
| Review received | "⭐⭐⭐⭐⭐ [Driver] rated the service [X]/5. '[Comment]'" |

📸 `[INSERT SCREENSHOT: screenshots/11-driver-notif.png]`

📸 `[INSERT SCREENSHOT: screenshots/11b-garage-notif.png]`

---

## 🔙 Back Navigation

Every screen has a way to go back without getting stuck:

| Screen | Back action |
|--------|------------|
| Problem Selection | ← Back to Home |
| Searching | ← Back to Problem Selection |
| Garages | ← Back to Problem Selection |
| Tracking | ← Back to Garages (in map header) |
| Completion | ← Back to Dashboard or Home |
| Registered Dashboard | ← Back to Home (top-left arrow) |

---

## 🎨 Color Theme

| Color | Hex | Used for |
|-------|-----|---------|
| **Dark Navy** | `#1e3a5f` | Headers, primary buttons, backgrounds |
| **Orange** | `#f97316` | Emergency button, active states, alerts |
| **White** | `#ffffff` | Card backgrounds, text on dark |
| **Slate Dark** | `#0f172a` | Garage and mechanic dashboard bg |
| **Emerald** | `#10b981` | Available status, success states |
| **Amber** | `#f59e0b` | Star ratings |

**Design principles:**
- Rounded cards (`rounded-2xl` / `rounded-3xl`)
- Color-matched shadows on buttons
- Pulsing animations on all live/active elements
- Emergency elements always use orange so the driver's eye goes there first
- All text on dark backgrounds is white or light grey for full readability

---

## 🗂️ Project Structure

```
Drive Safe/
├── public/
│   └── personal_p.jpg          # Profile photo
├── src/
│   ├── Logo.png                 # Drive Safe logo
│   ├── App.tsx                  # Root — shared state + all handlers
│   ├── data.ts                  # Garages, mechanics, history seed data
│   ├── types.ts                 # TypeScript interfaces
│   ├── index.css                # Global styles
│   ├── components/
│   │   ├── driver/
│   │   │   └── DriverApp.tsx    # All driver screens (Splash → Completion)
│   │   ├── garage/
│   │   │   └── GarageDashboard.tsx
│   │   ├── mechanic/
│   │   │   └── MechanicDashboard.tsx
│   │   └── shared/
│   │       └── MockMap.tsx      # Animated Kigali map with route + pins
└── DOCUMENTATION.md             # Full detailed documentation
```

---

## 🏪 Garages & Mechanics Data

### Garages

| Name | Distance | ETA | Services |
|------|----------|-----|---------|
| Kigali Auto Care | 1.2 km | 8 mins | Engine, Battery, Flat tire, Diagnostics |
| Nyabugogo Speedy Mechanics | 2.8 km | 14 mins | Flat tire, Fuel, Towing, Accident |
| Gikondo Car Clinic | 3.5 km | 18 mins | Engine, Battery, Inspection |

### Mechanics (9 total, 3 per garage)

| Garage | Mechanic | Default Status | Speciality |
|--------|----------|---------------|-----------|
| Kigali Auto Care | Olivier Ndizeye ⭐ 4.9 | Available | Diagnostics, Engine |
| Kigali Auto Care | Jean-Paul Habimana ⭐ 4.8 | **On Duty** | Flat tire, Brakes |
| Kigali Auto Care | Patrick Mugisha ⭐ 4.7 | Available | Battery, Fuel |
| Nyabugogo Speedy | Eric Nkurunziza ⭐ 4.7 | **On Duty** | Towing, Accident |
| Nyabugogo Speedy | Samuel Hakizimana ⭐ 4.6 | Available | Flat tire, Engine |
| Nyabugogo Speedy | Yves Nzabonimana ⭐ 4.5 | Offline | Towing |
| Gikondo Car Clinic | Cedric Mutabazi ⭐ 4.8 | **On Duty** | Diagnostics |
| Gikondo Car Clinic | Diane Uwimana ⭐ 4.9 | Available | Engine, Battery |
| Gikondo Car Clinic | Alain Bizimungu ⭐ 4.6 | Offline | Inspection |

---

## 🛠️ Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| React | 18 | UI framework |
| TypeScript | 5 | Type safety |
| Vite | 5 | Build tool and dev server |
| Tailwind CSS | 3 | Utility-first styling |
| Framer Motion | 10 | Animations and transitions |
| Lucide React | Latest | Icons |

---

## 📖 Adding Screenshots

1. Create a `screenshots/` folder inside the project root
2. Take screenshots of each screen from the running app
3. Save them with the names shown in the `[INSERT SCREENSHOT]` markers above
4. Replace each marker line with:

```markdown
![Screen Name](./screenshots/filename.png)
```

**Recommended screen sizes:** Capture the phone frame at full height (780px tall) for best results.

---

## 🔗 Repository

**GitHub:** `https://github.com/Makuza12nadege/Drive-safe`

---

*Drive Safe · Version 1.0 · June 2026 · Kigali, Rwanda*
*Built with Kiro AI*
