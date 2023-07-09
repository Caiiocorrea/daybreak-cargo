import { ErrorMessageComponent } from 'src/app/components/error-message/error-message.component';
import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OrderService } from 'src/app/services/http/order.service';
import { Order, orders, orderBody } from 'src/app/utils/orders';
import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface PassageirosElement {
	nome: string
	status: string
}

export interface orderElement {
	id: any
	intinerario: string
	user_id: string
	numero_cap: string
	bloquinho: string
	destino: string
	empresa: string
	motorista: string
	kmCorrida: string
	origem: string
	valorCorrida: string
	status: string
	passengers: PassageirosElement[]
	active: boolean
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
		id: new FormControl('', Validators.required),
		numero_cap: new FormControl('', Validators.required),
		intinerario: new FormControl('', Validators.required),
		bloquinho: new FormControl('', Validators.required),
		destino: new FormControl('', Validators.required),
		empresa: new FormControl('', Validators.required),
		motorista: new FormControl('', Validators.required),
		kmCorrida: new FormControl('', Validators.required),
		origem: new FormControl('', Validators.required),
		valorCorrida: new FormControl('', Validators.required),
		status: new FormControl('', Validators.required),
		passengers: new FormControl('', Validators.required),
		active: new FormControl('', Validators.required),
	});

	orders: Order = orders;
	OrderNames = Object.keys(orders);
	idOrder: number = 0;

	orderBodyes: Order = orderBody;
	orderBodyNames = Object.keys(orderBody);

	canUpdate: boolean = false;
	activeForm: number = 1;
	boolAnim: boolean = false;

	status = ['Agendado', 'Em viagem', 'Finalizado', 'Cancelado'];
	empresa = ['Coottara', 'Particular', 'Chemtrade', 'Suzano', 'NutriPetro', 'Ultragaz'];
	bloquinho = ['Sim', 'Não'];

	origem_destino = [
		"Aracruz",
		"Barra de São Francisco",
		"Barra do Riacho",
		"Barra do Sahy",
		"Bela Vista",
		"Cachoeiro de Itapemirim",
		"Cariacica",
		"Centro",
		"Centro Empresarial",
		"Colatina",
		"Coqueiral de Aracruz",
		"Cupido",
		"Ecoporanga",
		"Fábrica",
		"Fatima",
		"Guanabara",
		"Guaraná",
		"Guaxindiba",
		"Itaparica",
		"Itaputera",
		"Iúna",
		"Jacupemba",
		"Jardins",
		"Jequitibá",
		"Limão",
		"Linhares",
		"Mar Azul",
		"Morobá",
		"Nova Colatina",
		"Nova Conquista",
		"Novo Jequitibá",
		"Planalto",
		"Polivalente",
		"Pontal do Piraqueaçu",
		"Praia Formosa",
		"Praia dos Padres",
		"Primavera",
		"Putiri",
		"Recanto Feliz",
		"Santa Cruz",
		"Santa Luzia",
		"Santa Marta",
		"Sauaçu",
		"Saue",
		"Segato",
		"Serra",
		"São Clemente",
		"São Francisco",
		"São José",
		"São Marcos",
		"Viana",
		"Vila Nova",
		"Vila Rica",
		"Vila Velha",
		"Vila do Riacho",
		"Vitória",
		"de Carli"
	]

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
				// Message: 'Você solicitou a exclusão do seguinte pedido:',
				// Value: `Viagem: ${this.dialogData.intinerario} - Solicitante: ${this.dialogData.empresa}`,
				// Confirm: 'Tem certeza que deseja excluir este cadastro?'
			}
		});

		this._formOrder.value.valorCorrida = parseFloat
			(this._formOrder.value.valorCorrida.replace('R$', '')).toFixed(2)

		let body = {
			...this._formOrder.value,
			active: false,
			passageiros: this._formOrder.value.passengers
				.filter((passengers: { nome: string; }) => passengers.nome !== '')
				.map((passengers: { id: any, order_id: any, nome: string; active: boolean }) => {
					return {
						id: passengers.id,
						order_id: passengers.order_id,
						nome: passengers.nome,
						status: 'Confirmado',
						active: passengers.active
					}
				}) ?? []
		};

		delete body.intinerario
		delete body.passengers
		delete body.created_at
		delete body.updated_at
		delete body.motorista
		delete body.id

		this.orderService
			.put(this.dialogData.id, body)
			.subscribe(
				(success: any) => {
					this.matSnack.open(
						'Alteração salva com sucesso!',
						'Fechar',
						{ duration: 2000 }
					);
					this.dialogRef.close(true);
				},
				(error: any) => this.matSnack.open(
					'Não foi possível salvar as alterações',
					'Fechar',
					{ duration: 2000 }
				)
			);
	}

	saveEdit() {
		// if (!this._formOrder.valid || !this._formOrder.value.passengers) {
		// 	this.matSnack.open('Preencha todos os campos', 'Ok', { duration: 300 })
		// }
		// else {
		this._formOrder.value.valorCorrida = parseFloat
			(this._formOrder.value.valorCorrida.replace('R$', '')).toFixed(2)

		let body = {
			...this._formOrder.value,
			active: true,
			passageiros: this._formOrder.value.passengers
				.filter((passengers: { nome: string; }) => passengers.nome !== '')
				.map((passengers: { id: any, order_id: any, nome: string; active: boolean }) => {
					return {
						id: passengers.id,
						order_id: passengers.order_id,
						nome: passengers.nome,
						status: 'Confirmado',
						active: passengers.active
					}
				}) ?? []
		};

		delete body.intinerario
		delete body.passengers
		delete body.created_at
		delete body.updated_at
		delete body.motorista
		delete body.id

		this.orderService
			.put(this.dialogData.id, body)
			.subscribe(
				(success: any) => {
					this.matSnack.open(
						'Alteração salva com sucesso!',
						'Fechar',
						{ duration: 2000 }
					);
					this.dialogRef.close(true);
				},
				(error: any) => this.matSnack.open(
					'Não foi possível salvar as alterações',
					'Fechar',
					{ duration: 2000 }
				)
			);
		// }
	}
}
