import database from './database';


class RatingService{

productRating(row){
if (!row) {
return 0;
}
const sum=row.reduce((total,n)=>total+n,0);
return sum;
}



async createProductRating(obj){
return await database
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
.eq('profile_id',uid);
let data=response.data;
return data.length>0?true:false;
}



async getUsersRating(pid){
return await database
.from('product_rating')
.select('*,profile(fname,lname,image)')
.eq('product_id',pid)
.order('created_at', { ascending: false })
}




async productRatingStatistics(rate){
const scale=5;
//get arrays
const addItems=[];
const count=rate.length;
const sumCount=count*scale;
rate.forEach(element => {
addItems.push(element.rating);    
});
const sum=addItems.reduce((total,b)=>total+b,0);
return await [sum,sumCount];
}





























}

export default RatingService;