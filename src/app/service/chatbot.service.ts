import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {ChatbotResponse} from "../model/chatbot-response.model";
import {Observable} from "rxjs";
import {LoginResponse} from "../model/login-response.model";

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {

  baseUrl = 'https://matizipi.pythonanywhere.com';

  constructor(private httpClient: HttpClient) { }


  getResponse(input: string){
    let queryParams = new HttpParams();
    queryParams = queryParams.append('input', input);

    return this.httpClient.get<ChatbotResponse>(this.baseUrl + '/chatbot', {params: queryParams});
  }

  uploadImage(imageData: File): Observable<LoginResponse> {
    // Prepare headers
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');

    // Prepare FormData
    const formData = new FormData();
    formData.append('image', imageData);

    // Send POST request
    return this.httpClient.post<LoginResponse>(this.baseUrl + '/upload', formData, { headers: headers });
  }
}
