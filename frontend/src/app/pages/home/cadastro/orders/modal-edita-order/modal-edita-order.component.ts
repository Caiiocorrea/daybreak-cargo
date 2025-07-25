import { ErrorMessageComponent } from 'src/app/components/error-message/error-message.component';
import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OrderService } from 'src/app/services/http/order.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';

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
		numero_cap: new FormControl(''),
		centro_custo: new FormControl(''),
		intinerario: new FormControl('', Validators.required),
		bloquinho: new FormControl('', Validators.required),
		sgs: new FormControl('', Validators.required),
		origem: new FormControl('', Validators.required),
		destino: new FormControl('', Validators.required),
		empresa: new FormControl('', Validators.required),
		motorista: new FormControl('', Validators.required),
		km_inicial: new FormControl(''),
		km_final: new FormControl(''),
		valorCorrida: new FormControl(''),
		status: new FormControl('', Validators.required),
		passengers: new FormControl('', Validators.required),
		active: new FormControl('', Validators.required),
		data_viagem: new FormControl('', Validators.required),
		hora: new FormControl('', Validators.required),
		minuto: new FormControl('', Validators.required),

		passageiro_one: new FormControl(''),
		passageiro_two: new FormControl(''),
		passageiro_three: new FormControl(''),
		passageiro_four: new FormControl(''),
	});

	idOrder: number = 0;
	activeForm: number = 1;
	boolAnim: boolean = false;
	canUpdate: boolean = false;

	status = ['Agendado', 'Em viagem', 'Finalizado', 'Cancelado'];
	empresa = ['Coottara', 'Particular']; //'Chemtrade', 'Suzano', 'NutriPetro', 'Ultragaz'
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
		"Chemtrade",
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
		"NutriPetro",
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
		"Suzano",
		"Viana",
		"Vila Nova",
		"Vila Rica",
		"Vila Velha",
		"Vila do Riacho",
		"Vitória",
		"Ultragaz",
		"de Carli"
	]

	hora = [
		"00",
		"01",
		"02",
		"03",
		"04",
		"05",
		"06",
		"07",
		"08",
		"09",
		"10",
		"11",
		"12",
		"13",
		"14",
		"15",
		"16",
		"17",
		"18",
		"19",
		"20",
		"21",
		"22",
		"23"
	]

	minuto = [
		"00",
		"05",
		"10",
		"15",
		"20",
		"25",
		"30",
		"35",
		"40",
		"45",
		"50",
		"55"
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

	deleteOrder() {
		const dialog = this.matDialog.open(ErrorMessageComponent, {
			autoFocus: false,
			panelClass: 'modal-errorMessage',
			data: { Title: 'Deseja excluir essa viagem?' }
		});

		dialog.afterClosed().subscribe(response => {
			if (response) {
				this.orderService
					.delete(this.dialogData.id)
					.subscribe(
						(success: any) => {
							this.matSnack.open(
								'Viagem excluída com sucesso!',
								'',
								{ duration: 2500 }
							);
							this.dialogRef.close(true);
						},
						(error: any) => this.matSnack.open(
							'Não foi possível excluir a viagem',
							'',
							{ duration: 2500 }
						)
					);
			}
		})
	}

	saveEdit() {
		let data_viagem = moment(this._formOrder.value.data_viagem).format('YYYY-MM-DD')
		let hora_viagem = `${this._formOrder.value.hora}:${this._formOrder.value.minuto}`
		let statusPassageiro = "Confirmado"
		let body = {
			...this._formOrder.value,
			active: true,
			sgs: this._formOrder.value.sgs ? `${this._formOrder.value.sgs}` : '',
			data_viagem: data_viagem !== "Invalid date" ? data_viagem : "",
			hora_viagem: hora_viagem !== ":" ? hora_viagem : "",
			numero_cap: this._formOrder.value.numero_cap ? `${this._formOrder.value.numero_cap}` : '',
			centro_custo: this._formOrder.value.centro_custo ? `${this._formOrder.value.centro_custo}` : '',
			km_inicial: this._formOrder.value.km_inicial ? `${this._formOrder.value.km_inicial}` : '',
			km_final: this._formOrder.value.km_final ? `${this._formOrder.value.km_final}` : '',
			valorCorrida: parseFloat(this._formOrder.value.valorCorrida.replace('R$', '')).toFixed(2),
			passageiros: [
				{
					id: this._formOrder.value.passengers[0]?.id,
					order_id: this._formOrder.value.id,
					nome: this._formOrder.value.passageiro_one ?? "",
					status: statusPassageiro,
					active: true
				},
				{
					id: this._formOrder.value.passengers[1]?.id,
					order_id: this._formOrder.value.id,
					nome: this._formOrder.value.passageiro_two ?? "",
					status: statusPassageiro,
					active: true
				},
				{
					id: this._formOrder.value.passengers[2]?.id,
					order_id: this._formOrder.value.id,
					nome: this._formOrder.value.passageiro_three ?? "",
					status: statusPassageiro,
					active: true
				},
				{
					id: this._formOrder.value.passengers[3]?.id,
					order_id: this._formOrder.value.id,
					nome: this._formOrder.value.passageiro_four ?? "",
					status: statusPassageiro,
					active: true
				}
			].map((passenger: any) => {
				if (passenger.nome !== "") {
					return passenger
				}
			})
		};

		console.log({ body })

		delete body.passageiro_one
		delete body.passageiro_two
		delete body.passageiro_three
		delete body.passageiro_four
		delete body.intinerario
		delete body.passengers
		delete body.created_at
		delete body.updated_at
		delete body.motorista
		delete body.minuto
		delete body.hora
		delete body.id

		this.orderService
			.put(this.dialogData.id, body)
			.subscribe(
				(success: any) => {
					this.matSnack.open(
						'Alteração salva com sucesso!',
						'Fechar',
						{ duration: 2500 }
					);
					this.dialogRef.close(true);
				},
				(error: any) => this.matSnack.open(
					'Não foi possível salvar as alterações',
					'Fechar',
					{ duration: 2500 }
				)
			);
	}
}