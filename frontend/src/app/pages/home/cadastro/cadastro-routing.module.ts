import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersComponent } from './orders/orders.component';

const routes: Routes = [
	{
		path: 'viagem',
		component: OrdersComponent,
		// data: { title: 'Pedidos' }
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class CadastroRoutingModule { }
