export class User {

   constructor(
      public firstname:string,
      public lastname:string,
      public email:string,
      public password:string,
      public role:string = 'USER_ROLE',
      public auth:string = 'default',
      public img?:string,
      public _id?:string
   ){

   }
}