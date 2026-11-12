import { User, Ride, LocationPoint, BookingRequest, NotificationItem } from '../types';

export const CURRENT_USER: User = {
  id: 'usr_me_01',
  name: 'Ethan Cole',
  email: 'ethan.cole@stanford.edu',
  college: 'Stanford University',
  universityDomain: 'stanford.edu',
  degree: 'B.S. Computer Science',
  yearOfStudy: 'Senior (Class of 2025)',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
  phone: '+1 (650) 555-0192',
  bio: 'CS Senior passionate about sustainable transit. Daily commuter from Menlo Park to Engineering Quad. Safe driver with clean record!',
  isVerified: true,
  verificationStatus: 'verified',
  studentIdCardVerified: true,
  rating: 4.95,
  reviewCount: 38,
  ridesGivenCount: 26,
  ridesTakenCount: 44,
  totalSavingsEst: 340,
  co2SavedKg: 185,
  memberSince: 'Sep 2023',
  vehicle: {
    make: 'Tesla',
    model: 'Model 3 Dual Motor',
    year: 2022,
    color: 'Midnight Silver Metallic',
    licensePlate: '8XYZ492',
    type: 'ev',
    seatsTotal: 4,
    photo: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&q=80&w=600'
  },
  preferences: {
    music: true,
    smoking: false,
    pets: false,
    chattiness: 'flexible',
    luggageCapacity: 'cabin',
    genderPreference: 'all'
  }
};

export const MOCK_USERS: Record<string, User> = {
  usr_01: {
    id: 'usr_01',
    name: 'Priya Sharma',
    email: 'priya.s@stanford.edu',
    college: 'Stanford University',
    degree: 'M.S. Artificial Intelligence',
    yearOfStudy: '2nd Year Graduate',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
    phone: '+1 (650) 555-0144',
    bio: 'AI researcher heading to SFO airport on weekends and weekly Bay trips. Love indie rock podcasts!',
    isVerified: true,
    verificationStatus: 'verified',
    studentIdCardVerified: true,
    rating: 4.98,
    reviewCount: 62,
    ridesGivenCount: 54,
    ridesTakenCount: 19,
    totalSavingsEst: 720,
    co2SavedKg: 310,
    memberSince: 'Jan 2023',
    vehicle: {
      make: 'Honda',
      model: 'Civic Touring',
      year: 2023,
      color: 'Sonic Gray Pearl',
      licensePlate: '7ABC891',
      type: 'sedan',
      seatsTotal: 4
    },
    preferences: {
      music: true,
      smoking: false,
      pets: false,
      chattiness: 'talkative',
      luggageCapacity: 'cabin',
      genderPreference: 'all'
    }
  },
  usr_02: {
    id: 'usr_02',
    name: 'Alex Rivera',
    email: 'alex.rivera@berkeley.edu',
    college: 'UC Berkeley',
    degree: 'B.S. Mechanical Engineering',
    yearOfStudy: 'Junior (Class of 2026)',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    phone: '+1 (510) 555-0188',
    bio: 'Commuter from East Bay to South Bay campuses. Spacious trunk for luggage or sports gear.',
    isVerified: true,
    verificationStatus: 'verified',
    studentIdCardVerified: true,
    rating: 4.88,
    reviewCount: 45,
    ridesGivenCount: 38,
    ridesTakenCount: 22,
    totalSavingsEst: 510,
    co2SavedKg: 240,
    memberSince: 'Aug 2023',
    vehicle: {
      make: 'Toyota',
      model: 'RAV4 Hybrid',
      year: 2022,
      color: 'Lunar Rock',
      licensePlate: '9KLR412',
      type: 'suv',
      seatsTotal: 4
    },
    preferences: {
      music: true,
      smoking: false,
      pets: true,
      chattiness: 'quiet',
      luggageCapacity: 'large',
      genderPreference: 'all'
    }
  },
  usr_03: {
    id: 'usr_03',
    name: 'Sarah Jenkins',
    email: 'sjenkins@stanford.edu',
    college: 'Stanford University',
    degree: 'B.A. Economics & Pre-Law',
    yearOfStudy: 'Senior (Class of 2025)',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=400',
    phone: '+1 (650) 555-0167',
    bio: 'Campus Ambassador. Frequent rides to SFO Airport and San Jose Diridon Train Station. Safe & punctual!',
    isVerified: true,
    verificationStatus: 'verified',
    studentIdCardVerified: true,
    rating: 5.0,
    reviewCount: 39,
    ridesGivenCount: 31,
    ridesTakenCount: 14,
    totalSavingsEst: 430,
    co2SavedKg: 195,
    memberSince: 'Sep 2023',
    vehicle: {
      make: 'Hyundai',
      model: 'Ioniq 5 Electric',
      year: 2023,
      color: 'Abyss Black Pearl',
      licensePlate: '4EVG771',
      type: 'ev',
      seatsTotal: 4
    },
    preferences: {
      music: true,
      smoking: false,
      pets: false,
      chattiness: 'talkative',
      luggageCapacity: 'cabin',
      genderPreference: 'female_only'
    }
  },
  usr_04: {
    id: 'usr_04',
    name: 'Marcus Vance',
    email: 'marcus.v@sjsu.edu',
    college: 'San Jose State University',
    degree: 'B.S. Software Engineering',
    yearOfStudy: 'Senior (Class of 2025)',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
    phone: '+1 (408) 555-0123',
    bio: 'Tech intern in Sunnyvale commuting from SJSU campus daily. Quiet rides, chilled lofi vibes.',
    isVerified: true,
    verificationStatus: 'verified',
    studentIdCardVerified: true,
    rating: 4.82,
    reviewCount: 28,
    ridesGivenCount: 24,
    ridesTakenCount: 16,
    totalSavingsEst: 390,
    co2SavedKg: 170,
    memberSince: 'Nov 2023',
    vehicle: {
      make: 'Volkswagen',
      model: 'Golf GTI',
      year: 2021,
      color: 'Pure White',
      licensePlate: '6VWG220',
      type: 'hatchback',
      seatsTotal: 3
    },
    preferences: {
      music: true,
      smoking: false,
      pets: false,
      chattiness: 'quiet',
      luggageCapacity: 'backpack',
      genderPreference: 'all'
    }
  },
  usr_05: {
    id: 'usr_05',
    name: 'Chloe Zhang',
    email: 'chloe.zhang@berkeley.edu',
    college: 'UC Berkeley',
    degree: 'B.S. Bioengineering',
    yearOfStudy: 'Junior (Class of 2026)',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400',
    phone: '+1 (510) 555-0199',
    bio: 'Heading from Berkeley to San Francisco Downtown every Friday & Sunday. Female-friendly rides preferred!',
    isVerified: true,
    verificationStatus: 'verified',
    studentIdCardVerified: true,
    rating: 4.96,
    reviewCount: 48,
    ridesGivenCount: 42,
    ridesTakenCount: 15,
    totalSavingsEst: 580,
    co2SavedKg: 280,
    memberSince: 'Oct 2023',
    vehicle: {
      make: 'Subaru',
      model: 'Crosstrek AWD',
      year: 2022,
      color: 'Cool Gray Khaki',
      licensePlate: '5SBK912',
      type: 'suv',
      seatsTotal: 4
    },
    preferences: {
      music: true,
      smoking: false,
      pets: true,
      chattiness: 'flexible',
      luggageCapacity: 'large',
      genderPreference: 'female_only'
    }
  }
};

export const CAMPUS_LOCATIONS: LocationPoint[] = [
  { id: 'loc_01', name: 'Stanford University (Main Quad / Tresidder Union)', address: '459 Lagunita Dr, Stanford, CA', type: 'campus', landmark: 'Tresidder Student Union Circle' },
  { id: 'loc_02', name: 'SFO International Airport (Terminal 1-3 & International)', address: 'San Francisco, CA 94128', type: 'airport', landmark: 'Departures Level Drop-off Zone' },
  { id: 'loc_03', name: 'San Jose Diridon Caltrain & Amtrak Station', address: '65 Cahill St, San Jose, CA', type: 'railway', landmark: 'Main Station Roundabout' },
  { id: 'loc_04', name: 'UC Berkeley (Sproul Plaza & Telegraph Ave)', address: 'Bancroft Way & Telegraph, Berkeley, CA', type: 'campus', landmark: 'Sproul Hall Steps' },
  { id: 'loc_05', name: 'Downtown San Francisco (Salesforce Transit Center)', address: '425 Mission St, San Francisco, CA', type: 'bus_terminal', landmark: 'Bus Plaza Level 2' },
  { id: 'loc_06', name: 'San Jose State University (Student Union)', address: '1 Washington Sq, San Jose, CA', type: 'campus', landmark: '7th Street Plaza Entrance' },
  { id: 'loc_07', name: 'Palo Alto Caltrain Station (University Ave)', address: '95 University Ave, Palo Alto, CA', type: 'railway', landmark: 'East Depot Bay 3' },
  { id: 'loc_08', name: 'Oakland International Airport (OAK)', address: '1 Airport Dr, Oakland, CA', type: 'airport', landmark: 'Terminal 2 Passenger Pickup' },
  { id: 'loc_09', name: 'Silicon Valley Tech Park (Mountain View / Sunnyvale)', address: '1600 Amphitheatre Pkwy, Mountain View, CA', type: 'tech_park', landmark: 'Visitor Center Lot' },
  { id: 'loc_10', name: 'Fremont BART & Bus Hub', address: '2000 Bart Way, Fremont, CA', type: 'metro', landmark: 'West Concourse Kiss & Ride' }
];

export const INITIAL_RIDES: Ride[] = [
  {
    id: 'ride_101',
    driverId: 'usr_01',
    driver: MOCK_USERS.usr_01,
    origin: CAMPUS_LOCATIONS[0], // Stanford
    destination: CAMPUS_LOCATIONS[1], // SFO Airport
    waypoints: [CAMPUS_LOCATIONS[6]], // Palo Alto Caltrain
    departureDate: '2026-11-12',
    departureTime: '14:30',
    estimatedDuration: '42 mins',
    distanceKm: 38,
    totalSeats: 3,
    availableSeats: 2,
    pricePerSeat: 8,
    vehicle: MOCK_USERS.usr_01.vehicle!,
    notes: 'Heading to catch holiday flights! Can accommodate medium bags in trunk. Non-smoking, chilled music.',
    preferences: MOCK_USERS.usr_01.preferences,
    instantBooking: true,
    status: 'active',
    passengers: [
      {
        bookingId: 'bk_901',
        userId: 'usr_p1',
        name: 'David Kim',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200',
        college: 'Stanford University',
        seatsBooked: 1,
        pickupLocation: 'Tresidder Student Union Circle',
        dropoffLocation: 'SFO Terminal 2 (Delta/United)',
        status: 'confirmed',
        bookedAt: '2 hours ago'
      }
    ],
    reviews: [
      {
        id: 'rev_1',
        rideId: 'ride_101',
        reviewerId: 'usr_02',
        reviewerName: 'Alex Rivera',
        reviewerCollege: 'UC Berkeley',
        reviewerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
        rating: 5,
        comment: 'Priya was extremely punctual and drove very smoothly. Split the gas money instantly!',
        date: '3 days ago',
        tags: ['Punctual', 'Clean Car', 'Friendly']
      },
      {
        id: 'rev_2',
        rideId: 'ride_101',
        reviewerId: 'usr_04',
        reviewerName: 'Marcus Vance',
        reviewerCollege: 'SJSU',
        reviewerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
        rating: 5,
        comment: 'Great playlist and super chill commute. Highly recommended for airport runs.',
        date: '1 week ago',
        tags: ['Great Music', 'Safe Driver']
      }
    ],
    createdAt: '2026-11-10T10:00:00Z'
  },
  {
    id: 'ride_102',
    driverId: 'usr_02',
    driver: MOCK_USERS.usr_02,
    origin: CAMPUS_LOCATIONS[3], // UC Berkeley
    destination: CAMPUS_LOCATIONS[2], // San Jose Diridon
    waypoints: [CAMPUS_LOCATIONS[9]], // Fremont BART
    departureDate: '2026-11-12',
    departureTime: '17:15',
    estimatedDuration: '55 mins',
    distanceKm: 65,
    totalSeats: 3,
    availableSeats: 3,
    pricePerSeat: 11,
    vehicle: MOCK_USERS.usr_02.vehicle!,
    notes: 'Southbound evening commute across East Bay. Plenty of boot space for backpacks and luggage.',
    preferences: MOCK_USERS.usr_02.preferences,
    instantBooking: true,
    status: 'active',
    passengers: [],
    reviews: [
      {
        id: 'rev_3',
        rideId: 'ride_102',
        reviewerId: 'usr_03',
        reviewerName: 'Sarah Jenkins',
        reviewerCollege: 'Stanford University',
        reviewerAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200',
        rating: 5,
        comment: 'Super reliable! Left exactly on time from Sproul Plaza.',
        date: '2 weeks ago',
        tags: ['Punctual', 'Comfortable']
      }
    ],
    createdAt: '2026-11-09T18:00:00Z'
  },
  {
    id: 'ride_103',
    driverId: 'usr_03',
    driver: MOCK_USERS.usr_03,
    origin: CAMPUS_LOCATIONS[0], // Stanford
    destination: CAMPUS_LOCATIONS[4], // Downtown SF
    waypoints: [CAMPUS_LOCATIONS[6]], // Palo Alto
    departureDate: '2026-11-13',
    departureTime: '08:45',
    estimatedDuration: '48 mins',
    distanceKm: 52,
    totalSeats: 3,
    availableSeats: 1,
    pricePerSeat: 9,
    vehicle: MOCK_USERS.usr_03.vehicle!,
    notes: 'Friday morning commute into the City. Female students only please! Clean electric vehicle with heated seats.',
    preferences: MOCK_USERS.usr_03.preferences,
    instantBooking: false,
    status: 'active',
    passengers: [
      {
        bookingId: 'bk_902',
        userId: 'usr_p2',
        name: 'Mia Thorne',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
        college: 'Stanford University',
        seatsBooked: 2,
        pickupLocation: 'Tresidder Student Union Circle',
        dropoffLocation: 'Salesforce Transit Center Entrance',
        status: 'confirmed',
        bookedAt: 'Yesterday'
      }
    ],
    createdAt: '2026-11-09T20:30:00Z'
  },
  {
    id: 'ride_104',
    driverId: 'usr_04',
    driver: MOCK_USERS.usr_04,
    origin: CAMPUS_LOCATIONS[5], // SJSU
    destination: CAMPUS_LOCATIONS[8], // Silicon Valley Tech Park
    waypoints: [CAMPUS_LOCATIONS[2]], // San Jose Diridon
    departureDate: '2026-11-12',
    departureTime: '09:00',
    estimatedDuration: '25 mins',
    distanceKm: 22,
    totalSeats: 2,
    availableSeats: 2,
    pricePerSeat: 5,
    vehicle: MOCK_USERS.usr_04.vehicle!,
    notes: 'Heading to internship in Mountain View / Sunnyvale. Quick highway run. Good coffee stops!',
    preferences: MOCK_USERS.usr_04.preferences,
    instantBooking: true,
    status: 'active',
    passengers: [],
    createdAt: '2026-11-10T08:15:00Z'
  },
  {
    id: 'ride_105',
    driverId: 'usr_05',
    driver: MOCK_USERS.usr_05,
    origin: CAMPUS_LOCATIONS[3], // UC Berkeley
    destination: CAMPUS_LOCATIONS[1], // SFO Airport
    waypoints: [CAMPUS_LOCATIONS[4]], // SF Downtown
    departureDate: '2026-11-13',
    departureTime: '15:00',
    estimatedDuration: '50 mins',
    distanceKm: 42,
    totalSeats: 3,
    availableSeats: 3,
    pricePerSeat: 10,
    vehicle: MOCK_USERS.usr_05.vehicle!,
    notes: 'Pre-thanksgiving flight trip! Lots of room for luggage in the AWD Crosstrek. Ladies only ride.',
    preferences: MOCK_USERS.usr_05.preferences,
    instantBooking: false,
    status: 'active',
    passengers: [],
    createdAt: '2026-11-08T14:20:00Z'
  },
  {
    id: 'ride_106',
    driverId: 'usr_01',
    driver: MOCK_USERS.usr_01,
    origin: CAMPUS_LOCATIONS[0], // Stanford
    destination: CAMPUS_LOCATIONS[2], // San Jose Diridon
    waypoints: [],
    departureDate: '2026-11-14',
    departureTime: '10:00',
    estimatedDuration: '30 mins',
    distanceKm: 28,
    totalSeats: 3,
    availableSeats: 3,
    pricePerSeat: 6,
    vehicle: MOCK_USERS.usr_01.vehicle!,
    notes: 'Quick weekend run to San Jose train station for connections to Amtrak and coastal trains.',
    preferences: MOCK_USERS.usr_01.preferences,
    instantBooking: true,
    status: 'active',
    passengers: [],
    createdAt: '2026-11-10T12:00:00Z'
  }
];

export const INITIAL_USER_BOOKINGS: BookingRequest[] = [
  {
    id: 'bk_my_01',
    rideId: 'ride_101',
    ride: INITIAL_RIDES[0],
    passengerId: 'usr_me_01',
    passenger: CURRENT_USER,
    seats: 1,
    pickupLocation: 'Stanford Main Quad (Oval)',
    dropoffLocation: 'SFO Terminal 3 (United departures)',
    note: 'Hey Priya, looking forward to carpooling with you! Will bring one backpack and one rolling carry-on.',
    status: 'accepted',
    createdAt: '2026-11-10T09:30:00Z',
    totalAmount: 8
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif_01',
    userId: 'usr_me_01',
    title: 'Ride Confirmed!',
    message: 'Priya Sharma accepted your ride request for SFO Airport on Nov 12, 14:30.',
    timestamp: '1 hour ago',
    read: false,
    type: 'booking_accepted',
    linkTo: '/dashboard?tab=upcoming'
  },
  {
    id: 'notif_02',
    userId: 'usr_me_01',
    title: 'New Booking Request',
    message: 'David Kim requested 1 seat on your Menlo Park to Stanford Engineering ride.',
    timestamp: '3 hours ago',
    read: false,
    type: 'booking_request',
    linkTo: '/dashboard?tab=offered'
  },
  {
    id: 'notif_03',
    userId: 'usr_me_01',
    title: 'Carbon Milestone Achieved',
    message: 'You have prevented 185kg of CO2 emissions by carpooling with campus peers!',
    timestamp: 'Yesterday',
    read: true,
    type: 'system',
    linkTo: '/profile'
  }
];

export const POPULAR_ROUTES = [
  {
    from: 'Main Campus Quad',
    to: 'International Airport (SFO)',
    distance: '38 km',
    avgDuration: '40m',
    avgPrice: '$8 - $12',
    activeRidesCount: 14,
    badge: 'Popular for Flights'
  },
  {
    from: 'University Dorms',
    to: 'Diridon Railway & Caltrain',
    distance: '28 km',
    avgDuration: '30m',
    avgPrice: '$5 - $7',
    activeRidesCount: 22,
    badge: 'Weekend Rush'
  },
  {
    from: 'North Campus Gate',
    to: 'Downtown Tech Park Hub',
    distance: '22 km',
    avgDuration: '25m',
    avgPrice: '$4 - $6',
    activeRidesCount: 18,
    badge: 'Daily Commute'
  },
  {
    from: 'East Campus Housing',
    to: 'Central Metro & Bus Terminal',
    distance: '15 km',
    avgDuration: '20m',
    avgPrice: '$3 - $5',
    activeRidesCount: 31,
    badge: 'High Frequency'
  }
];

export const STUDENT_TESTIMONIALS = [
  {
    id: 'test_1',
    name: 'Ananya Roy',
    college: 'Stanford University (M.S. Robotics)',
    quote: 'CampusPool saved me over $450 in rideshare costs this semester alone! Plus, knowing that every co-rider has a verified student ID gives me total peace of mind.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    ridesTaken: 36,
    verifiedBadge: 'Verified .edu'
  },
  {
    id: 'test_2',
    name: 'Jordan Miller',
    college: 'UC Berkeley (B.S. Economics)',
    quote: 'I drive to the South Bay twice a week. By offering my 3 empty car seats to other students on CampusPool, my monthly fuel costs dropped to zero.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    ridesTaken: 52,
    verifiedBadge: 'Verified Student Driver'
  },
  {
    id: 'test_3',
    name: 'Kavita Patel',
    college: 'San Jose State University',
    quote: 'The female-only filter and university email validation makes travelling back from campus late at night so safe. The community vibe is genuinely unmatched.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200',
    ridesTaken: 28,
    verifiedBadge: 'Verified .edu'
  }
];

