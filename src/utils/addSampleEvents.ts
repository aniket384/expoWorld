import firebaseDatabase from '../services/firebaseDatabase';

// Sample events to populate Firebase Realtime Database
const sampleEvents = [
  {
    title: 'Food Fest 2024',
    location: 'Central Park',
    date: '2024-07-10',
    category: 'nearby',
    description: 'Annual food festival featuring local and international cuisines',
    image: 'https://example.com/food-fest.jpg',
    price: 50,
    capacity: 1000,
    booked: 250
  },
  {
    title: 'Tech Expo',
    location: 'City Hall',
    date: '2024-08-15',
    category: 'city',
    description: 'Latest technology showcase and networking event',
    image: 'https://example.com/tech-expo.jpg',
    price: 100,
    capacity: 500,
    booked: 180
  },
  {
    title: 'State Carnival',
    location: 'State Arena',
    date: '2024-09-01',
    category: 'state',
    description: 'State-wide carnival with rides, games, and entertainment',
    image: 'https://example.com/carnival.jpg',
    price: 25,
    capacity: 2000,
    booked: 750
  },
  {
    title: 'Big Business Summit',
    location: 'Expo Center',
    date: '2024-10-05',
    category: 'popular',
    description: 'Premier business networking and investment summit',
    image: 'https://example.com/business-summit.jpg',
    price: 200,
    capacity: 800,
    booked: 320
  },
  {
    title: 'Mega Trade Show',
    location: 'Grand Pavilion',
    date: '2024-11-20',
    category: 'big',
    description: 'Largest trade show in the region with 500+ exhibitors',
    image: 'https://example.com/trade-show.jpg',
    price: 75,
    capacity: 3000,
    booked: 1200
  },
  {
    title: 'Handicraft Mela',
    location: 'Art Plaza',
    date: '2024-12-12',
    category: 'city',
    description: 'Traditional handicrafts and artisan showcase',
    image: 'https://example.com/handicraft.jpg',
    price: 30,
    capacity: 600,
    booked: 150
  },
  {
    title: 'Startup Meet',
    location: 'Innovation Hub',
    date: '2024-08-22',
    category: 'nearby',
    description: 'Connect with innovative startups and investors',
    image: 'https://example.com/startup-meet.jpg',
    price: 40,
    capacity: 400,
    booked: 95
  }
];

// Function to add sample events to Firebase
export const addSampleEvents = async () => {
  try {
    console.log('Adding sample events to Firebase...');
    
    for (const event of sampleEvents) {
      await firebaseDatabase.addData('events', event);
    }
    
    console.log('✅ Sample events added successfully!');
    console.log('📱 Check your app - events should now appear in HomeScreen');
  } catch (error) {
    console.error('❌ Error adding sample events:', error);
  }
};

// Run this function to populate your database
// You can call this from anywhere in your app or run it once
// addSampleEvents();
