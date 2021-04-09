class Employee {
    constructor(Employee_ID, First_Name, Last_Name, Middle_Name, Date_of_Birth, Gender, Phone_Number, Email, House_Number, Street_Name, City, _State, Zipcode, Employee_Photo,
        Employee_Status, UserID, UserPassword, Role_ID, Payrate, Created_At, Last_Changed_By, Last_Updated_At) {
        this.Employee_ID = Employee_ID;
        this.First_Name = First_Name;
        this.Last_Name = Last_Name;
        this.Middle_Name = Middle_Name;
        this.Date_of_Birth = Date_of_Birth;
        this.Gender = Gender;
        this.Phone_Number = Phone_Number;
        this.Email = Email;
        this.House_Number = House_Number;
        this.Street_Name = Street_Name;
        this.City = City;
        this._State = _State;
        this.Zipcode = Zipcode;
        this.Employee_Photo = Employee_Photo;
        this.Employee_Status = Employee_Status;
        this.UserID = UserID;
        this.UserPassword = UserPassword;
        this.Role_ID = Role_ID;
        this.Payrate = Payrate;
        this.Created_At = Created_At;
        this.Last_Changed_By = Last_Changed_By;
        this.Last_Updated_At = Last_Updated_At;
    };
};
module.exports = Employee;