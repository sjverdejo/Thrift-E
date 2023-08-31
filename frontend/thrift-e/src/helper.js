
const convertDate = (d) => {
  const date = new Date(d)

  return date.toLocaleDateString('en-us', {year: 'numeric', month: 'short', day: 'numeric'})
} 

export default { convertDate }