import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CropDetails } from '../cropdetails/cropdetails';
import { farmer } from './farmer';

@Injectable({
  providedIn: 'root'
})
export class FarmerService {

  constructor(private httpClient: HttpClient) { }

  getAllFarmers(): Observable<farmer[]>{
    return this.httpClient.get<farmer[]>(`http://localhost:1001/farmer/`);
  }

  getFarmerById(id: number): Observable<any>{
    return this.httpClient.get<any>(`http://localhost:1001/farmer/${id}`);
  }

  getFarmerByName(name: string): Observable<any>{
    return this.httpClient.get<any>(`http://localhost:1001/farmer/name/${name}`);
  }

  addFarmer(payload: any): Observable<any>{
     return this.httpClient.post<any>(`http://localhost:1001/farmer/addFarmer`, payload);
  }

  updateFarmer(payload: any): Observable<any>{
    return this.httpClient.put<any>('http://localhost:1001/farmer/updateFarmer', payload);
  }

  deleteFarmer(id:number): Observable<farmer>{
    return this.httpClient.delete<farmer>(`http://localhost:1001/farmer/deleteFarmer/${id}`);
  }

  addCrop(crop: any, fname: string): Observable<any>{
    return this.httpClient.post<any>(`http://localhost:1001/farmer/addCrop/${fname}`, crop);
  }

  updateCrop(crop: any, fname: string): Observable<any>{
    return this.httpClient.put<any>(`http://localhost:1001/farmer/updateCrop/${fname}`, crop);
  }

  deleteCrop(crop: any, fname: string): Observable<any>{
    return this.httpClient.put<any>(`http://localhost:1001/farmer/deleteCrop/${fname}`, crop);
  }
}
