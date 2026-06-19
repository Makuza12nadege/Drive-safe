import { DriverProfile, Garage, Mechanic, EmergencyRequest, AppNotification } from './types';

export const defaultDriver: DriverProfile = {
  name: 'Eric Keza',
  phone: '+250 788 123 456',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
  vehicle: {
    model: 'Toyota RAV4',
    plate: 'RAD 123 A',
    type: 'SUV (White)',
    year: '2018'
  }
};

export const initialGarages: Garage[] = [
  {
    id: 'g1',
    name: 'Kigali Auto Care',
    logo: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    rating: 4.9,
    reviews: 142,
    distance: 1.2,
    eta: '8 mins',
    services: ['Engine Issue', 'Battery problem', 'Car won\'t start', 'Flat tire', 'Diagnostics'],
    verified: true,
    lat: -1.9441, // Kiyovu area
    lng: 30.0619
  },
  {
    id: 'g2',
    name: 'Nyabugogo Speedy Mechanics',
    logo: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    rating: 4.7,
    reviews: 95,
    distance: 2.8,
    eta: '14 mins',
    services: ['Flat tire', 'Out of fuel', 'Accident assistance', 'Towing'],
    verified: true,
    lat: -1.9392, // Nyabugogo area
    lng: 30.0449
  },
  {
    id: 'g3',
    name: 'Gikondo Car Clinic',
    logo: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    rating: 4.8,
    reviews: 64,
    distance: 3.5,
    eta: '18 mins',
    services: ['Engine Issue', 'Car won\'t start', 'Battery problem', 'Need inspection'],
    verified: true,
    lat: -1.9682, // Gikondo area
    lng: 30.0784
  }
];

export const initialMechanics: Mechanic[] = [
  {
    id: 'm1',
    name: 'Olivier Ndizeye',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    phone: '+250 788 987 654',
    rating: 4.9,
    reviews: 88,
    distance: 1.2,
    services: ['Diagnostics', 'Engine Issue', 'Battery problem', 'Car won\'t start'],
    about: 'Certified Master Mechanic with 8 years of experience. Specializes in Toyota, Hyundai and electrical diagnostic tasks.',
    garageId: 'g1',
    status: 'available',
    lat: -1.9441,
    lng: 30.0619
  },
  {
    id: 'm2',
    name: 'Jean-Paul Habimana',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    phone: '+250 783 111 222',
    rating: 4.8,
    reviews: 54,
    distance: 1.3,
    services: ['Flat tire', 'Brakes', 'Suspension'],
    about: 'Quick emergency responder. Expert in tire fittings, brake servicing, and minor engine start problems.',
    garageId: 'g1',
    status: 'available',
    lat: -1.9430,
    lng: 30.0600
  },
  {
    id: 'm3',
    name: 'Eric Nkurunziza',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    phone: '+250 785 222 333',
    rating: 4.7,
    reviews: 42,
    distance: 2.8,
    services: ['Towing', 'Accident assistance', 'Out of fuel', 'Flat tire'],
    about: 'Heavy-duty roadside recovery specialist with 5 years experience driving towing trucks and handling highway rescue.',
    garageId: 'g2',
    status: 'available',
    lat: -1.9392,
    lng: 30.0449
  },
  {
    id: 'm4',
    name: 'Cedric Mutabazi',
    avatar: 'https://images.unsplash.com/photo-1628157582853-a796fa650a6a?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    phone: '+250 782 444 555',
    rating: 4.8,
    reviews: 31,
    distance: 3.5,
    services: ['Diagnostics', 'Engine repair', 'AC Inspection'],
    about: 'Experienced mechanical technician with a focus on electronic diagnostics and modern European cars.',
    garageId: 'g3',
    status: 'available',
    lat: -1.9682,
    lng: 30.0784
  }
];

export const initialHistory: EmergencyRequest[] = [
  {
    id: 'h1',
    problemType: 'Flat tire',
    details: 'Right rear tyre went flat on the highway. Needed immediate replacement.',
    photo: null,
    status: 'completed',
    driver: defaultDriver,
    garage: initialGarages[0],
    mechanic: initialMechanics[1],
    timestamp: '2026-06-10 14:32',
    notes: 'Replaced tire and checked pressure on all other tyres. Quick service!',
    rating: 5,
    review: 'Jean-Paul arrived in less than 10 minutes and had my tyre changed in no time. Highly recommend Kigali Auto Care!',
    repairPhoto: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'h2',
    problemType: 'Battery problem',
    details: 'Left the headlights on, battery died. Need a jumpstart.',
    photo: null,
    status: 'completed',
    driver: defaultDriver,
    garage: initialGarages[2],
    mechanic: initialMechanics[3],
    timestamp: '2026-05-18 09:15',
    notes: 'Jumpstarted battery, tested charging system and alternator health (OK).',
    rating: 4,
    review: 'Friendly technician. Arrived slightly late due to Gikondo traffic, but got the job done quickly.',
    repairPhoto: null
  }
];

export const initialNotifications: AppNotification[] = [
  {
    id: 'n1',
    title: 'Welcome to Drive Safe!',
    message: 'Your account is setup and ready. Save your vehicle data in your profile for fast roadside requests.',
    time: '2 days ago',
    read: true
  },
  {
    id: 'n2',
    title: 'Assistance Completed',
    message: 'How was your recent flat tire service with Jean-Paul? Your invoice is ready in history.',
    time: '9 days ago',
    read: true
  }
];