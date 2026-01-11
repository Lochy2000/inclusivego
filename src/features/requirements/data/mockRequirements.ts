import { Accessibility, Eye, Ear, Brain } from 'lucide-react';
import type { Requirement } from '@/types';

export const mockRequirements: Requirement[] = [
  {
    id: 'wheelchair',
    label: 'Wheelchair Access',
    icon: Accessibility,
    color: 'text-blue-600'
  },
  {
    id: 'visual',
    label: 'Visual Aid',
    icon: Eye,
    color: 'text-purple-600'
  },
  {
    id: 'auditory',
    label: 'Hearing Support',
    icon: Ear,
    color: 'text-green-600'
  },
  {
    id: 'neuro',
    label: 'Quiet/Sensory',
    icon: Brain,
    color: 'text-orange-600'
  },
];
