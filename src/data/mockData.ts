export interface CrisisEvent {
  id: string;
  title: string;
  description: string;
  eventType: 'Flood' | 'Heatwave' | 'Cyclone' | 'Health Alert' | 'Civic Issue' | 'Earthquake' | 'Drought';
  severity: 'Low' | 'Medium' | 'High';
  location: {
    name: string;
    lat: number;
    lng: number;
    state: string;
  };
  timestamp: string;
  source: string;
  affectedAreas: string[];
  status: 'Active' | 'Monitoring' | 'Resolved';
}

export const mockEvents: CrisisEvent[] = [
  {
    id: '1',
    title: 'Severe Flooding in Kerala',
    description: 'Heavy monsoon rains have caused severe flooding in multiple districts of Kerala. Water levels in major rivers are above danger mark.',
    eventType: 'Flood',
    severity: 'High',
    location: {
      name: 'Kochi',
      lat: 9.9312,
      lng: 76.2673,
      state: 'Kerala'
    },
    timestamp: '2025-08-02T08:30:00Z',
    source: 'IMD Kerala',
    affectedAreas: ['Ernakulam', 'Alappuzha', 'Kottayam'],
    status: 'Active'
  },
  {
    id: '2',
    title: 'Extreme Heat Wave Warning',
    description: 'Temperatures soaring above 45°C in Rajasthan. Red alert issued for next 48 hours.',
    eventType: 'Heatwave',
    severity: 'High',
    location: {
      name: 'Jaipur',
      lat: 26.9124,
      lng: 75.7873,
      state: 'Rajasthan'
    },
    timestamp: '2025-08-02T06:00:00Z',
    source: 'IMD Rajasthan',
    affectedAreas: ['Jaipur', 'Jodhpur', 'Bikaner'],
    status: 'Active'
  },
  {
    id: '3',
    title: 'Cyclone Alert - Bay of Bengal',
    description: 'Low pressure area developing into cyclonic storm. Coastal areas advised to be on high alert.',
    eventType: 'Cyclone',
    severity: 'Medium',
    location: {
      name: 'Visakhapatnam',
      lat: 17.7231,
      lng: 83.3012,
      state: 'Andhra Pradesh'
    },
    timestamp: '2025-08-02T04:15:00Z',
    source: 'NDMA',
    affectedAreas: ['Visakhapatnam', 'Srikakulam', 'East Godavari'],
    status: 'Monitoring'
  },
  {
    id: '4',
    title: 'Delhi Air Quality Alert',
    description: 'Air Quality Index reaches severe category. Health advisory issued for vulnerable groups.',
    eventType: 'Health Alert',
    severity: 'Medium',
    location: {
      name: 'New Delhi',
      lat: 28.6139,
      lng: 77.2090,
      state: 'Delhi'
    },
    timestamp: '2025-08-02T07:00:00Z',
    source: 'CPCB',
    affectedAreas: ['Central Delhi', 'South Delhi', 'Gurgaon'],
    status: 'Active'
  },
  {
    id: '5',
    title: 'Water Crisis in Chennai',
    description: 'Acute water shortage reported in several areas. Municipal corporation working on emergency supplies.',
    eventType: 'Civic Issue',
    severity: 'Medium',
    location: {
      name: 'Chennai',
      lat: 13.0827,
      lng: 80.2707,
      state: 'Tamil Nadu'
    },
    timestamp: '2025-08-01T18:45:00Z',
    source: 'Chennai Corporation',
    affectedAreas: ['Anna Nagar', 'T. Nagar', 'Velachery'],
    status: 'Monitoring'
  },
  {
    id: '6',
    title: 'Minor Earthquake Recorded',
    description: 'Earthquake of magnitude 4.2 recorded. No casualties reported. Buildings inspected for damage.',
    eventType: 'Earthquake',
    severity: 'Low',
    location: {
      name: 'Shimla',
      lat: 31.1048,
      lng: 77.1734,
      state: 'Himachal Pradesh'
    },
    timestamp: '2025-08-01T22:30:00Z',
    source: 'IMD Seismology',
    affectedAreas: ['Shimla', 'Solan', 'Kasauli'],
    status: 'Resolved'
  }
];

export const healthStats = {
  activeDiseaseOutbreaks: 3,
  airQualityAlerts: 12,
  waterQualityIssues: 8,
  hospitalCapacity: '78%'
};

export const resilienceResources = [
  {
    title: 'NDMA Guidelines',
    description: 'National Disaster Management Authority comprehensive guidelines',
    category: 'Official',
    link: '#'
  },
  {
    title: 'Emergency Contacts',
    description: 'State-wise emergency contact numbers and helplines',
    category: 'Emergency',
    link: '#'
  },
  {
    title: 'Preparedness Checklist',
    description: 'Disaster preparedness checklist for households',
    category: 'Preparation',
    link: '#'
  },
  {
    title: 'Volunteer Registration',
    description: 'Register as a volunteer for disaster response',
    category: 'Community',
    link: '#'
  }
];