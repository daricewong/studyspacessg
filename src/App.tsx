import React, { useState, useMemo, useEffect } from 'react';
import { StudySpace } from './data/studySpaces';
import SearchBar from './components/SearchBar';
import Filters from './components/Filters';
import StudySpaceCard from './components/StudySpaceCard';
import { isOpenNow } from './utils/dateUtils';
import { fetchStudySpaces } from './utils/supabaseUtils';
import { BookOpen, MapPin } from 'lucide-react';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDivision, setSelectedDivision] = useState('');
  const [openNowFilter, setOpenNowFilter] = useState(false);
  const [studySpaces, setStudySpaces] = useState<StudySpace[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch study spaces data from Supabase
  useEffect(() => {
    const loadStudySpaces = async () => {
      try {
        const spaces = await fetchStudySpaces();
        setStudySpaces(spaces);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching study spaces:', err);
        setError('Failed to load study spaces data. Please try again later.');
        setIsLoading(false);
      }
    };

    loadStudySpaces();
  }, []);

  // Extract unique divisions for the filter dropdown
  const divisions = useMemo(() => {
    const uniqueDivisions = new Set(studySpaces.map(space => space.division));
    return Array.from(uniqueDivisions).sort();
  }, [studySpaces]);

  // Filter study spaces based on search query and filters
  const filteredSpaces = useMemo(() => {
    return studySpaces.filter(space => {
      // Search query filter
      const matchesSearch = searchQuery === '' || 
        space.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        space.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        space.division.toLowerCase().includes(searchQuery.toLowerCase()) ||
        space.additionalInfo.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Division filter
      const matchesDivision = selectedDivision === '' || space.division === selectedDivision;
      
      // Open now filter
      const matchesOpenNow = !openNowFilter || isOpenNow(space.openingHours);
      
      return matchesSearch && matchesDivision && matchesOpenNow;
    });
  }, [searchQuery, selectedDivision, openNowFilter, studySpaces]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-600 text-white py-6 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center mb-4">
            <BookOpen className="w-8 h-8 mr-2" />
            <h1 className="text-3xl font-bold">Singapore Study Spaces</h1>
          </div>
          <p className="text-center text-blue-100 mb-6">
            Find the perfect place to study across Singapore
          </p>
          <div className="flex justify-center">
            <SearchBar onSearch={setSearchQuery} />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-center mb-8">
          <Filters 
            divisions={divisions}
            selectedDivision={selectedDivision}
            onDivisionChange={setSelectedDivision}
            openNow={openNowFilter}
            onOpenNowChange={setOpenNowFilter}
          />
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading study spaces...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12 text-red-500">
            <p>{error}</p>
          </div>
        ) : (
          <>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800">
                {filteredSpaces.length} Study Spaces Found
              </h2>
              {openNowFilter && (
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  Open Now
                </span>
              )}
            </div>

            {filteredSpaces.length === 0 ? (
              <div className="text-center py-12">
                <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-600 mb-2">No study spaces found</h3>
                <p className="text-gray-500">Try adjusting your filters or search query</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSpaces.map(space => (
                  <StudySpaceCard key={space.id} space={space} />
                ))}
              </div>
            )}
          </>
        )}
      </main>

      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} Singapore Study Spaces Finder</p>
          <p className="text-gray-400 text-sm mt-2">
            Find the perfect study spot in your neighborhood
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;