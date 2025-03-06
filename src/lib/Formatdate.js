export function formatDate(date) {
  // Create a new Date object from the input string
  const newDate = new Date(date);

  // Format the date to a human-readable format
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  // Format and return the string
  const formattedDate = newDate.toLocaleDateString("en-US", options);

  return `Published on ${formattedDate}`;
}

// Example usage:
//   const date = "2022-12-03T10:00:00.000Z";
//   console.log(formatPublishedDate(date)); // Output: "Published on December 3, 2022"
