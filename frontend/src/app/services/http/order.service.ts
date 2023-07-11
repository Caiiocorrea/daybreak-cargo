import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const API = environment.apiURL;
const router = environment.pathOrder

@Injectable({
	providedIn: 'root'
})
export class OrderService {
	constructor(private httpClient: HttpClient) { }

	//Get Orders
	getOrders(offset: number = 0, limit: number = 100) {
		return this.httpClient.get(`${API}${router}?offset=${offset}&limit=${limit}`);
	}

	//filter
	filterOrders(query: any, response?: any) {
		if (!query.date_one) { response = `${API}${router}/search?search=${query.search}` }
		else if (!query.date_two) { response = `${API}${router}/search?search=${query.search}` }
		else { response = `${API}${router}/search?search=${query.search}&date_one=${query.date_one}&date_two=${query.date_two}` };
		console.log({ response })
		return this.httpClient.get(response);
	}

	//Post
	post(body: any) {
		return this.httpClient.post(`${API}${router}`, body);
	}

	//Put
	put(idOrder: number, body: any) {
		return this.httpClient.put(`${API}${router}/${idOrder}`, body);
	}

	//Delete - Update
	delete(idOrder: Number) {
		return this.httpClient.delete(`${API}${router}/${idOrder}`);
	}
}
