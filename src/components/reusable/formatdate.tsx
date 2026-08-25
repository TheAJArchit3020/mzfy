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


// export const formatDuration = (dateStr: string) => {
//   const end = new Date(dateStr);
//   const now = new Date();
//   let years = end.getFullYear() - now.getFullYear();
//   let months = end.getMonth() - now.getMonth();
//   let days = end.getDate() - now.getDate();

//   if (days < 0) {
//     months -= 1;
//     days += new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
//   }
//   if (months < 0) {
//     years -= 1;
//     months += 12;
//   }

//   if (years > 0) return `${years} yrs ${months} mos`;
//   if (months > 0) return `${months} mos ${days} days`;
//   return `${days} days`;
// };

export const formatDuration = (dateStr: string) => {
  if (!dateStr) return "-";
  const end = new Date(dateStr);
  const now = new Date();

  // difference in ms
  const diffMs = end.getTime() - now.getTime();
  // convert to days (round up so partial days count as a full day)
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  return `${diffDays} days`;
};
