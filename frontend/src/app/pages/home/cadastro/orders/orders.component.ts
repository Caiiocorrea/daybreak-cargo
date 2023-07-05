import { ErrorMessageComponent } from '../../../../../app/components/error-message/error-message.component';
// import { ModalRelatorioOrderComponent } from './modal-relatorio-orders/modal-relatorio-order.component';
import { ModalCadastraOrderComponent } from './modal-cadastra-order/modal-cadastra-order.component';
import { ModalEditaOrderComponent } from './modal-edita-order/modal-edita-order.component';
import { OrderService } from '../../../../../app/services/http/order.service';
import { MatAccordion, MatExpansionPanel } from '@angular/material/expansion';
import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Order, orders, ordersStatus } from 'src/app/utils/orders';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

export interface PassageirosElement {
	passageiro: string
	status: string
}

export interface PeriodicElement {
	_id: string
	intinerario: string
	user_id: string
	bloquinho: string
	destino: string
	empresa: string
	motorista: string
	kmCorrida: string
	origem: string
	valorCorrida: string
	status: string
	passageiros: PassageirosElement[]
	created_at: string
	updated_at: string
	Controls: any;
}

@Component({
	templateUrl: './orders.component.html',
	styleUrls: ['./orders.component.scss'],
	viewProviders: [MatExpansionPanel]
})
export class OrdersComponent implements OnInit {
	constructor(
		private dialog: MatDialog,
		private snackBar: MatSnackBar,
		private httpOrder: OrderService,
		private breakpointObserver: BreakpointObserver
	) { }

	@ViewChild(MatAccordion) accordion!: MatAccordion;

	_form = new FormGroup({
		notify: new FormControl(''),
		_id: new FormControl(''),
		intinerario: new FormControl(''),
		user_id: new FormControl(''),
		bloquinho: new FormControl(''),
		destino: new FormControl(''),
		empresa: new FormControl(''),
		motorista: new FormControl(''),
		kmCorrida: new FormControl(''),
		origem: new FormControl(''),
		valorCorrida: new FormControl(''),
		status: new FormControl(''),
		passageiros: new FormControl(''),
		created_at: new FormControl(''),

		// filter
		search: new FormControl(''),
		date_one: new FormControl(''),
		date_two: new FormControl(''),
	});

	displayedColumns: string[] = [
		'notify',
		'intinerario',
		'status',
		'valor',
		'data',
		// 'Controls'
	];

	FabOptions = {
		buttons: ['person_add']
	};

	_dataSource!: MatTableDataSource<any>;
	pageCount!: number;
	currentPage: number = 0;
	rowsPage: number = 20;
	totalRegisters: number = 0;

	orders: Order = orders;
	orderNames = Object.keys(orders);

	ordersStatus: Order = ordersStatus;
	orderStatusNames = Object.keys(ordersStatus);

	breakPoint: boolean = false;
	isLoading: boolean = true;
	check: boolean = false;

	items: any[] = []; // Array para armazenar os itens carregados

	ngOnInit(): void {
		this.getOrder(this.currentPage, this.rowsPage);

		this.breakpointObserver
			.observe(['(max-width: 950px)'])
			.subscribe((state: BreakpointState) => {
				if (state.matches) {
					this.breakPoint = true;
				} else {
					this.breakPoint = false;
				}
			});
	}

	@HostListener('window:scroll', [])
	onScroll() {
		if (
			!this.check &&
			!this.isLoading &&
			window.innerHeight + window.scrollY >= document.body.offsetHeight ||
			this.breakPoint
		) {
			this.isLoading = true;
			this.pageCount = parseInt((this.totalRegisters / this.rowsPage).toFixed(0));
			if (this.currentPage <= this.pageCount) {
				this.currentPage++;
				this.getOrder(this.currentPage, this.rowsPage);
			}
			this.isLoading = false;
		}
	}

	toggle(event: MatSlideToggleChange, search: string) {
		this.check = event.checked;
		console.log(event.checked, search)
		if (event.checked) {
			if (search === 'Bloquinho') {
				this.dataSource(this._dataSource.data.filter((order: any) => order.bloquinho === 'Sim'))
			} else {
				this.dataSource(this._dataSource.data.filter((order: any) => order.empresa === search))
			}
		} else {
			this.getOrder();
		}
	}

	getOrder(skip?: number, limit?: number) {
		this.isLoading = true;
		this.httpOrder.getOrders(skip, limit)
			.subscribe((success: any) => {
				this.items.push(...success.data);
				this.dataSource([...new Set(this.items)]);
				this.pageCount = 0;
				this.totalRegisters = success.count;
				this.currentPage = success.page
				this.isLoading = false;
			}, (error: any) => {
				const { status, message } = error;
				if (status === 401) {
					this.snackBar.open(`Acesso expirado, faça login novamente`, 'OK', {
						duration: 3000
					});

					setTimeout(() => {
						localStorage.clear();
						window.location.reload();
					}, 1000);
				}
			});
	}

	getFilter() {
		this.isLoading = true;
		let query = {
			search: this._form.value.search,
			date_one: this._form.value.date_one ? new Date(this._form.value.date_one).toISOString().split('T')[0] : undefined,
			date_two: this._form.value.date_two ? new Date(this._form.value.date_two).toISOString().split('T')[0] : undefined,
		}

		if (!this._form.value.search) {
			this.isLoading = false;
			this.snackBar.open('Primeiro informe o que deseja pesquisar...', 'fechar', {
				duration: 3000
			})
		}
		else if (this._form.value.search || this._form.value.date_one && this._form.value.date_two) {
			this.httpOrder.filterOrders(query).subscribe((success: any) => {
				this.dataSource(success);
				this._dataSource._renderChangesSubscription;
				this.isLoading = false;
			})
		}
	}

	clearFilter() {
		this._form.value.search = '';
		this._form.value.date_one = '';
		this._form.value.date_two = '';
		this.getOrder();
	}

	register() {
		const dialog = this.dialog.open(ModalCadastraOrderComponent, {
			autoFocus: false,
			panelClass: 'modal-default',
			data: {}
		});

		dialog.afterClosed().subscribe((modalResult: boolean) => {
			if (modalResult) {
				this.getOrder();
			}
		});
	}

	edit(order: any) {
		const dialog = this.dialog.open(ModalEditaOrderComponent, {
			autoFocus: false,
			panelClass: 'modal-edit',
			data: order
		});

		dialog.afterClosed().subscribe((modalResult: boolean) => {
			if (modalResult) {
				this.getOrder();
			}
		});
	}

	// relatorio() {
	// 	const dialog = this.dialog.open(ModalRelatorioOrderComponent, {
	// 		autoFocus: false,
	// 		panelClass: 'modal-default',
	// 		data: {}
	// 	});

	// 	// dialog.afterClosed().subscribe((modalResult: boolean) => {
	// 	// 	if (modalResult) {
	// 	// 		this.getOrder();
	// 	// 	}
	// 	// });
	// }

	concludeOrder(value: any, idOrder: number) {
		value.status = 'Concluído';
		console.log({ atualizado: value })
		const dialog = this.dialog.open(ErrorMessageComponent, {
			autoFocus: false,
			panelClass: 'modal-erroMessage',
			data: {
				Title: 'Concluir viagem?',
				// Message: 'Você solicitou a conclusão da viagem',
				// Value: `Viagem: ${value.intinerario} - Solicitante: ${value.empresa}`,
				// Confirm: 'Tem certeza que deseja concluir a viagem?'
			}
		});

		// dialog.afterClosed().subscribe(response => {
		// 	if (response) {
		// 		this.httpOrder.delete(value._id).subscribe(
		// 			(success: any) => {
		// 				this.snackBar.open(
		// 					'Viagem excluída com sucesso!',
		// 					'Fechar',
		// 					{ duration: 3000 }
		// 				);
		// 			}, error => {
		// 				this.snackBar.open(
		// 					`Não foi possível excluir a viagem`,
		// 					'Fechar',
		// 					{ duration: 3000 }
		// 				);
		// 			});
		// 	}
		// 	this.getOrder();
		// });
	}

	deleteOrder(value: any, idOrder: number) {
		const dialog = this.dialog.open(ErrorMessageComponent, {
			autoFocus: false,
			panelClass: 'modal-erroMessage',
			data: {
				Title: 'Excluir viagem?',
				// Message: 'Você solicitou a exclusão do seguinte pedido:',
				// Value: `Viagem: ${value.intinerario} \n\n\n Solicitante: ${value.empresa}`,
				// Confirm: 'Tem certeza que deseja excluir este cadastro?'
			}
		});

		// dialog.afterClosed().subscribe(response => {
		// 	if (response) {
		// 		this.httpOrder.delete(value._id).subscribe(
		// 			(success: any) => {
		// 				this.snackBar.open(
		// 					'Viagem excluída com sucesso!',
		// 					'Fechar',
		// 					{ duration: 3000 }
		// 				);
		// 			}, error => {
		// 				this.snackBar.open(
		// 					`Não foi possível excluir a viagem`,
		// 					'Fechar',
		// 					{ duration: 3000 }
		// 				);
		// 			});
		// 	}
		// 	this.getOrder();
		// });
	}

	getFuncFAB(idFunc: Number) {
		switch (idFunc) {
			case 1:
				this.register();
				break;
			default:
				console.log('erro');
		}
	}

	dataSource(data: any) {
		this._dataSource = new MatTableDataSource([...data.map((order: any) => {
			return {
				...order,
				status: (
					order.status === 'open' ? 'Aguardando' :
						order.status === 'closed' ? 'Concluído' : 'Agendado'
				),
				intinerario: `${order.origem} x ${order.destino}`,
				valorCorrida: `R$ ${parseFloat(order.valorCorrida).toFixed(2)}`
			}
		})
		]);
	}
}
