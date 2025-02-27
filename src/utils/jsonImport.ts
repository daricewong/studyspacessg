import { StudySpace } from '../data/studySpaces';

export const importStudySpacesFromJSON = async (url: string): Promise<StudySpace[]> => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data.studySpaces;
  } catch (error) {
    console.error('Error importing study spaces from JSON:', error);
    throw error;
  }
};