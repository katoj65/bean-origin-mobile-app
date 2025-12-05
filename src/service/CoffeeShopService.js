import database from './database';
class CoffeeShopService{

async getCoffeeShop(){
return await database.from('coffee_shop').select('*');
}



async coffeeShopDetails(id){
return await database.from('coffee_shop').select('*').eq('id',id);
}





}
export default CoffeeShopService;