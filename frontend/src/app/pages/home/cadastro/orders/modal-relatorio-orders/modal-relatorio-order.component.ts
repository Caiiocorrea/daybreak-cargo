import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { MatSnackBar } from '@angular/material/snack-bar';
import { StepperOrientation } from '@angular/material/stepper';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

import { Vehicle, vehicles, transportBody } from 'src/app/utils/transports.utils';
import { RegisterService } from 'src/app/services/http/register.service';

@Component({
	selector: 'app-modal-relatorio-transporte',
	templateUrl: './modal-relatorio-transporte.component.html',
	styleUrls: ['./modal-relatorio-transporte.component.scss'],
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
export class ModalRelatorioOrderComponent implements OnInit {
	constructor(
		private snackBar: MatSnackBar,
		private breakpointObserver: BreakpointObserver,
		private registerService: RegisterService
	) {
		this.stepperOrientation = breakpointObserver
			.observe('(min-width: 800px)')
			.pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
	}

	stepperOrientation: Observable<StepperOrientation>;

	_formGroupVehicle = new FormGroup({
		modelo: new FormControl('', Validators.required),
		marca: new FormControl('', Validators.required),
		placa: new FormControl('', Validators.required),
		chassi: new FormControl('', Validators.required),
		ano: new FormControl('', Validators.required)
	});

	_formGroupDocuments = new FormGroup({
		renavam: new FormControl('', Validators.required)
	});

	itsSaved: number = 0;
	vehicles: Vehicle = vehicles;
	vehicleNames = Object.keys(vehicles);
	idVehicle: number = 0;

	transportBodyes: Vehicle = transportBody;
	transportBodyNames = Object.keys(transportBody);

	ngOnInit(): void { }

	reactive(idVehicle: number) {
		this.registerService.deleteVehicle(idVehicle).subscribe(
			(success: any) => {
				this.snackBar.open('Veículo ativado com sucesso', 'fechar', {
					duration: 2500
				});
				this.itsSaved = 1;
			},
			error => {
				this.snackBar.open(`Ocorreu um erro: ${error.error.message}`);
			}
		);
	}

	registerVehicle() {
		if (!this._formGroupVehicle.valid && !this._formGroupDocuments.valid) {
			this.snackBar.open('Preencha todos os dados', '', { duration: 2500 });
		}

		let body = {
			...this._formGroupDocuments.value,
			...this._formGroupVehicle.value
		};

		this.registerService.postVehicle(body).subscribe(
			(success: any) => {
				this.itsSaved = 1;
			},
			error => {
				if (error.active === 302) {
					console.log(error);

					this.idVehicle = error.error.data[0].IdCaminhao;
					this.itsSaved = 3;
				} else {
					this.itsSaved = 2;
				}
			}
		);
	}
}
