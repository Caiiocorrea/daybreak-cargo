import { MerchantService } from 'src/app/services/http/merchant.service';
import { OrderService } from 'src/app/services/http/order.service';
import { Component, OnInit } from '@angular/core';

@Component({
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
	constructor(
		private httpOrder: OrderService,
		private httpMerchant: MerchantService
	) { }

	ngOnInit(): void { }

	getOrder(skip: number = 0, limit: number = 20) {
		this.httpOrder.getOrders(skip, limit).subscribe(
			(success: any) => {
				success.data.map((order: any) => { });
			},
			error => {
				console.log(error)
			}
		);
	}
}
