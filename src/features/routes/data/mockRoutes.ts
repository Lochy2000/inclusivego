import { Train, Bus, Footprints } from 'lucide-react';
import type { Route } from '@/types';

export const mockRoutes: Route[] = [
  {
    id: 1,
    origin: "Central Station",
    destination: "Modern Art Museum",
    duration: "18 mins",
    distance: "1.2 km",
    type: "Public Transit",
    icons: [Train, Bus],
    score: 98,
    features: ["Step-free access", "Braille signage", "Hearing loops"],
    tags: ["Wheelchair", "Visual", "Auditory"],
    status: "Clear",
    description: "A fully level route utilizing the new metro line and low-floor buses."
  },
  {
    id: 2,
    origin: "Greenwich Park",
    destination: "Library Square",
    duration: "25 mins",
    distance: "1.8 km",
    type: "Walking/Rolling",
    icons: [Footprints],
    score: 92,
    features: ["Smooth pavement", "Tactile paving", "Rest areas every 200m"],
    tags: ["Wheelchair", "Neurodivergent"],
    status: "Busy",
    description: "Avoids steep gradients. Includes several sensory-quiet zones."
  },
  {
    id: 3,
    origin: "East Plaza",
    destination: "Harbor Point",
    duration: "12 mins",
    distance: "0.8 km",
    type: "Shuttle",
    icons: [Bus],
    score: 85,
    features: ["Assisted boarding", "Spacious interior"],
    tags: ["Wheelchair"],
    status: "10m delay",
    description: "Electric shuttle service with ramp deployment at every stop."
  }
];
