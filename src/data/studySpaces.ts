export interface StudySpace {
  id: number;
  division: string;
  name: string;
  address: string;
  openingHours: string;
  email: string;
  additionalInfo: string;
}

// This is a placeholder array that will be replaced with data from Supabase
export const studySpaces: StudySpace[] = [];