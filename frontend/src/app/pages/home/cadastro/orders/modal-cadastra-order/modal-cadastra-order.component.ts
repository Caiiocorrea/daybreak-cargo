import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { MatSnackBar } from '@angular/material/snack-bar';
import { StepperOrientation } from '@angular/material/stepper';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

import { Order, orders, orderBody } from 'src/app/utils/orders';
import { OrderService } from 'src/app/services/http/order.service';

@Component({
	selector: 'app-modal-cadastra-order',
	templateUrl: './modal-cadastra-order.component.html',
	styleUrls: ['./modal-cadastra-order.component.scss'],
	providers: [
		{
			provide: STEPPER_GLOBAL_OPTIONS,
			useValue: {
				displayDefaultIndicatorType: false,
				showError: true
			}
		}
	]
})
export class ModalCadastraOrderComponent implements OnInit {
	constructor(
		private snackBar: MatSnackBar,
		private breakpointObserver: BreakpointObserver,
		private orderService: OrderService
	) {
		this.stepperOrientation = breakpointObserver
			.observe('(min-width: 800px)')
			.pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
	}

	stepperOrientation: Observable<StepperOrientation>;

	_formGroupOrder = new FormGroup({
		empresa: new FormControl('', Validators.required),
		origem: new FormControl('', Validators.required),
		destino: new FormControl('', Validators.required),
		bloquinho: new FormControl('', Validators.required),
		kmCorrida: new FormControl('', Validators.required),
		valorCorrida: new FormControl('', Validators.required),
		status: new FormControl('', Validators.required)
	});

	_formPassageiros = new FormGroup({
		passageiro_one: new FormControl('', Validators.required),
		passageiro_two: new FormControl(''),
		passageiro_three: new FormControl(''),
		passageiro_four: new FormControl(''),
	});

	itsSaved: number = 0;
	orders: Order = orders;
	orderNames = Object.keys(orders);
	idOrder: number = 0;

	orderBodyes: Order = orderBody;
	orderBodyNames = Object.keys(orderBody);

	status = ['Aguardando', 'Agendado', 'Em viagem', 'Concluído', 'Finalizado'];
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

	ngOnInit(): void { }

	refresh() {
		window.location.reload();
	}

	reactive(idOrder: number) {
		this.orderService.delete(idOrder).subscribe(
			(success: any) => {
				this.snackBar.open('Viagem ativada com sucesso', 'fechar', {
					duration: 2500
				});
				this.itsSaved = 1;
			},
			error => {
				this.snackBar.open(`Ocorreu um erro: ${error.error.message}`);
			}
		);
	}

	registerOrder() {
		if (!this._formGroupOrder.valid && !this._formPassageiros.valid) {
			this.snackBar.open('Preencha todos os dados obrigatórios', 'OK', { duration: 2500 });
		}

		let dados = {
			...this._formGroupOrder.value,
			kmCorrida: `${this._formGroupOrder.value.kmCorrida}`,
			passageiros: [
				{ nome: this._formPassageiros.value.passageiro_one },
				{ nome: this._formPassageiros.value.passageiro_two },
				{ nome: this._formPassageiros.value.passageiro_three },
				{ nome: this._formPassageiros.value.passageiro_four }
			]
		}

		let body = {
			...dados,
			passageiros: dados.passageiros
				.filter((passageiro: { nome: string; }) => passageiro.nome !== '')
				.map((passageiro: { nome: string; }) => {
					return {
						nome: passageiro.nome,
						status: 'Confirmado'
					}
				}) ?? []
		};

		this.orderService.post(body).subscribe(
			(success: any) => {
				this.itsSaved = 1;
			},
			error => {
				console.log(error);
				if (error.active === 302) {
					console.log(error.error.data);
					// this.idOrder = error.error.data[0].IdCaminhao;
					this.itsSaved = 3;
				} else {
					this.itsSaved = 2;
				}
			}
		);
	}
}
