import {
  Component,
  effect,
  EventEmitter,
  inject,
  input,
  Input,
  Output,
  signal,
  WritableSignal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DisplayLocationComponent } from './weather-display-location/weather-display-location.component';

@Component({
  selector: 'search-results',
  standalone: true,
  templateUrl: './weather-search-results.component.html',
  styleUrl: './weather-search-results.component.css',
  imports: [DisplayLocationComponent],
})
export class SearchResultsComponent {
  searchResults: any = input([]);
  activatedRoute: any = inject(ActivatedRoute);
  @Output() selectedLocationParent = signal({});
  @Output() dataEmitter = new EventEmitter<boolean>();
  isLocationSelected: boolean = false;
  results$ = signal([]);
  async ngOnInit() {
    console.log('results Input', await this.searchResults());
    this.results$.set(await this.activatedRoute.snapshot.data.weatherResolver);
    console.log('results Input', await this.results$());
  }

  onShowLocationComponent(location: any) {
    this.isLocationSelected = !this.isLocationSelected;
    console.log('showing location selected', location);
    this.selectedLocationParent.set(location);
    console.log('this.selectedLocationParent', this.selectedLocationParent());
    this.sendData();
  }
  sendData() {
    this.dataEmitter.emit(this.isLocationSelected);
  }
}
