import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { dealer } from './dealer';

@Injectable({
  providedIn: 'root'
})
export class DealerService {

  constructor(private httpClient: HttpClient) { }

  getAllDealers(): Observable<dealer[]>{
    return this.httpClient.get<dealer[]>(`http://localhost:1002/dealer/`);
  }

  getDealerById(id: number): Observable<any>{
    return this.httpClient.get<any>(`http://localhost:1002/dealer/${id}`);
  }

  addDealer(payload: any): Observable<any>{
     return this.httpClient.post<any>(`http://localhost:1002/dealer/addDealer`, payload);
  }

  updateDealer(payload: any): Observable<any>{
    return this.httpClient.put<any>('http://localhost:1002/dealer/updateDealer', payload);
  }

  deleteDealer(id:number): Observable<dealer>{
    return this.httpClient.delete<dealer>(`http://localhost:1002/dealer/deleteDealer/${id}`);
  }

  viewCrops(): Observable<any>{
    return this.httpClient.get<any>(`http://localhost:1002/dealer/viewCrops`);
  }

  getDealerByName(name: string): Observable<any>{
    return this.httpClient.get<any>(`http://localhost:1002/dealer/name/${name}`);
  }

}
