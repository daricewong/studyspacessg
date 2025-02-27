import Papa from 'papaparse';

export interface CSVStudySpace {
  ID: string;
  Division: string;
  Name: string;
  Address: string;
  'Opening Hours': string;
  Email: string;
  'Additional Information': string;
}

export const importStudySpacesFromCSV = async (url: string) => {
  return new Promise((resolve, reject) => {
    Papa.parse(url, {
      download: true,
      header: true,
      complete: (results) => {
        const studySpaces = (results.data as CSVStudySpace[])
          .filter(row => row.ID && row.Name) // Filter out any empty rows
          .map(row => ({
            id: parseInt(row.ID),
            division: row.Division,
            name: row.Name,
            address: row.Address,
            openingHours: row['Opening Hours'],
            email: row.Email,
            additionalInfo: row['Additional Information']
          }));
        resolve(studySpaces);
      },
      error: (error) => {
        reject(error);
      }
    });
  });
};