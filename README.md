# 🚗 Drive Safe

> **GPS-Powered Roadside Assistance Platform · Kigali, Rwanda**

Drive Safe is a mobile application prototype that connects drivers who are stranded on the road with nearby verified garages and professional mechanics anywhere in Rwanda. It works like Uber but for vehicle emergencies — you press a button, a mechanic comes to you.

The prototype runs as a **live simulator** with three phone screens displayed side by side on one page. All three screens are connected in real time — an action on one screen instantly updates the others. This allows you to experience the full emergency journey from three different perspectives at the same time.

[![React](https://img.shields.io/badge/React-18-blue?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?logo=tailwindcss)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-10-purple)](https://www.framer.com/motion)
[![Vite](https://img.shields.io/badge/Vite-5-yellow?logo=vite)](https://vitejs.dev)

---

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## 🖥️ The Three-Screen Simulator

When you open the app you will see three phone frames on the screen:

- **Left phone** — the Driver App. This is what a stranded driver sees on their phone.
- **Middle phone** — the Garage Portal. This is the operations dashboard for the garage receiving the emergency call.
- **Right phone** — the Mechanic App. This is what the mechanic who gets dispatched sees on their phone.

At the top of the page there is a **Start Auto-Demo** button. Press it and the entire emergency journey will run automatically, step by step, switching focus between the three phones so you can follow what is happening on each side. There is also a **Reset** button to start over from scratch at any time.

---

## 📱 Driver App — What the Driver Experiences

The driver app takes the driver through a complete emergency journey from the moment they realize they need help to the moment their car is fixed and they submit a rating.

### Splash Screen

When the app first opens, the driver sees a splash screen with the Drive Safe logo, a custom car illustration, and the slogan *"Reliable Vehicle Assistance Anytime, Anywhere."* This screen lasts about three seconds and then moves automatically to the home screen.

### Emergency Home Screen

This is the most important screen in the entire app. It is designed for a driver who is stressed and needs help fast. There is no login required — the driver does not need an account to get help.

The center of the screen has a large orange pulsing button that says **REQUEST ROAD ASSISTANCE**. This is the first thing the driver sees and the only thing they need to tap to start getting help. Below the button there is a GPS location badge showing the driver's current location in Kigali with a green active dot to confirm that location tracking is working. At the bottom of the screen there is a Help and Support section with a toll-free emergency number (912) and a link to verified garages. In the top right corner there is a Login or Register option for drivers who already have an account.

### Vehicle Problem Selection

After pressing the emergency button, the driver is asked to select what is wrong with their vehicle. There are seven options presented as cards in a grid: Battery problem, Flat tire, Car won't start, Engine issue, Accident assistance, Out of fuel, and Need inspection (for when the driver does not know what the problem is). Each card shows a small icon and a short description of what that option covers. When the driver taps a card it turns orange to show it is selected.

Below the problem grid there is a text box where the driver can describe the problem in more detail, for example mentioning the exact road, any strange sounds the car is making, or any special information the mechanic might need. There is also an optional vehicle photo upload area where the driver can attach a picture of the problem to help the mechanic prepare. At the bottom there is a Find Garages button that only activates once a problem has been selected.

### Location Search Screen

After the driver submits their problem, the app shows a live map of Kigali with animated radar rings pulsing outward from the driver's GPS pin. This communicates that the app is scanning the area for nearby garages. The screen lasts about two and a half seconds before automatically moving to the garages list. The driver can go back or cancel at any time using the buttons at the top.

### Nearby Garages Screen

This screen lists all three verified garages in the area. Each garage is shown as a card with its logo, name, and a blue verified badge. The card also shows the garage's star rating, how many reviews they have, how far away they are in kilometres, and an estimated arrival time for how long it would take their mechanic to reach the driver's location.

A key feature on this screen is the **live mechanic availability indicator**. Each garage card shows a small coloured dot with text. If the garage has available mechanics the dot is green and says how many mechanics are free. If all of the garage's mechanics are currently busy helping other drivers the dot turns red and says "All mechanics on duty." If the driver tries to request a garage whose mechanics are all on duty, a toast message slides in from the top of the screen to explain that the garage is unavailable and suggest trying another one.

At the bottom of each garage card there is a Request Assistance button. When the driver taps this, the request is sent immediately to that garage.

### Service Tracking Screen

Once the driver sends a request to a garage, this screen becomes the command centre for following the job in real time. The top half of the screen is a live map showing three pins: the driver's location (an orange pulsing pin), the garage location, and the mechanic's pin which animates and moves along the road route toward the driver as the job progresses.

Below the map there is a mechanic assignment card that appears once the garage has dispatched someone. This card shows the mechanic's photo, full name, the garage they work for, their star rating, and a live estimated time of arrival that updates as they get closer. The card also has a call button and a message button so the driver can contact the mechanic directly.

Beneath the mechanic card there is a progress timeline showing seven stages of the job. The active stage pulses in orange and completed stages are shown in a darker colour. The seven stages are: Request received, Garage accepted, Mechanic assigned, Mechanic on the way, Mechanic arrived, Vehicle diagnosed, and Service completed (or Tow truck dispatched if the car cannot be fixed on-site).

**If the garage declines the request:** The tracking screen immediately changes to show a decline message that tells the driver which garage declined and why. The screen then shows quick-pick cards for the other two available garages so the driver can immediately send a new request without going back through the whole flow.

**If the mechanic determines the car cannot be fixed on the road:** A prominent dark navy banner appears on the tracking screen with a truck icon that says the car needs to be towed to the workshop. It tells the driver which garage is sending the tow truck and asks them to stay with their vehicle. The driver is reassured that the mechanic will wait with them until the tow truck arrives.

### Service Completion Screen

When the mechanic submits the completed service report, the driver lands on the completion screen. This shows a green checkmark and a confirmation that the service was successful. A small summary card shows the mechanic's photo, name, the garage they came from, and the problem that was solved. The driver can then give a star rating from one to five and write a written review about their experience. After submitting the review, guest drivers see a popup encouraging them to create an account so their service history is saved and future requests are handled faster.

### Registered Driver Dashboard

Drivers who create an account get access to a personal dashboard. The header shows their profile photo, name, phone number, and a VIP badge. There is a back arrow to return to the home screen and a logout button.

The dashboard contains several sections. The vehicle card shows the driver's registered car model, vehicle type, year, and plate number. There is a quick SOS button for registered drivers to request emergency help without going through the normal flow. There is a favorite garages section showing the two most frequently used garages with their ratings and distances. The service history section shows a complete log of every past emergency job including the problem type, the garage and mechanic who helped, the date, and the driver's rating and review for each job. At the bottom there is a notifications section showing unread alerts and a settings section.

---

## 🏪 Garage Portal — What the Garage Sees

The garage portal is a professional operations dashboard. It uses a dark theme (dark navy and slate colours) to differentiate it from the driver's white app. The garage can manage everything from one screen.

### Header

The header shows the garage's logo and name with a verified badge. On the right there is a toggle switch labelled SOS Desk that can be set to Online or Offline. When it is online the garage is available to receive emergency calls. The Drive Safe logo is also visible in the header.

### Floating Notification Toast

Every important event in the system fires a notification toast that slides down from the top of the garage portal screen. Importantly, the garage receives messages that are **specific to their role** — completely different from what the driver sees. For example, when a driver sends a request the garage sees: *"You have received an emergency call from Eric Keza (Toyota RAV4 · RAD 123 A). Problem: Flat tire. Driver is waiting at KN 3 Rd. Please respond immediately."* The driver at the same time sees a different message: *"Your request has been dispatched to Kigali Auto Care. Please stay with your vehicle."*

### SOS Tab — Emergency Dispatch

This is the main working area for the garage. When a driver sends a request, a red pulsing badge appears on the SOS tab to alert the garage team. The tab shows a status banner at the top that changes as the job progresses.

Below the banner there is a driver information card showing the driver's photo, full name, phone number, vehicle model, and plate number. Next to it is a problem card showing exactly what the driver reported — the problem type, the GPS location on the map, any written notes from the driver, and the vehicle photo if one was attached.

The garage then sees Accept and Decline buttons. If they accept, the screen immediately shows a list of all their mechanics with their availability status. Mechanics who are available have an Assign button. Mechanics who are currently on duty helping another driver have no button and are clearly labelled as unavailable. Mechanics who are offline are also labelled clearly. The garage selects one available mechanic and taps Assign to dispatch them to the driver.

If the mechanic later reports that the car cannot be fixed on-site, a tow alert card appears in the SOS tab. This card shows the driver's name, vehicle details, and location along with an amber Confirm Tow Dispatch button. Once the garage presses this button it changes to a green confirmation message saying the tow truck is on its way.

At the bottom of the SOS tab there is a working hours editor where the garage can update their opening and closing times.

### Team Tab

This tab shows a complete roster of all mechanics registered at the garage. Each mechanic card displays their photo, name, phone number, star rating, and total jobs completed. A coloured dot on each photo shows their live status: green for available, orange for on duty, and grey for offline. Mechanics who are on duty have their card highlighted with an orange border to make them easy to spot.

### History Tab

This tab shows a log of every completed job that went through the garage. Each entry shows the driver's name and plate number, the problem that was reported, the mechanic who was assigned, and the date and time the job was completed. If the driver left a rating it is also shown.

### Reviews Tab

This tab shows the garage's overall performance. At the top there is a rating summary card showing the garage's average star rating, the total number of reviews, and a bar chart breaking down how many reviews were 5 stars, 4 stars, 3 stars, 2 stars, and 1 star. Below the summary there is a list of individual written reviews from drivers, each showing the driver's name, the problem type, the mechanic who helped, the star rating given, and the full text of the review.

---

## 🔧 Mechanic App — What the Mechanic Sees

The mechanic app is a dark-themed mobile app designed for professionals working in the field. It has two tabs: My Job and Team.

### When No Job is Active

When the mechanic is online but has not yet been assigned to a job, the screen shows a faint map background with an animated wrench icon and the message "No active job — Waiting for garage dispatch." At the bottom there is a GPS tracker showing the mechanic's live coordinates to confirm they are trackable. The mechanic can tap Go Offline at any time to remove themselves from the available pool.

### When a Job is Assigned — My Job Tab

This is the most important screen in the mechanic's app. It is designed around the driver's location as the primary piece of information the mechanic needs.

The top section of the screen is a tall map showing the mechanic's own pin and the driver's pin with an animated route between them. The mechanic's pin moves in real time as they travel toward the driver. At the top of the map there is the SOS job ID and the current job status. Pinned to the bottom of the map is a location bar showing the driver's full street address (Kigali, Kiyovu — KN 3 Rd), the GPS coordinates, a green live GPS indicator, and a bright orange Navigate button the mechanic can tap to open turn-by-turn navigation directly to the driver.

Below the map there is the driver's profile card showing their photo, full name, phone number, vehicle model badge, and plate number badge. The call button on this card is solid orange so it is immediately obvious. There is also a message button. At the bottom of this card there is a row showing the GPS address again with a live indicator.

Below the driver card there is a vehicle details card showing the car model, type (SUV, Sedan, etc.), and year. Then there is the reported problem card showing the problem category with its icon, the driver's written notes in a quote block, and the incident photo if the driver attached one.

At the bottom of the screen there are action buttons that the mechanic uses to update the job stage step by step. These are: Start Journey, Mark as Arrived, Start Diagnostics, Complete Repair, and Tow. When the mechanic taps Complete Repair a service report form slides open where they can write what they did, attach a photo of the completed work, and then submit the report to close the ticket. When the mechanic taps Tow, the system notifies the driver that a tow truck is coming and alerts the garage to dispatch one from their yard.

### Team Tab

The mechanic can switch to the team tab to see all colleagues at the same garage with their live statuses. Their own card is marked with a "You" badge. A legend at the bottom explains the three status colours.

---

## 🔔 How Notifications Work

Every step of the emergency journey fires notifications. The driver and the garage receive completely different messages — each written from their perspective and containing only the information relevant to them.

For example, when the mechanic completes the job:

- **The driver receives:** *"Olivier Ndizeye from Kigali Auto Care has successfully completed the roadside service on your Toyota RAV4. Please take a moment to rate your experience."*
- **The garage receives:** *"Olivier Ndizeye has submitted the service report and closed the job ticket for driver Eric Keza (Toyota RAV4 · RAD 123 A). Problem resolved: Flat tire. Mechanic is now available."*

Notifications appear as toast messages that slide down from the top of the respective screen and disappear automatically after a few seconds. The driver can dismiss them manually with an X button.

---

## 🎨 Design & Color Theme

The app uses three primary colours that reflect the brand values of safety, trust, and emergency response:

- **Dark Navy** is used for headers, primary buttons, and the registered dashboard background. It communicates trust and professionalism.
- **Orange** is used for the emergency button, active states, alerts, and all primary call-to-action elements. It communicates urgency and draws the eye immediately to what matters most.
- **White** is used for card backgrounds and text on dark surfaces. It keeps the interface clean and readable.

The garage and mechanic dashboards use a very dark slate colour scheme to feel distinct from the driver's lighter white app — this helps reinforce that these are professional tools for service providers rather than consumer-facing screens.

All interactive elements have smooth animations powered by Framer Motion. Live status elements (GPS pins, availability dots, notification pulses) use subtle pulse animations to communicate that they are updating in real time. All cards use rounded corners and soft shadows to give the app a modern feel similar to apps like Uber and Bolt.

---

## 🗂️ Project Structure

```
Drive Safe/
├── public/
│   └── personal_p.jpg              # Profile photo asset
├── src/
│   ├── Logo.png                     # Drive Safe logo
│   ├── App.tsx                      # Root component — manages all shared state
│   ├── data.ts                      # Seed data for garages, mechanics, history
│   ├── types.ts                     # TypeScript type definitions
│   ├── index.css                    # Global styles
│   └── components/
│       ├── driver/
│       │   └── DriverApp.tsx        # All driver-facing screens
│       ├── garage/
│       │   └── GarageDashboard.tsx  # Garage operations portal
│       ├── mechanic/
│       │   └── MechanicDashboard.tsx# Mechanic mobile app
│       └── shared/
│           └── MockMap.tsx          # Animated Kigali map with GPS pins and routes
```

---

## 🏪 Garages & Mechanics

The prototype includes three verified garages in Kigali and nine mechanics split equally across them.

### Garages

| Name | Distance | ETA | Specialises In |
|------|----------|-----|----------------|
| Kigali Auto Care | 1.2 km | 8 mins | Engine, Battery, Flat tire, Diagnostics |
| Nyabugogo Speedy Mechanics | 2.8 km | 14 mins | Flat tire, Fuel delivery, Towing, Accident |
| Gikondo Car Clinic | 3.5 km | 18 mins | Engine, Battery, Full inspection |

### Mechanics

Each garage has three mechanics. Their statuses are set to reflect a realistic working environment — not everyone is available at the same time.

| Garage | Mechanic | Status | Speciality |
|--------|----------|--------|-----------|
| Kigali Auto Care | Olivier Ndizeye ⭐ 4.9 | Available | Diagnostics, Engine |
| Kigali Auto Care | Jean-Paul Habimana ⭐ 4.8 | On Duty | Flat tire, Brakes |
| Kigali Auto Care | Patrick Mugisha ⭐ 4.7 | Available | Battery, Fuel |
| Nyabugogo Speedy | Eric Nkurunziza ⭐ 4.7 | On Duty | Towing, Accident |
| Nyabugogo Speedy | Samuel Hakizimana ⭐ 4.6 | Available | Flat tire, Engine |
| Nyabugogo Speedy | Yves Nzabonimana ⭐ 4.5 | Offline | Towing |
| Gikondo Car Clinic | Cedric Mutabazi ⭐ 4.8 | On Duty | Diagnostics |
| Gikondo Car Clinic | Diane Uwimana ⭐ 4.9 | Available | Engine, Battery |
| Gikondo Car Clinic | Alain Bizimungu ⭐ 4.6 | Offline | Inspection |

---

## 🛠️ Tech Stack

| Tool | Purpose |
|------|---------|
| React 18 + TypeScript | UI framework with type safety |
| Vite 5 | Development server and build tool |
| Tailwind CSS 3 | Utility-first styling system |
| Framer Motion 10 | Animations and screen transitions |
| Lucide React | Icon library |

---

## 🔗 Repository

**GitHub:** [https://github.com/Makuza12nadege/Drive-safe](https://github.com/Makuza12nadege/Drive-safe)

---

*Drive Safe · Version 1.0 · June 2026 · Kigali, Rwanda*  
*Built with Kiro AI*
