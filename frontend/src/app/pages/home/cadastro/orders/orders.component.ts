import { ErrorMessageComponent } from '../../../../../app/components/error-message/error-message.component';
import { ModalRelatorioOrderComponent } from './modal-relatorio-order/modal-relatorio-order.component';
import { ModalCadastraOrderComponent } from './modal-cadastra-order/modal-cadastra-order.component';
import { ModalEditaOrderComponent } from './modal-edita-order/modal-edita-order.component';
import { OrderService } from '../../../../../app/services/http/order.service';
import { MatAccordion, MatExpansionPanel } from '@angular/material/expansion';
import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';


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
		id: new FormControl(''),
		intinerario: new FormControl(''),
		numero_cap: new FormControl(''),
		centro_custo: new FormControl(''),
		user_id: new FormControl(''),
		bloquinho: new FormControl(''),
		sgs: new FormControl(''),
		destino: new FormControl(''),
		empresa: new FormControl(''),
		motorista: new FormControl(''),
		km_inicial: new FormControl(''),
		km_final: new FormControl(''),
		origem: new FormControl(''),
		valorCorrida: new FormControl(''),
		status: new FormControl(''),
		passengers: new FormControl(''),
		created_at: new FormControl(''),
		data_viagem: new FormControl(''),
		hora: new FormControl(''),
		minuto: new FormControl(''),

		//filter
		search: new FormControl(''),
		date_one: new FormControl(''),
		date_two: new FormControl(''),
	});

	displayedColumns: string[] = [
		'notify',
		'CAP',
		'SGS',
		'Centro_Custo',
		'intinerario',
		'status',
		'valor',
		'data',
		'Controls'
	];

	FabOptions = {
		buttons: ['person_add'],
	};

	// 'assessment'

	_dataSource!: MatTableDataSource<any>;
	newdataSource: any[] = [];
	pageCount!: number;
	currentPage: number = 0;
	rowsPage: number = 100;
	totalRegisters: number = 0;

	breakPoint: boolean = false;
	isLoading: boolean = true;
	check: boolean = false;

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

	// @HostListener('window:scroll', [])
	// onScroll() {
	// 	if (
	// 		!this.check &&
	// 		!this.isLoading &&
	// 		window.innerHeight + window.scrollY >= document.body.offsetHeight ||
	// 		this.breakPoint
	// 	) {
	// 		this.isLoading = true;
	// 		// this.pageCount = parseInt((this.totalRegisters / this.rowsPage).toFixed(0));
	// 		if (this.pageCount <= 50) {
	// 			this.getOrder(0, this.pageCount)
	// 		}

	// 		else if (this.pageCount > 50) {
	// 			setTimeout(() => {
	// 				this.currentPage += 1;
	// 				this.getOrder(this.currentPage, this.rowsPage);
	// 			}, 1500);
	// 		}

	// 		this.isLoading = false;
	// 	}
	// }

	toggle(event: MatSlideToggleChange, search: string) {
		this.check = event.checked;
		if (event.checked) {
			if (event.source.id === 'mat-slide-toggle-1') {
				this.newdataSource = this._dataSource.data.filter((order: any) => order.bloquinho === 'Sim')
			}
			else if (event.source.id === 'mat-slide-toggle-3') {
				this.newdataSource = this._dataSource.data.filter((order: any) => order.sgs === 'Sim')
			}
			else {
				this.newdataSource = this._dataSource.data.filter((order: any) => order.empresa === search)
			}
		} else {
			this.getOrder();
		}

		if (this.newdataSource.length <= 0) {
			this.snackBar.open(
				'Nenhuma viagem encontrada...',
				'Fechar', { duration: 2500 }
			)
			window.location.reload()
		}

		this._dataSource = new MatTableDataSource([...this.newdataSource.map((order: any) => {
			return {
				...order,
				intinerario: `${order.origem} x ${order.destino}`,
			}
		})
		]);
	}

	getOrder(offset?: number, limit?: number) {
		this.isLoading = true;
		this.httpOrder.getOrders(offset, limit)
			.subscribe((success: any) => {
				this.dataSource(success.data);
				this.pageCount = success.count;
				this.totalRegisters = success.count;
				this.currentPage = success.offset
			}, (error: any) => {
				const { status, message } = error;
				if (status === 401) {
					this.snackBar.open(`Acesso expirado, faça login novamente`, 'OK', {
						duration: 2500
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
			// date_one: this._form.value.date_one ? new Date(this._form.value.date_one).toISOString() : undefined,
			// date_two: this._form.value.date_two ? new Date(this._form.value.date_two).toISOString() : undefined,
		}

		if (!this._form.value.search) {
			this.isLoading = false;
			this.snackBar.open('Informe o número CAP que deseja pesquisar...', 'Fechar', {
				duration: 2500
			})
		}
		else {
			this.httpOrder.filterOrders(query).subscribe(
				(success: any) => {
					console.log(success.data.length)
					if (success.data.length >= 1) {
						this.dataSource(success.data);
						this._dataSource._renderChangesSubscription;
						this.isLoading = false;
					} else {
						this.snackBar.open(
							'Nenhuma viagem encontrada...',
							'Fechar', { duration: 2500 }
						)
						this.isLoading = false;
					}
				})
		}
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

	alterOrderStatus(idOrder: number, value: any, newStatus: string) {
		let typeTitle: any, typeMessage: any;
		if (newStatus === 'Cancelado') { typeTitle = 'cancelar', typeMessage = 'cancelada' }
		else if (newStatus === 'Finalizado') { typeTitle = 'finalizar', typeMessage = 'finalizada' }
		else if (newStatus === 'Em viagem') { typeTitle = 'iniciar', typeMessage = 'iniciada' }

		const dialog = this.dialog.open(ErrorMessageComponent, {
			autoFocus: false,
			panelClass: 'modal-erroMessage',
			data: { Title: `Deseja ${typeTitle} a viagem?` }
		});

		let body = {
			status: newStatus
		}

		dialog.afterClosed().subscribe(response => {
			if (response) {
				this.httpOrder.alterOrderStatus(idOrder, body)
					.subscribe(
						(success: any) => {
							this.getOrder();
							this.snackBar.open(
								`Viagem ${typeMessage} com sucesso`, 'Fechar',
								{ duration: 2500 }
							);
						},
						(error: any) => {
							this.snackBar.open(
								`Não foi possível ${typeMessage} a viagem`, 'Fechar',
								{ duration: 2500 }
							);
						}
					);
			}
		});
	}

	dataSource(data: any) {
		this._dataSource = new MatTableDataSource([...data[0].map((order: any) => {
			let newHora = order.hora_viagem ? ' às ' + order.hora_viagem : ""
			let newData = moment(order.data_viagem).format('DD/MM/YYYY') + newHora
			return {
				...order,
				data_viagem: moment(order.data_viagem).toDate() ?? '',
				created_at: newData != 'Invalid date' ? newData : '',
			}
		})
		]);
		this.isLoading = false;
	}

	getFuncFAB(idFunc: Number) {
		switch (idFunc) {
			case 1:
				this.register();
				break;
			case 2:
				this.relatorio();
			// default:
			// console.log({ idFunc });
		}
	}

	clearFilter() {
		// this._form.value.search = '';
		// this.check = false;
		// this._form.value.date_one = '';
		// this._form.value.date_two = '';
		// this.getOrder();
		window.location.reload()
	}

	relatorio() {
		const dialog = this.dialog.open(ModalRelatorioOrderComponent, {
			autoFocus: false,
			panelClass: 'modal-default',
			data: {}
		});

		// dialog.afterClosed().subscribe((modalResult: boolean) => {
		// 	if (modalResult) {
		// 		this.getOrder();
		// 	}
		// });
	}
}
