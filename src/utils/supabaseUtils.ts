import { supabase } from '../lib/supabase';
import { StudySpace } from '../data/studySpaces';

export const fetchStudySpaces = async (): Promise<StudySpace[]> => {
  try {
    const { data, error } = await supabase
      .from('study_spaces_sg')
      .select('*')
      .order('id');

    if (error) {
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching study spaces from Supabase:', error);
    throw error;
  }
};