export class users {
    id?: number;
    first_name: String;
    last_name: String;
    email: String;
    password: String;
    points: Number;
    roleId: Number;
    createdAt: Date;
    updatedAt: Date;

    constructor(first_name:String,last_name:String, email:String, password:String, points:Number, roleId:Number, createdAt:Date, updateAt:Date){
      this.first_name = first_name;
      this.last_name = last_name;
      this.email = email;
      this.password = password;
      this.points = points;
      this.roleId = roleId;
      this.createdAt = createdAt;
      this.updatedAt = updateAt;
    }
  }

