import { Component } from '@angular/core';
import { BorderOverDirective } from '../common/directive/border-over.directive';

@Component({
  selector: 'app-welcome',
  imports: [BorderOverDirective],
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss', '../common/style/common.scss']
})
export class WelcomeComponent {

}
