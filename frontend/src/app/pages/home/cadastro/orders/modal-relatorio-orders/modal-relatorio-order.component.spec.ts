import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRelatorioTransporteComponent } from './modal-relatorio-transporte.component';

describe('ModalRelatorioTransporteComponent', () => {
	let component: ModalRelatorioTransporteComponent;
	let fixture: ComponentFixture<ModalRelatorioTransporteComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ModalRelatorioTransporteComponent]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ModalRelatorioTransporteComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
