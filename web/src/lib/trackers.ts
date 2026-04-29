export interface TrackerItem {
  id: string;
  label: string;
  color: string;
  bg: string;
  textColor: string;
}

export interface TrackerGroup {
  group: string;
  items: TrackerItem[];
}

export const TRACKER_GROUPS: TrackerGroup[] = [
  { group: 'Movement', items: [
    { id: 'sleep',    label: 'Sleep',          color: '#534AB7', bg: '#EEEDFE', textColor: '#26215C' },
    { id: 'workout',  label: 'Workout',         color: '#2D5A27', bg: '#E4EEE2', textColor: '#1A3617' },
    { id: 'steps',    label: 'Steps / walking', color: '#0F6E56', bg: '#E1F5EE', textColor: '#085041' },
  ]},
  { group: 'Nutrition', items: [
    { id: 'meals',     label: 'Meals',      color: '#B84A1A', bg: '#FAECE7', textColor: '#6B2810' },
    { id: 'hydration', label: 'Hydration',  color: '#0B6E9E', bg: '#E6F1FB', textColor: '#0C447C' },
    { id: 'alcohol',   label: 'Alcohol',    color: '#BA7517', bg: '#FAEEDA', textColor: '#633806' },
    { id: 'caffeine',  label: 'Caffeine',   color: '#5F5E5A', bg: '#F1EFE8', textColor: '#2C2C2A' },
  ]},
  { group: 'Mind & Mood', items: [
    { id: 'mood',    label: 'Mood',             color: '#A03060', bg: '#FBEAF0', textColor: '#5A1830' },
    { id: 'anxiety', label: 'Anxiety / stress', color: '#993556', bg: '#FBEAF0', textColor: '#4B1528' },
    { id: 'focus',   label: 'Focus / brain fog',color: '#534AB7', bg: '#EEEDFE', textColor: '#26215C' },
  ]},
  { group: 'Body', items: [
    { id: 'weight', label: 'Weight',           color: '#666460', bg: '#F1EFE8', textColor: '#2C2C2A' },
    { id: 'pain',   label: 'Pain / symptoms',  color: '#C43A3A', bg: '#FCEBEB', textColor: '#6B1F1F' },
    { id: 'meds',   label: 'Medications',      color: '#2B72C2', bg: '#E6F1FB', textColor: '#0C447C' },
  ]},
  { group: 'Cycle', items: [
    { id: 'period',    label: 'Menstruation',   color: '#C04020', bg: '#FAECE7', textColor: '#6B2810' },
    { id: 'ovulation', label: 'Ovulation',      color: '#C06080', bg: '#FBEAF0', textColor: '#5A1830' },
    { id: 'fertile',   label: 'Fertile window', color: '#D090A8', bg: '#FBEAF0', textColor: '#993556' },
  ]},
  { group: 'Lifestyle', items: [
    { id: 'sunlight', label: 'Sunlight',    color: '#B07010', bg: '#FAEEDA', textColor: '#633806' },
    { id: 'screen',   label: 'Screen time', color: '#6B62CC', bg: '#EEEDFE', textColor: '#26215C' },
    { id: 'social',   label: 'Social time', color: '#2A8A6A', bg: '#E1F5EE', textColor: '#085041' },
    { id: 'journal',  label: 'Journaling',  color: '#8B8780', bg: '#F1EFE8', textColor: '#2C2C2A' },
  ]},
];

export function getTracker(id: string): TrackerItem | undefined {
  for (const g of TRACKER_GROUPS) {
    const found = g.items.find(it => it.id === id);
    if (found) return found;
  }
}
