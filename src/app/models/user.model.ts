export class User {

   constructor(
      public firstname:string,
      public lastname:string,
      public email:string,
      public password:string,
      public img?:string,
      public _id?:string,
      public _role:string = 'USER_ROLE',
      public auth?,
   ){

   }
}