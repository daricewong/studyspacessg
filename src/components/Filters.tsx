import React from 'react';
import { StudySpace } from '../data/studySpaces';

interface FiltersProps {
  divisions: string[];
  selectedDivision: string;
  onDivisionChange: (division: string) => void;
  onOpenNowChange: (checked: boolean) => void;
  openNow: boolean;
}

const Filters: React.FC<FiltersProps> = ({
  divisions,
  selectedDivision,
  onDivisionChange,
  onOpenNowChange,
  openNow
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 w-full max-w-3xl mb-6">
      <div className="flex-1">
        <label htmlFor="division-filter" className="block text-sm font-medium text-gray-700 mb-1">
          Filter by Division
        </label>
        <select
          id="division-filter"
          value={selectedDivision}
          onChange={(e) => onDivisionChange(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Divisions</option>
          {divisions.map((division) => (
            <option key={division} value={division}>
              {division}
            </option>
          ))}
        </select>
      </div>
      
      <div className="flex items-end">
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={openNow}
            onChange={(e) => onOpenNowChange(e.target.checked)}
            className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <span className="ml-2 text-gray-700">Open Now</span>
        </label>
      </div>
    </div>
  );
};

export default Filters;