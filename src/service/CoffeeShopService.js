import database from './database';
class CoffeeShopService{

async getCoffeeShop(){
return await database.from('coffee_shop').select('*');
}



async coffeeShopDetails(id){
return await database.from('coffee_shop').select('*,coffee_shop_amenity(name,icon),business(id,product(*)),coffee_shop_rating(*)').eq('id',id);
}





}
export default CoffeeShopService;