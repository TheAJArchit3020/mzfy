// utils/formatDate.ts
export function formatDDMMMyyyy(iso: string) {
  const d = new Date(iso);
  const day = String(d.getDate()).padStart(2, '0');
  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  const month = monthNames[d.getMonth()];
  const year = d.getFullYear();
  return `${day} ${month} ${year}`;
}


export function formatDDMMMyyyy2(iso: string) {

  const date = new Date(iso);

  const formattedDate = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });

  return `${formattedDate}`
}


export function formatToDDMMMYYYY(iso: string) {
  if (!iso) return '';

  const date = new Date(iso);

  // Handle invalid dates
  if (isNaN(date.getTime())) return '';

  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short', // Gives "Jan", "Feb", etc.
    year: 'numeric',
  }).replace(/,/g, ''); // Remove any commas just in case
}