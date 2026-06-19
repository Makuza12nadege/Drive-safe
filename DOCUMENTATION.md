# Drive Safe — Project Documentation

**GPS-Powered Roadside Assistance Platform · Kigali, Rwanda**

---

## What is Drive Safe?

Drive Safe is a mobile application prototype that connects drivers who are stranded on the road with nearby verified garages and professional mechanics. It works like Uber but for vehicle emergencies — you press a button, a mechanic comes to you.

The prototype runs as a **simulator** with three phone screens side by side:
- Left → Driver App
- Middle → Garage Portal
- Right → Mechanic App

All three are connected in real time. An action on one screen immediately affects the others.

---

## Table of Contents

1. [Splash Screen](#1-splash-screen)
2. [Emergency Home Screen](#2-emergency-home-screen)
3. [Vehicle Problem Selection](#3-vehicle-problem-selection)
4. [Location Search Screen](#4-location-search-screen)
5. [Nearby Garages Screen](#5-nearby-garages-screen)
6. [Service Tracking Screen](#6-service-tracking-screen)
7. [Service Completion Screen](#7-service-completion-screen)
8. [Registered Driver Dashboard](#8-registered-driver-dashboard)
9. [Garage Dashboard](#9-garage-dashboard)
10. [Mechanic Dashboard](#10-mechanic-dashboard)
11. [Notifications System](#11-notifications-system)
12. [Back Navigation](#12-back-navigation)
13. [Color Theme & Design](#13-color-theme--design)

---

## 1. Splash Screen

**What it does:**
The first screen the driver sees when they open the app. It shows for about 3 seconds before moving to the home screen automatically.

**What is on it:**
- The Drive Safe logo (from `src/Logo.png`)
- A custom car illustration drawn with SVG — shows a side-view car with orange wheel accents and a GPS pin floating above it
- The slogan: *"Reliable Vehicle Assistance Anytime, Anywhere."*
- Three animated dots at the bottom showing the app is loading

📸 **[INSERT SCREENSHOT: Splash screen with logo, car illustration, and slogan]**

---

## 2. Emergency Home Screen

**What it does:**
This is the main screen. It is designed for **emergency use** — no login is required to ask for help. The screen is clean and simple so a driver in a stressful situation can find help in one tap.

**What is on it:**
- The Drive Safe logo and name at the top
- A **large orange pulsing button** in the center that says "REQUEST ROAD ASSISTANCE" — this is the main action
- A GPS location badge showing the driver's current location (Kigali, Kiyovu — KN 3 Rd) with a green "Active" dot
- A **Create Account / Login** section so drivers can sign up to save their history
- A **Help & Support** footer with a toll-free number (912) and a verified garages badge
- A Login/Guest Mode toggle button in the top-right corner

📸 **[INSERT SCREENSHOT: Home screen showing the large orange SOS button and GPS location badge]**

---

## 3. Vehicle Problem Selection

**What it does:**
After pressing the emergency button, the driver chooses what is wrong with their car. This helps the garage prepare the right mechanic and tools.

**What is on it:**
- Step indicator: "Step 1 of 3 · Emergency Details"
- A grid of 7 problem cards:
  - Battery problem
  - Flat tire
  - Car won't start
  - Engine issue
  - Accident assistance
  - Out of fuel
  - Need inspection (I don't know the problem)
- Each card has an icon, a name, and a short description
- When a card is selected it turns orange
- A text box to add extra details (e.g. "rear tyre flat on highway")
- A photo upload area to attach a picture of the vehicle problem
- A "Find Garages" button at the bottom that activates once a problem is chosen

📸 **[INSERT SCREENSHOT: Problem selection grid with one card selected in orange]**

📸 **[INSERT SCREENSHOT: Photo upload area with a sample tyre picture attached]**

---

## 4. Location Search Screen

**What it does:**
After the driver selects their problem, the app shows a live map scanning for nearby verified garages. This screen lasts about 2.5 seconds before showing the garage list.

**What is on it:**
- A dark map of Kigali with the driver's GPS pin in the center
- Animated radar rings pulsing outward from the driver's location
- A spinning search indicator with the message "Searching Kigali Verified Garages"
- A small back arrow and a Cancel button

📸 **[INSERT SCREENSHOT: Searching screen with radar animation and map]**

---

## 5. Nearby Garages Screen

**What it does:**
Shows all verified garages near the driver. The driver picks one and sends them a request for help.

**What is on it:**
- Step indicator: "Step 2 of 3 · Choose Provider"
- Cards for each garage showing:
  - Garage logo and name
  - A blue "VERIFIED" badge if the garage is verified
  - Star rating and number of reviews
  - Distance from the driver (in km)
  - A live mechanic availability badge — green if mechanics are free, red if all are on duty
  - The services the garage offers (as small tags)
  - Estimated arrival time (ETA)
  - A "Request Assistance" button

**Important behavior:**
- If all mechanics at a garage are currently on duty, a toast message appears saying "All mechanics at [Garage Name] are currently on duty. Try another garage." — the request is blocked.
- The availability indicator updates in real time as mechanics are assigned to jobs.

📸 **[INSERT SCREENSHOT: Nearby garages list showing 3 garage cards with ratings, distance, and ETA]**

📸 **[INSERT SCREENSHOT: On-duty toast message appearing at the top of the screen]**

---

## 6. Service Tracking Screen

**What it does:**
After the driver sends a request to a garage, this screen shows a live map and a timeline of the job progress. The driver can track exactly what is happening in real time.

**What is on it:**
- A live map showing:
  - The driver's GPS pin (orange, pulsing)
  - The garage pin
  - The mechanic's pin moving along the route toward the driver
- A floating header bar showing the garage name and a Cancel SOS button and a back arrow
- A mechanic assignment card (once a mechanic is dispatched):
  - Mechanic's photo, name, garage name, star rating
  - ETA counter (updating as they get closer)
  - Call button (orange) and Message button
- A **progress timeline** showing all 7 stages:
  1. Request received
  2. Garage accepted
  3. Mechanic assigned
  4. Mechanic on the way
  5. Mechanic arrived
  6. Vehicle diagnosed
  7. Tow truck dispatched *(if vehicle cannot be repaired on-site)*
- The active step pulses in orange; completed steps are shown in navy
- **If the garage declines:** A full "Request Declined" screen appears showing the garage name, an explanation, and quick-pick buttons to send the request to the other 2 garages instead

**Tow truck scenario:**
If the mechanic determines the car cannot be fixed on-site, they press "Tow" on their screen. The driver sees a dark navy banner saying:

> *"🚛 Tow Truck on the Way! Your vehicle cannot be repaired on-site. A tow truck from [Garage Name] has been dispatched to tow your car to the workshop. Please stay with your vehicle."*

📸 **[INSERT SCREENSHOT: Tracking screen showing live map with mechanic pin moving]**

📸 **[INSERT SCREENSHOT: Progress timeline with 3 steps completed and the 4th (en route) active in orange]**

📸 **[INSERT SCREENSHOT: Tow truck banner in dark navy on the driver's screen]**

📸 **[INSERT SCREENSHOT: Request declined screen showing alternative garages]**

---

## 7. Service Completion Screen

**What it does:**
After the mechanic closes the job, the driver lands on a completion screen where they can rate the service.

**What is on it:**
- A green checkmark icon and the heading "Assistance Successful!"
- A summary card showing the mechanic's photo, name, garage name, and problem solved
- A **5-star rating system** — the driver taps 1 to 5 stars
- A text box to write a review
- A "Submit Feedback" button
- After submitting: if the driver is not registered, a popup encourages them to create an account to save their history and get faster help in future

📸 **[INSERT SCREENSHOT: Completion screen with 5-star rating and review box]**

---

## 8. Registered Driver Dashboard

**What it does:**
For drivers who have created an account, this dashboard lets them manage their profile, vehicle, and past service history.

**What is on it:**
- A dark navy header with:
  - Back arrow (top-left)
  - Driver photo, name, phone number, and a "VIP" badge
  - Drive Safe logo and a logout button (top-right)
- **Registered Vehicle card** showing car model, type, year, and plate number
- **Emergency SOS button** — a quick orange card so registered drivers can also request help fast
- **Favorite Garages** — the 2 most-used garages saved with rating and distance
- **Service History** — a list of past jobs with:
  - Problem type
  - Garage and mechanic name
  - Date and time
  - Star rating and written review
- **Notifications & Settings** — a 2-column grid showing notification count and app version

📸 **[INSERT SCREENSHOT: Registered dashboard showing vehicle card, SOS button, and service history]**

---

## 9. Garage Dashboard

**What it does:**
A professional operations dashboard for the garage team. They can see incoming emergency calls, manage mechanics, view job history, and read customer reviews.

**What is on it:**

### Header
- Garage logo, name, and VERIFIED badge
- SOS Desk toggle switch (Online / Offline)
- Drive Safe logo

### Floating Notification Toast
Every time something important happens (new request arrives, job completed, review submitted), a notification slides down from the top of the screen with the relevant message specific to the garage.

### 4 Tabs

**SOS Tab (Emergency Dispatch):**
- When a driver sends a request: a red pulsing badge appears on the tab
- The screen shows:
  - Status badge (INCOMING EMERGENCY REQUEST → ACTIVE ASSISTANCE JOB)
  - Driver card: photo, name, phone, vehicle model and plate
  - Problem card: reported problem, GPS location, driver's notes, vehicle photo
  - **Accept** (orange) and **Decline** (grey) buttons
  - Once accepted: a list of mechanics to choose from — each showing name, photo, rating, and live status
  - Mechanics who are **Available** get an "Assign" button
  - Mechanics who are **On Duty** or **Offline** have no button and are clearly labelled
  - Working hours editor at the bottom

**Tow Alert:**
When the mechanic requests a tow truck, the SOS tab shows:
- A dark card with the driver's name, vehicle, and location
- A bright amber "Confirm Tow Dispatch" button
- After pressing: changes to a green "✓ Tow truck dispatched — En route to driver location"

**Team Tab:**
- A full roster of all mechanics at the garage
- Each mechanic card shows: photo, name, phone, rating, jobs completed
- A live status dot:
  - 🟢 Green pulse = Available
  - 🟠 Orange pulse = On Duty (not available)
  - ⚫ Grey = Offline

**History Tab:**
- A list of all completed jobs at this garage
- Each entry shows: driver name, plate, problem type, mechanic assigned, date, and star rating

**Reviews Tab:**
- A rating summary bar chart (5 stars to 1 star)
- Individual reviews from drivers with their name, problem, mechanic, rating, and written comment

📸 **[INSERT SCREENSHOT: Garage SOS tab showing incoming request with driver details and Accept/Decline buttons]**

📸 **[INSERT SCREENSHOT: Garage mechanic assignment list showing available and on-duty mechanics]**

📸 **[INSERT SCREENSHOT: Tow dispatch card with Confirm button]**

📸 **[INSERT SCREENSHOT: Team tab showing mechanic roster with colored status dots]**

📸 **[INSERT SCREENSHOT: Garage notification toast sliding in from top]**

---

## 10. Mechanic Dashboard

**What it does:**
A mobile app for the mechanic. When a garage assigns them to a job, they see all the driver's details, their location on a map, and controls to update the job status step by step.

**What is on it:**

### Header
- Mechanic's photo with a live status dot (green/orange/grey)
- Mechanic name and current status (Available / On Duty / Job Active)
- Drive Safe logo and "Go Offline" button

### 2 Tabs

**My Job Tab (no active job):**
- A faint map background
- An animated wrench icon
- Message: "No active job — Waiting for garage dispatch"
- GPS tracker status at the bottom showing live coordinates

**My Job Tab (active job assigned):**
This is the most important screen for the mechanic. It is designed around the **driver's location** as the top priority.

- **Tall map (with route):** Shows the mechanic's pin moving along the route toward the driver's pin
- **SOS job ID badge** top-left, **job status badge** top-right
- **Location bar pinned to the bottom of the map:**
  - Orange map pin icon
  - "DRIVER LOCATION" label
  - Full address: "Kigali, Kiyovu — KN 3 Rd"
  - GPS coordinates: "1.9462° S, 30.0612° E"
  - A bright **"Navigate"** button the mechanic taps to open turn-by-turn navigation
- **Driver profile card:**
  - Driver's photo (large), name, phone number
  - Vehicle model badge (orange) and plate number badge (dark)
  - GPS Live indicator at the bottom of the card
  - Call button (solid orange) and Message button
- **Vehicle card:** Model, vehicle type (SUV/Sedan), year
- **Reported Problem card:** Problem name with icon, driver's written notes, incident photo

**Action buttons at the bottom (update the job stage):**
1. "Start Journey (On the Way)" → mechanic begins driving
2. "Mark as Arrived" → mechanic has reached the driver
3. "Start Diagnostics" → mechanic begins inspecting the car
4. "Complete Repair" → opens a service report form:
   - Text area to describe what was done
   - "Attach Repair Photo" button
   - "Submit & Close Ticket" button
5. "Tow" (red) → mechanic requests a tow truck if the car cannot be fixed on-site

**Team Tab:**
- Same roster view as the garage — all mechanics at the garage with live statuses
- The active mechanic is marked with a "You" badge
- A status legend at the bottom explaining what each color means

📸 **[INSERT SCREENSHOT: Mechanic job screen showing tall map, driver location bar, and Navigate button]**

📸 **[INSERT SCREENSHOT: Driver profile card with photo, vehicle badges, and Call button]**

📸 **[INSERT SCREENSHOT: Action buttons at the bottom — "Start Journey" in orange]**

📸 **[INSERT SCREENSHOT: Service report form with notes and photo attachment]**

---

## 11. Notifications System

**What it does:**
Every action in the app fires a notification. Importantly, the **driver and the garage receive different messages** — each tailored to what that person needs to know.

### Driver Notifications
These appear as a toast that slides down from the top of the driver's screen:

| Event | Driver receives |
|---|---|
| Selects a garage | "Your roadside assistance request has been dispatched to Kigali Auto Care. Stay with your vehicle." |
| Garage accepts | "Kigali Auto Care has accepted your emergency request and is now assigning a mechanic." |
| Garage declines | "Unfortunately, [Garage] is unable to take your call. Please select another garage." |
| Mechanic assigned | "Olivier Ndizeye has been assigned to your case and is reviewing your vehicle details." |
| Mechanic en route | "Olivier Ndizeye has started his journey and is heading to your location. ETA: 8 mins." |
| Mechanic arrived | "Olivier Ndizeye has arrived at your exact location. Please come meet him." |
| Diagnosing | "Olivier is inspecting your Toyota RAV4 and running a full diagnostic." |
| Tow requested | "🚛 Your vehicle cannot be repaired on-site. A tow truck from [Garage] is on the way." |
| Service completed | "✅ Olivier Ndizeye has successfully completed the service. Please rate your experience." |
| Review submitted | "Thank you for your 5-star review for Kigali Auto Care!" |

### Garage Notifications
These appear as a toast that slides down from the top of the garage portal:

| Event | Garage receives |
|---|---|
| Driver sends request | "🚨 You have received an emergency call from Eric Keza (Toyota RAV4 · RAD 123 A). Problem: Flat tire. Driver is at KN 3 Rd. Please respond." |
| Request accepted | "You have accepted the call. Please assign an available mechanic immediately." |
| Request declined | "You have declined the request. The driver has been redirected to another garage." |
| Mechanic assigned | "Olivier Ndizeye has been assigned to the job for Eric Keza and is reviewing the case." |
| Mechanic en route | "Olivier Ndizeye has left and is en route to KN 3 Rd." |
| Mechanic arrived | "Olivier Ndizeye has arrived at the driver's location." |
| Diagnosing started | "Olivier has begun diagnosing Eric's Toyota RAV4. Problem: Flat tire." |
| Job completed | "🔧 Olivier Ndizeye has closed the job for Eric Keza (Toyota RAV4). Problem resolved: Flat tire. Mechanic is now available." |
| Driver submits review | "⭐⭐⭐⭐⭐ Eric Keza rated the service 5/5. 'Incredible speed!' — Toyota RAV4 (RAD 123 A)" |

📸 **[INSERT SCREENSHOT: Driver notification toast sliding in from top showing mechanic assigned message]**

📸 **[INSERT SCREENSHOT: Garage notification toast with incoming emergency request message]**

---

## 12. Back Navigation

Every screen has a way to go back:

| Screen | Back action |
|---|---|
| Problem Selection | Arrow → Home |
| Searching | Arrow → Problem Selection |
| Garages | Arrow → Problem Selection |
| Tracking | Arrow in map header → Garages |
| Completion | Arrow → Dashboard or Home |
| Registered Dashboard | Arrow (top-left) → Home |

📸 **[INSERT SCREENSHOT: Back arrow button visible in the header of the Problem Selection screen]**

---

## 13. Color Theme & Design

The app uses three main colors consistently throughout:

| Color | Use |
|---|---|
| **Dark Navy** (`#1e3a5f` / `navy-800`) | Headers, backgrounds, primary buttons |
| **Orange** (`#f97316` / `orange-500`) | Emergency button, active states, alerts, badges |
| **White** | Card backgrounds, text on dark surfaces |
| **Slate Dark** (`#0f172a`) | Garage and mechanic dashboard backgrounds |
| **Emerald Green** | Available status, success states |
| **Amber Yellow** | Star ratings |

**Design principles:**
- Cards have rounded corners (`rounded-2xl` / `rounded-3xl`)
- Shadows are subtle and color-matched to the element
- Status dots are always visible with pulse animations for active/live states
- Font sizes are kept small (9px–14px) to fit the mobile phone frame
- All text on dark backgrounds is white or light grey for readability
- Emergency elements always use orange so the driver's eye goes there first

---

## Technical Stack

| Tool | Purpose |
|---|---|
| React + TypeScript | UI framework |
| Vite | Build tool |
| Tailwind CSS | Styling |
| Framer Motion | Animations and transitions |
| Lucide React | Icons |
| GitHub | Version control — `https://github.com/Makuza12nadege/Drive-safe` |

---

## Data — Garages & Mechanics

### Garages
| Name | Distance | ETA | Services |
|---|---|---|---|
| Kigali Auto Care | 1.2 km | 8 mins | Engine, Battery, Flat tire, Diagnostics |
| Nyabugogo Speedy Mechanics | 2.8 km | 14 mins | Flat tire, Fuel, Towing, Accident |
| Gikondo Car Clinic | 3.5 km | 18 mins | Engine, Battery, Inspection |

### Mechanics (per garage)
| Garage | Mechanic | Status | Speciality |
|---|---|---|---|
| Kigali Auto Care | Olivier Ndizeye | Available | Diagnostics, Engine |
| Kigali Auto Care | Jean-Paul Habimana | On Duty | Flat tire, Brakes |
| Kigali Auto Care | Patrick Mugisha | Available | Battery, Fuel |
| Nyabugogo Speedy | Eric Nkurunziza | On Duty | Towing, Accident |
| Nyabugogo Speedy | Samuel Hakizimana | Available | Flat tire, Engine |
| Nyabugogo Speedy | Yves Nzabonimana | Offline | Towing |
| Gikondo Car Clinic | Cedric Mutabazi | On Duty | Diagnostics |
| Gikondo Car Clinic | Diane Uwimana | Available | Engine, Battery |
| Gikondo Car Clinic | Alain Bizimungu | Offline | Inspection |

---

*Documentation written for Drive Safe prototype — Version 1.0 · June 2026*
*Developed with Kiro AI · Kigali, Rwanda*
