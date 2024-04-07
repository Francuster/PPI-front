import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ChatbotService} from "./service/chatbot.service";
import {ChatbotComponent} from "./components/chatbot/chatbot.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ChatbotComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'PPI-front';


}
