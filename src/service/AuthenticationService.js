import database from './database';
class AuthenticationService {
  


async register(form){
return await  database.auth.signUp({
  email:form.email,
  password:form.password,
});
}



async login(form){
return await database.auth.signInWithPassword({
  email:form.email,
  password:form.password,
});
}


async createProfile(profile){
return await database.from('profile').insert([profile]).select();
}


async getProfile(email){
return await database
.from('profile')
.select('*')
.eq('email', email);
}


async logout(){
return await database.auth.signOut();
}

async getUser(){
return await database.auth.getUser();
}








}

export default  AuthenticationService;