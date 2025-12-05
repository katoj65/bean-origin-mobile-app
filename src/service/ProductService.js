import database from './database';
class ProductService{

async getProducts(){
return await database.from('product').select('*');
}



async getProductDetails(id){
return await database
.from('product')
.select('*,product_rating(*),product_taste(*),product_specification(name,description),product_standard(standard),product_origin(*,farm(name,profile(fname,lname,id)))').eq('id', id);
}



















}
export default ProductService;