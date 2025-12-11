import database from './database';
class BusinessService{

async business(){
return await database
.from('business')
.select('*');
}


async coffeeShopBusiness(){
return await database
.from('business')
.select('*')
 .or('category.eq.cafe,category.eq.coffee shop');
}


async businessDetails(id){
return await database
.from('business')
.select('*,product(*)')
.eq('id',id);
}





}

export default BusinessService;