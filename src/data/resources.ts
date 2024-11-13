import { Resource } from '../types';

export const resources: Resource[] = [
  {
    id: '1',
    name: 'Nairobi Food Bank',
    type: 'food',
    description: 'Providing fresh and nutritious food to families in need',
    address: 'Ngong Road, Nairobi',
    phone: '+254 700 123 456',
    hours: 'Mon-Fri: 9AM-5PM',
    image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80',
    services: ['Food Distribution', 'Nutrition Education', 'Emergency Food Boxes'],
    coordinates: {
      lat: -1.2921,
      lng: 36.8219
    }
  },
  {
    id: '2',
    name: 'Mombasa Safe Haven',
    type: 'shelter',
    description: 'Emergency shelter and support services',
    address: 'Nyali Road, Mombasa',
    phone: '+254 711 987 654',
    hours: '24/7',
    image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80',
    services: ['Emergency Housing', 'Case Management', 'Mental Health Support'],
    coordinates: {
      lat: -4.0435,
      lng: 39.6682
    }
  },
  {
    id: '3',
    name: 'Kisumu Health Center',
    type: 'health',
    description: 'Affordable healthcare services for all',
    address: 'Oginga Odinga Street, Kisumu',
    phone: '+254 722 246 813',
    hours: 'Mon-Sat: 8AM-8PM',
    image: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&q=80',
    services: ['Primary Care', 'Mental Health', 'Dental Services'],
    coordinates: {
      lat: -0.1022,
      lng: 34.7617
    }
  },
  {
    id: '4',
    name: 'Nakuru Skills Center',
    type: 'employment',
    description: 'Empowering job seekers with skills and opportunities',
    address: 'Kenyatta Avenue, Nakuru',
    phone: '+254 733 789 012',
    hours: 'Mon-Fri: 8AM-6PM',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80',
    services: ['Resume Writing', 'Job Training', 'Career Counseling', 'Interview Prep'],
    coordinates: {
      lat: -0.2833,
      lng: 36.0667
    }
  },
  {
    id: '5',
    name: 'Eldoret Education Hub',
    type: 'education',
    description: 'Free adult education and literacy programs',
    address: 'Uganda Road, Eldoret',
    phone: '+254 744 234 567',
    hours: 'Mon-Thu: 9AM-9PM, Fri: 9AM-5PM',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80',
    services: ['Adult Education', 'Computer Skills', 'Financial Literacy'],
    coordinates: {
      lat: 0.5143,
      lng: 35.2698
    }
  },
  {
    id: '6',
    name: 'Thika Community Market',
    type: 'food',
    description: 'Community market offering affordable fresh produce',
    address: 'Kenyatta Highway, Thika',
    phone: '+254 755 345 678',
    hours: 'Tue-Sun: 8AM-6PM',
    image: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&q=80',
    services: ['Fresh Produce', 'Community Garden', 'Cooking Classes'],
    coordinates: {
      lat: -1.0396,
      lng: 37.0900
    }
  },
  {
    id: '7',
    name: 'Malindi Shelter Home',
    type: 'shelter',
    description: 'Transitional housing and support for families',
    address: 'Lamu Road, Malindi',
    phone: '+254 766 456 789',
    hours: '24/7',
    image: 'https://images.unsplash.com/photo-1469022563428-aa04fef9f5a2?auto=format&fit=crop&q=80',
    services: ['Family Housing', 'Child Care', 'Job Search Assistance'],
    coordinates: {
      lat: -3.2138,
      lng: 40.1169
    }
  },
  {
    id: '8',
    name: 'Machakos Wellness Center',
    type: 'health',
    description: 'Holistic health services and mental wellness support',
    address: 'Machakos Town',
    phone: '+254 777 567 890',
    hours: 'Mon-Fri: 7AM-8PM',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80',
    services: ['Counseling', 'Support Groups', 'Health Education'],
    coordinates: {
      lat: -1.5177,
      lng: 37.2634
    }
  },
  {
    id: '9',
    name: 'Kitale Digital Hub',
    type: 'education',
    description: 'Free technology training for career advancement',
    address: 'Kitale Town',
    phone: '+254 788 678 901',
    hours: 'Mon-Fri: 9AM-7PM',
    image: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&q=80',
    services: ['Digital Literacy', 'Computer Training', 'Internet Access'],
    coordinates: {
      lat: 1.0167,
      lng: 35.0000
    }
  },
  {
    id: '10',
    name: 'Nyeri Employment Center',
    type: 'employment',
    description: 'Connecting local businesses with job seekers',
    address: 'Nyeri Town',
    phone: '+254 799 789 012',
    hours: 'Mon-Fri: 8:30AM-5:30PM',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80',
    services: ['Job Placement', 'Skills Assessment', 'Business Development'],
    coordinates: {
      lat: -0.4167,
      lng: 36.9500
    }
  }
];