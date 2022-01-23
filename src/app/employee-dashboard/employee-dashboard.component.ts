import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {EmployeeModel} from "./employee-dashboard.model";
import {ApiService} from "../shared/api.service";
import any = jasmine.any;
import {subscribeOn} from "rxjs/operators";

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {

  formValue !: FormGroup;

  employeeModelObj : EmployeeModel = new EmployeeModel();

  employeedata !: any;

  showAdd !: boolean;
  showUpdate !: boolean;


  constructor(private formBuilder : FormBuilder, private api : ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      employee_id:[''],
      first_name:[''],
      last_name:[''],
      email:[''],
      phone_number:[''],
      nid:[''],
      address:['']
    })
    this.getAllEmployee();
  }

   clickAddEmployee(){
    this.formValue.reset();
    this.showAdd=true;
    this.showUpdate=false;
   }
  postEmployeeDetails(){
    this.employeeModelObj.employee_id= this.formValue.value.employee_id;
    this.employeeModelObj.first_name= this.formValue.value.first_name;
    this.employeeModelObj.last_name= this.formValue.value.last_name;
    this.employeeModelObj.email= this.formValue.value.email;
    this.employeeModelObj.phone_number= this.formValue.value.phone_number;
    this.employeeModelObj.nid= this.formValue.value.nid;
    this.employeeModelObj.address= this.formValue.value.address;

    this.api.postEmployee(this.employeeModelObj)
      .subscribe(res=>{
        console.log(res);
        alert("Add Successfully");
        let ref=document.getElementById("cancel")
        ref?.click();
        this.formValue.reset();
        this.getAllEmployee();
      },
        err=>{
        alert("Something went wrong.")
        })
  }

  getAllEmployee(){
    this.api.getEmployee()
      .subscribe(res=>{
        this.employeedata=res;
      })
    }

    deleteEmployee(row :any){
    this.api.deletedEmployee(row.id)
      .subscribe(res=>{
        alert("Employee Deleted");
        this.getAllEmployee();
      },
      err=>{
        alert("Something wrong");
      })
    }


    onEdit(row:any){
      this.showAdd=false;
      this.showUpdate=true;
      this.employeeModelObj.id=row.id;
      this.formValue.controls['employee_id'].setValue(row.employee_id);
      this.formValue.controls['first_name'].setValue(row.first_name);
      this.formValue.controls['last_name'].setValue(row.last_name);
      this.formValue.controls['email'].setValue(row.email);
      this.formValue.controls['phone_number'].setValue(row.phone_number);
      this.formValue.controls['nid'].setValue(row.nid);
      this.formValue.controls['address'].setValue(row.address);
    }


  updateEmployeeDetails(){
    this.employeeModelObj.employee_id= this.formValue.value.employee_id;
    this.employeeModelObj.first_name= this.formValue.value.first_name;
    this.employeeModelObj.last_name= this.formValue.value.last_name;
    this.employeeModelObj.email= this.formValue.value.email;
    this.employeeModelObj.phone_number= this.formValue.value.phone_number;
    this.employeeModelObj.nid= this.formValue.value.nid;
    this.employeeModelObj.address= this.formValue.value.address;

    this.api.updateEmployee(this.employeeModelObj,this.employeeModelObj.id)
      .subscribe(res=>{
        alert("Update Successfully")
        let ref=document.getElementById("cancel")
        ref?.click();
        this.formValue.reset();
        this.getAllEmployee();
      },
        err=>{
          alert("Something wrong");
        })
  }
}
