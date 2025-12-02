import database from './database';
class ProductService{

async getProducts(){
return await database.from('product').select('*');
}












}
export default ProductService;