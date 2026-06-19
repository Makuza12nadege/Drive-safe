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
  // ── Kigali Auto Care (g1) ── 3 mechanics
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
    id: 'm5',
    name: 'Patrick Mugisha',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    phone: '+250 789 321 654',
    rating: 4.7,
    reviews: 36,
    distance: 1.5,
    services: ['Battery problem', 'Flat tire', 'Car won\'t start', 'Out of fuel'],
    about: 'Fast-response roadside technician specializing in quick fixes and emergency fuel delivery.',
    garageId: 'g1',
    status: 'available',
    lat: -1.9445,
    lng: 30.0625
  },

  // ── Nyabugogo Speedy Mechanics (g2) ── 3 mechanics
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
    id: 'm6',
    name: 'Samuel Hakizimana',
    avatar: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    phone: '+250 782 555 666',
    rating: 4.6,
    reviews: 29,
    distance: 2.9,
    services: ['Flat tire', 'Battery problem', 'Engine Issue'],
    about: 'Reliable mechanic covering Nyabugogo and surrounding routes. Fast response time.',
    garageId: 'g2',
    status: 'available',
    lat: -1.9388,
    lng: 30.0441
  },
  {
    id: 'm7',
    name: 'Yves Nzabonimana',
    avatar: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    phone: '+250 783 777 888',
    rating: 4.5,
    reviews: 18,
    distance: 3.0,
    services: ['Towing', 'Accident assistance', 'Flat tire'],
    about: 'Towing expert and accident response coordinator based in Nyabugogo hub.',
    garageId: 'g2',
    status: 'available',
    lat: -1.9395,
    lng: 30.0455
  },

  // ── Gikondo Car Clinic (g3) ── 3 mechanics
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
  },
  {
    id: 'm8',
    name: 'Diane Uwimana',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    phone: '+250 788 999 000',
    rating: 4.9,
    reviews: 22,
    distance: 3.6,
    services: ['Engine Issue', 'Battery problem', 'Car won\'t start', 'Diagnostics'],
    about: 'One of Kigali\'s top-rated female mechanics. Expert in diagnostics and engine repair.',
    garageId: 'g3',
    status: 'available',
    lat: -1.9678,
    lng: 30.0779
  },
  {
    id: 'm9',
    name: 'Alain Bizimungu',
    avatar: 'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    phone: '+250 785 100 200',
    rating: 4.6,
    reviews: 15,
    distance: 3.7,
    services: ['Need inspection', 'Engine Issue', 'Battery problem'],
    about: 'Specialist in full vehicle inspection and pre-purchase checks. Gikondo area coverage.',
    garageId: 'g3',
    status: 'available',
    lat: -1.9686,
    lng: 30.0790
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