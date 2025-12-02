class DateService{


formatDate(item){
const date = new Date(item);
const formatted = date.toLocaleDateString("en-GB", {
day: "2-digit",
month: "2-digit",
year: "numeric"
});
return formatted;
}


formatDateAmerican(item){
const date = new Date(item);
const formatted = date.toLocaleDateString("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric"
});
return formatted;
}









}
export default DateService;