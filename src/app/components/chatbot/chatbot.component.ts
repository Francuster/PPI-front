import { Component } from '@angular/core';
import {ChatbotService} from "../../service/chatbot.service";
import {FormsModule, ReactiveFormsModule, UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {LoginResponse} from "../../model/login-response.model";

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.scss'
})
export class ChatbotComponent {

  loading: boolean = false;

  messageArray: string[] = [];

  loginSuccess = '';
  loginError = '';

  chatForm = new UntypedFormGroup(
    {
      input: new UntypedFormControl('', {validators: Validators.required})
    }
  )

  constructor(private chatbotService: ChatbotService) {
  }

  onSubmitMessaje() {
    if(this.chatForm.valid){

      this.loading = true;

      const inputText = this.chatForm.value.input;

      this.messageArray.push(inputText);

      this.chatbotService.getResponse(inputText).subscribe(
        {
          next: value => {
            this.messageArray.push(value.response);
            this.loading = false;
          },
          error: err => {
            this.loading = false;
          }
        }
      );
      this.chatForm.reset();
    }

  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.chatbotService.uploadImage(file).subscribe(
      {
        next: value => {
          if(value.authenticated){
            this.loginSuccess = 'Se inicio sesion correctamente! Bienvenido: ' + value.user;
            this.loginError = '';
          } else {
            this.loginError = 'Las credenciales ingresadas no son validas.';
            this.loginSuccess = '';
          }

        },
        error: err => {
          this.loginError = 'Las credenciales ingresadas no son validas.';
          this.loginSuccess = '';

        }
      }
    );


  }
}
