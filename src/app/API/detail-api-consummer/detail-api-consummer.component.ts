import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-detail-api-consummer',
  templateUrl: './detail-api-consummer.component.html',
  styleUrls: ['./detail-api-consummer.component.css']
})
export class DetailApiConsummerComponent {
  @Input() selectedApis: any;

}
