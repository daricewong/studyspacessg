export const isOpenNow = (openingHours: string): boolean => {
  const now = new Date();
  const dayOfWeek = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
  const currentHour = now.getHours();
  
  // Convert day names to numbers for comparison
  const dayMap: Record<string, number> = {
    'monday': 1,
    'tuesday': 2,
    'wednesday': 3,
    'thursday': 4,
    'friday': 5,
    'saturday': 6,
    'sunday': 0,
    'mon': 1,
    'tue': 2,
    'wed': 3,
    'thu': 4,
    'thur': 4,
    'thurs': 4,
    'fri': 5,
    'sat': 6,
    'sun': 0,
    'daily': -1, // Special case for daily
    'everyday': -1, // Special case for everyday
  };
  
  // Check if it's a public holiday (simplified - would need actual PH calendar in real app)
  if (openingHours.toLowerCase().includes('except ph') || 
      openingHours.toLowerCase().includes('except public holiday')) {
    // For demo purposes, we'll assume it's not a public holiday
    // In a real app, you would check against a calendar of public holidays
  }
  
  // Check if the place is open daily
  if (openingHours.toLowerCase().includes('daily') || 
      openingHours.toLowerCase().includes('everyday') ||
      openingHours.toLowerCase().includes('7 day')) {
    // Extract time ranges
    return checkTimeRanges(openingHours, currentHour);
  }
  
  // Check if today is mentioned in the opening hours
  const lowerCaseHours = openingHours.toLowerCase();
  const today = Object.keys(dayMap).find(day => 
    dayMap[day] === dayOfWeek && lowerCaseHours.includes(day)
  );
  
  if (today) {
    return checkTimeRanges(openingHours, currentHour);
  }
  
  // Check for ranges like "Mon-Fri"
  const rangeRegex = /(mon|tue|wed|thu|thur|thurs|fri|sat|sun)\s*[-–—]\s*(mon|tue|wed|thu|thur|thurs|fri|sat|sun)/gi;
  const ranges = [...openingHours.matchAll(rangeRegex)];
  
  for (const range of ranges) {
    const startDay = dayMap[range[1].toLowerCase()];
    const endDay = dayMap[range[2].toLowerCase()];
    
    if (startDay <= dayOfWeek && dayOfWeek <= endDay) {
      return checkTimeRanges(openingHours, currentHour);
    }
    
    // Handle wrapping around the week (e.g., Fri-Mon)
    if (startDay > endDay && (dayOfWeek >= startDay || dayOfWeek <= endDay)) {
      return checkTimeRanges(openingHours, currentHour);
    }
  }
  
  return false;
};

const checkTimeRanges = (openingHours: string, currentHour: number): boolean => {
  // Extract time ranges like "10am to 6pm" or "2pm-5pm"
  const timeRangeRegex = /(\d+)(?::(\d+))?\s*(am|pm)\s*(?:to|-|–|—)\s*(\d+)(?::(\d+))?\s*(am|pm)/gi;
  const timeRanges = [...openingHours.matchAll(timeRangeRegex)];
  
  for (const range of timeRanges) {
    let startHour = parseInt(range[1]);
    const startMinute = range[2] ? parseInt(range[2]) : 0;
    const startPeriod = range[3].toLowerCase();
    
    let endHour = parseInt(range[4]);
    const endMinute = range[5] ? parseInt(range[5]) : 0;
    const endPeriod = range[6].toLowerCase();
    
    // Convert to 24-hour format
    if (startPeriod === 'pm' && startHour < 12) startHour += 12;
    if (startPeriod === 'am' && startHour === 12) startHour = 0;
    if (endPeriod === 'pm' && endHour < 12) endHour += 12;
    if (endPeriod === 'am' && endHour === 12) endHour = 0;
    
    // Check if current time is within range
    if (currentHour >= startHour && currentHour < endHour) {
      return true;
    }
  }
  
  return false;
};