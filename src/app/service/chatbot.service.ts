import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {ChatbotResponse} from "../model/chatbot-response.model";

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {

  constructor(private httpClient: HttpClient) { }


  getResponse(input: string){
    let queryParams = new HttpParams();
    queryParams.append('input', input);

    return this.httpClient.get<ChatbotResponse>('https://matizipi.pythonanywhere.com/', {params: queryParams});
  }
}
