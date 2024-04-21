import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OpenAiService {
  http = inject(HttpClient);
  clothingSuggestions = signal<any>([]);
  async getClothingSuggestions(location: string, temperature: number) {
    const body = { location, temperature };
    const response = await fetch(
      'http://localhost:4000/api/clothing-suggestions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      },
    );
    const data = await response.json();
    console.log('response', data);
    this.clothingSuggestions.set(data);
    return this.clothingSuggestions;
  }
}
