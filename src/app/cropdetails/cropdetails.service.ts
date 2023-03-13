import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CropDetails } from './cropdetails';

@Injectable({
  providedIn: 'root'
})
export class CropdetailsService {

  constructor(private httpClient: HttpClient) { }

  getAllCrops(): Observable<CropDetails[]>{
    return this.httpClient.get<CropDetails[]>(`http://localhost:1003/cropDetails/`);
  }

  getCropById(id: number): Observable<any>{
    return this.httpClient.get<any>(`http://localhost:1003/cropDetails/${id}`);
  }

  addCrop(payload: any): Observable<any>{
     return this.httpClient.post<any>(`http://localhost:1003/cropDetails/addCropDetails`, payload);
  }

  updateCrop(payload: any): Observable<any>{
    return this.httpClient.put<any>('http://localhost:1003/cropDetails/updateCropDetails', payload);
  }

  deleteCrop(id:number): Observable<CropDetails>{
    return this.httpClient.delete<CropDetails>(`http://localhost:1003/cropDetails/deleteCropDetails/${id}`);
  }
}
