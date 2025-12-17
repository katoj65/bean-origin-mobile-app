class RatingService{

productRating(row){
if (!row) {
return 0;
}
const sum=row.reduce((total,n)=>total+n,0);
return sum;
}












}

export default RatingService;