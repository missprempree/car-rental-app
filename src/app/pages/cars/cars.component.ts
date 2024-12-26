import { HttpClient } from '@angular/common/http';
import { Component, inject, Injectable, signal } from '@angular/core';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { catchError, map, Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cars',
  imports: [AsyncPipe],
  templateUrl: './cars.component.html',
  styleUrl: './cars.component.css'
})

export class CarsComponent {

  // Initial state
  initialCarFormData = {
    carId: 0,
    brand: "",
    model: "",
    year: 0,
    color: "",
    dailyRate: 0,
    carImage: "",
    regNo: ""
  };

  carFormData = signal({
      carId: 0,
      brand: "",
      model: "",
      year: 0,
      color: "",
      dailyRate: 0,
      carImage: "",
      regNo: ""
  });

  http = inject(HttpClient);  
  // Need to declare provideHttpClient() in app.config.ts because HttpClientModule and app.module.ts are deprecated 
 
  carList$: Observable<any[]> = new Observable<any[]>;
  
  apiUrl: string = "api/api/CarRentalApp/";
  // apiUrl2: string = "/api/CarRentalApp/";

  constructor(){
    this.loadCarList()
    /*
    this.carList$ = this.http.get<any[]>(`${this.apiUrl}GetCars`).pipe(
      map((result:any)=>{
        if (!result || !result.data) {
          throw new Error('Unexpected response structure')
        }
        return result.data
      }),
      catchError((error) => {
        console.error('API error:', error)
        return of([]) // Return empty array on error
      })
    );*/
  }

   // Method to update the carList$ observable
   loadCarList() {
    this.carList$ = this.http.get<any[]>(`${this.apiUrl}GetCars`).pipe(
      map((result: any) => {
        if (!result || !result.data) {
          throw new Error('Unexpected response structure');
        }
        return result.data;
      }),
      catchError((error) => {
        console.error('API error:', error);
        return of([]); // Return empty array on error
      })
    );
  }

  /*
  getUser(id: string): Observable<User> {
    return this.http.get<User>(`/api/user/${id}`);
  }*/
  updateForm(key: string, event: any) {
    this.carFormData.update((data:any)=> ({...data,[key]:event.target.value}))
  }

  onSave() {
    this.http.post(`${this.apiUrl}CreateNewCar`,this.carFormData()).subscribe((resultData:any)=>{
      if(resultData.result){
        alert("Car has been created successful!")
        this.resetForm()
        this.loadCarList() // Reload the car list
      } else {
        alert(resultData.message)
      }
    })
  }

  // Reset Form
  resetForm() {
      this.carFormData.set({ ...this.initialCarFormData })
  }

  onEdit(data: any) {
      this.carFormData.set(data)  // Update the signal with the new data
  }

  onAdd() {
    this.resetForm()
    this.carFormData()
  }

  onUpdate() {
    this.http.put(`${this.apiUrl}UpdateCar`,this.carFormData()).subscribe((resultObj:any)=>{
      if (resultObj.result) {
          alert("Car has been updated successfully!")
          this.loadCarList() // Reload the car list
          //this.resetForm()
      }else{
          alert(resultObj.message)
      }
    })
  }
  
  onDelete(id: number) {
    const isDelete = confirm("Are you sure wanting to Delete?");
    if(isDelete){
        this.http.delete(this.apiUrl + "DeleteCarbyCarId?carid=" + id).subscribe((resultObj: any)=>{
        if (resultObj.result) {
            alert("Car has been deleted successfully!")
            this.resetForm()
            this.loadCarList() // Reload the car list
        } else {
            alert(resultObj.message)
        }
      })

    }
    
  }


}
