import database from './database';
class ProductService{

async getProducts(){
return await database.from('product').select('*');
}



async getProductDetails(id){
return await database
.from('product')
.select('*,product_rating(*),product_origin(*),product_taste(*),product_specification(name,description),product_standard(standard)')
.eq('id', id);
}



















}
export default ProductService;