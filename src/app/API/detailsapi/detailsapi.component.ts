import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-detailsapi',
  templateUrl: './detailsapi.component.html',
  styleUrls: ['./detailsapi.component.css']
})
export class DetailsapiComponent {
  @Input() selectedApi: any;

}
