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
import * as moment from 'moment';

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
		centro_custo: new FormControl(''),
		numero_cap: new FormControl(''),
		empresa: new FormControl('', Validators.required),
		origem: new FormControl('', Validators.required),
		destino: new FormControl('', Validators.required),
		bloquinho: new FormControl('', Validators.required),
		sgs: new FormControl(''),
		km_inicial: new FormControl(''),
		km_final: new FormControl(''),
		valorCorrida: new FormControl(''),
		status: new FormControl('', Validators.required),
		data_viagem: new FormControl('', Validators.required),
		hora: new FormControl(''),
		minuto: new FormControl(''),
	});

	_formPassageiros = new FormGroup({
		passageiro_one: new FormControl(''),
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
		let dados = {
			...this._formGroupOrder.value,
			hora_viagem: `${this._formGroupOrder.value.hora}:${this._formGroupOrder.value.minuto}`,
			passageiros: [
				{ nome: this._formPassageiros.value.passageiro_one },
				{ nome: this._formPassageiros.value.passageiro_two },
				{ nome: this._formPassageiros.value.passageiro_three },
				{ nome: this._formPassageiros.value.passageiro_four }
			]
		}

		let body = {
			...dados,
			sgs: dados.sgs ? `${dados.sgs}` : '',
			numero_cap: dados.numero_cap ? `${dados.numero_cap}` : '',
			centro_custo: dados.centro_custo ? `${dados.centro_custo}` : '',
			km_inicial: dados.km_inicial ? `${dados.km_inicial}` : '',
			km_final: dados.km_final ? `${dados.km_final}` : '',
			data_viagem: moment(dados.data_viagem).format('YYYY-MM-DD'),
			hora_viagem: dados.hora_viagem != ':' ? `${dados.hora_viagem}` : '',
			valorCorrida: dados.valorCorrida ? `${dados.valorCorrida}` : '',
			passageiros: dados.passageiros
				.filter((passageiro: { nome: string; }) => passageiro.nome !== '')
				.map((passageiro: { nome: string; }) => {
					return {
						nome: passageiro.nome,
						status: 'Confirmado'
					}
				}) ?? []
		};

		delete body.hora;
		delete body.minuto;

		this.orderService.post(body).subscribe(
			(success: any) => {
				this.itsSaved = 1;
			},
			error => {
				if (error.active === 302) {
					this.itsSaved = 3;
				} else {
					this.itsSaved = 2;
				}
			}
		);
	}
}
