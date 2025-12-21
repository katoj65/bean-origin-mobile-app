import database from './database';


class RatingService{

productRating(row){
if (!row) {
return 0;
}
const sum=row.reduce((total,n)=>total+n,0);
return sum;
}



createProductRating(obj){
return database
.from('product_rating')
.insert(obj);
}



async ratingPoints(){
return  await database
.from('rating_points')
.select('name,value,tag');
}





async getUserProductRating(pid,uid){
return await database
.from('product_rating')
.select('*')
.eq('product_id',pid)
.eq('user_id',uid);
}



//check if the user rated the product.
async checkUserProductRating(pid,uid){
const response=await database
.from('product_rating')
.select('*')
.eq('product_id',pid)
.eq('user_id',uid);
let data=response.data;
return data.length>0?true:false;
}



























}

export default RatingService;