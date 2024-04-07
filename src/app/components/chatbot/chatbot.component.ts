import { Component } from '@angular/core';
import {ChatbotService} from "../../service/chatbot.service";
import {FormsModule, ReactiveFormsModule, UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";

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
}
