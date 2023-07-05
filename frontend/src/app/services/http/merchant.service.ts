import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { WebSocketSubject, webSocket } from 'rxjs/webSocket';
// import { Observable } from 'rxjs';

const API = environment.apiURL;

@Injectable({
	providedIn: 'root'
})
export class MerchantService {
	private user: any = JSON.parse(localStorage.getItem('user') || '{}');
	constructor(
		private httpClient: HttpClient
	) { }


	get() {
		return this.httpClient.get(`${API}merchant?external_reference_merchant=${this.user.external_reference_merchant}`);
	}

	update(merchant: any) {
		return this.httpClient.put(`${API}merchant/${this.user.external_reference_merchant}`, merchant)
	}
}
