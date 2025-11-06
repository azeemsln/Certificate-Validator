 const calculateDurationInMonths = (startDate, endDate) => {
    if (!startDate || !endDate) return "N/A";
  
    // Create Date objects from the ISO strings
    const start = new Date(startDate);
    const end = new Date(endDate);
  
    // Calculate the difference in years and months
    const yearDiff = end.getFullYear() - start.getFullYear();
    const monthDiff = end.getMonth() - start.getMonth();
  
    // Total months: (years * 12) + difference in months
    const totalMonths = yearDiff * 12 + monthDiff;
    
    // Check for negative duration (should not happen with valid data)
    if (totalMonths < 0) return "Invalid Duration";
  
    // Format the result
    if (totalMonths === 1) {
        return "1 Month";
    } else if (totalMonths > 0) {
        // Calculate years and remaining months for better readability if duration is long
        const years = Math.floor(totalMonths / 12);
        const months = totalMonths % 12;
        
        let durationString = "";
        if (years > 0) {
            durationString += `${years} Year${years > 1 ? 's' : ''}`;
        }
        if (months > 0) {
            if (years > 0) durationString += " and ";
            durationString += `${months} Month${months > 1 ? 's' : ''}`;
        }
        
        return durationString || "Less than 1 Month";
        
    } else {
        return "Not Started";
    }
  };
  export default calculateDurationInMonths