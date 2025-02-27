import React from 'react';
import { StudySpace } from '../data/studySpaces';
import { MapPin, Clock, Mail, Info } from 'lucide-react';

interface StudySpaceCardProps {
  space: StudySpace;
}

const StudySpaceCard: React.FC<StudySpaceCardProps> = ({ space }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-5">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{space.name}</h3>
          <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
            {space.division}
          </span>
        </div>
        
        <div className="mt-4 space-y-3">
          <div className="flex items-start">
            <MapPin className="w-5 h-5 text-gray-500 mr-2 mt-0.5 flex-shrink-0" />
            <p className="text-gray-600">{space.address}</p>
          </div>
          
          <div className="flex items-start">
            <Clock className="w-5 h-5 text-gray-500 mr-2 mt-0.5 flex-shrink-0" />
            <p className="text-gray-600">{space.openingHours}</p>
          </div>
          
          {space.email && (
            <div className="flex items-start">
              <Mail className="w-5 h-5 text-gray-500 mr-2 mt-0.5 flex-shrink-0" />
              <p className="text-gray-600 break-all">{space.email}</p>
            </div>
          )}
          
          {space.additionalInfo && (
            <div className="flex items-start">
              <Info className="w-5 h-5 text-gray-500 mr-2 mt-0.5 flex-shrink-0" />
              <p className="text-gray-600">{space.additionalInfo}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudySpaceCard;