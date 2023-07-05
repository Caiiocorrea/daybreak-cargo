import { ErrorMessageComponent } from 'src/app/components/error-message/error-message.component';
import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OrderService } from 'src/app/services/http/order.service';
import { Order, orders, orderBody } from 'src/app/utils/orders';
import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface PassageirosElement {
	passageiro: string
	status: string
}

export interface orderElement {
	_id: any
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
	selector: 'app-modal-edita-order',
	templateUrl: './modal-edita-order.component.html',
	styleUrls: ['./modal-edita-order.component.scss'],
	animations: [
		trigger('changeAnim', [
			state(
				'open',
				style({
					transform: 'translateX(0px)'
				})
			),
			state(
				'void',
				style({
					display: 'none',
					transform: 'translateX(-150%)'
				})
			),
			transition('open => void', [
				animate(
					'250ms ease-out',
					keyframes([
						style({ position: 'absolute' }),
						style({ transform: 'translateX(100%)', opacity: 1 })
					])
				)
			]),
			transition('void => *', [
				animate(
					'250ms 250ms ease-out',
					keyframes([
						style({
							display: 'grid',
							transform: 'translateX(-150%)',
							opacity: 0
						}),
						style({ transform: 'translateX(0px)', opacity: 1 })
					])
				)
			])
		])
	]
})
export class ModalEditaOrderComponent implements OnInit {
	_formOrder = new FormGroup({
		_id: new FormControl('', Validators.required),
		intinerario: new FormControl('', Validators.required),
		bloquinho: new FormControl('', Validators.required),
		destino: new FormControl('', Validators.required),
		empresa: new FormControl('', Validators.required),
		motorista: new FormControl('', Validators.required),
		kmCorrida: new FormControl('', Validators.required),
		origem: new FormControl('', Validators.required),
		valorCorrida: new FormControl('', Validators.required),
		status: new FormControl('', Validators.required),
		passageiros: new FormControl('', Validators.required),
	});

	orders: Order = orders;
	OrderNames = Object.keys(orders);
	idOrder: number = 0;

	orderBodyes: Order = orderBody;
	orderBodyNames = Object.keys(orderBody);

	canUpdate: boolean = false;
	activeForm: number = 1;
	boolAnim: boolean = false;

	constructor(
		@Inject(MAT_DIALOG_DATA) public dialogData: orderElement,
		private orderService: OrderService,
		private matSnack: MatSnackBar,
		public dialogRef: MatDialogRef<any>,
		private matDialog: MatDialog
	) { }

	ngOnInit(): void {
		this._formOrder.patchValue(this.dialogData);
	}

	toggleForm(idForm: number = 1) {
		this.boolAnim = !this.boolAnim;
		this.activeForm = idForm;
	}

	concludeOrder(bitAtivo: number = 0) {
		const dialog = this.matDialog.open(ErrorMessageComponent, {
			autoFocus: false,
			panelClass: 'modal-errorMessage',
			data: {
				Title: 'Concluir Viagem',
				Message: 'Você solicitou a conclusão da viagem',
				Value: `Viagem: ${this.dialogData.intinerario} - Solicitante: ${this.dialogData.empresa}`,
				Confirm: 'Tem certeza que deseja concluir a viagem?'
			}
		});

		// dialog.afterClosed().subscribe(response => {
		// 	if (response) {
		// 		this.orderService
		// 			.delete(this.dialogData._id, false)
		// 			.subscribe((success: any) => {
		// 				this.matSnack.open(
		// 					bitAtivo === 0
		// 						? 'Viagem deletado com sucesso'
		// 						: 'Viagem reativado com sucesso',
		// 					'Fechar',
		// 					{
		// 						duration: 2500
		// 					}
		// 				);

		// 				if (bitAtivo === 0) {
		// 					this.dialogRef.close(true);
		// 				} else {
		// 					this.activeForm = 1;
		// 					this.canUpdate = true;
		// 					// this.dialogData.active = 'Ativo';
		// 				}
		// 			},
		// 				error => {
		// 					this.matSnack.open(`Ocorreu um erro: ${error.error.message}`);
		// 				}
		// 			);
		// 	}
		// });
	}

	deleteOrder(bitAtivo: number = 0) {
		const dialog = this.matDialog.open(ErrorMessageComponent, {
			autoFocus: false,
			panelClass: 'modal-errorMessage',
			data: {
				Title: 'Exclusão de cadastro',
				Message: 'Você solicitou a exclusão do seguinte pedido:',
				Value: `Viagem: ${this.dialogData.intinerario} - Solicitante: ${this.dialogData.empresa}`,
				Confirm: 'Tem certeza que deseja excluir este cadastro?'
			}
		});

		dialog.afterClosed().subscribe(response => {
			if (response) {
				this.orderService
					.delete(this.dialogData._id, false)
					.subscribe((success: any) => {
						this.matSnack.open(
							bitAtivo === 0
								? 'Viagem deletado com sucesso'
								: 'Viagem reativado com sucesso',
							'Fechar',
							{
								duration: 2500
							}
						);

						if (bitAtivo === 0) {
							this.dialogRef.close(true);
						} else {
							this.activeForm = 1;
							this.canUpdate = true;
							// this.dialogData.active = 'Ativo';
						}
					},
						error => {
							this.matSnack.open(`Ocorreu um erro: ${error.error.message}`);
						}
					);
			}
		});
	}

	saveEdit() {
		if (!this._formOrder.valid) {
			this.matSnack.open('Preencha todos os campos', '', { duration: 2500 });
		} else {
			this._formOrder.value.valorCorrida = parseFloat(this._formOrder.value.valorCorrida.replace('R$', '')).toFixed(2)
			delete this._formOrder.value.intinerario
			delete this._formOrder.value.created_at
			delete this._formOrder.value._id

			this.orderService
				.put(this.dialogData._id, this._formOrder.value)
				.subscribe(
					(success: any) => {
						this.matSnack.open(
							'Alteração salva com sucesso!',
							'Fechar',
							{ duration: 2000 }
						);
						this.dialogRef.close(true);
						window.location.reload();
					},
					error => {
						this.matSnack.open(`Ocorreu um erro: ${error.error.message}`);
					}
				);
		}
	}
}
