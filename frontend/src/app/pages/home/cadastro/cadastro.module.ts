import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IConfig, NgxMaskModule } from 'ngx-mask';

import { CadastroRoutingModule } from './cadastro-routing.module';
import { CadastroComponent } from './cadastro.component';

import { OrdersComponent } from './orders/orders.component';
import { ModalRelatorioOrderComponent } from './orders/modal-relatorio-order/modal-relatorio-order.component';
import { ModalCadastraOrderComponent } from './orders/modal-cadastra-order/modal-cadastra-order.component';
import { ModalEditaOrderComponent } from './orders/modal-edita-order/modal-edita-order.component';


import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ComponentsModule } from 'src/app/components/components.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';


const maskConfigFunction: () => Partial<IConfig> = () => {
	return {
		validation: true
	};
};

@NgModule({
	declarations: [
		CadastroComponent,
		OrdersComponent,
		ModalCadastraOrderComponent,
		ModalEditaOrderComponent,
		ModalRelatorioOrderComponent
	],
	imports: [
		ComponentsModule,
		CommonModule,
		CadastroRoutingModule,
		MatExpansionModule,
		MatInputModule,
		FormsModule,
		MatFormFieldModule,
		ReactiveFormsModule,
		MatIconModule,
		MatButtonModule,
		MatTableModule,
		MatMenuModule,
		MatDialogModule,
		MatSnackBarModule,
		MatStepperModule,
		MatProgressSpinnerModule,
		MatSelectModule,
		MatSlideToggleModule,
		MatCheckboxModule,
		MatAutocompleteModule,
		NgxMaskModule.forRoot(maskConfigFunction),
		MatDatepickerModule,
		MatNativeDateModule,
		NgxMaterialTimepickerModule,
		MatCardModule
	]
})
export class CadastroModule { }
