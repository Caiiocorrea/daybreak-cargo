import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IConfig, NgxMaskModule } from 'ngx-mask';

import { CadastroRoutingModule } from './cadastro-routing.module';
import { CadastroComponent } from './cadastro.component';

import { OrdersComponent } from './orders/orders.component';
import { ModalCadastraOrderComponent } from './orders/modal-cadastra-order/modal-cadastra-order.component';
import { ModalEditaOrderComponent } from './orders/modal-edita-order/modal-edita-order.component';


import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ComponentsModule } from 'src/app/components/components.module';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';


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
		MatNativeDateModule
	]
})
export class CadastroModule { }
