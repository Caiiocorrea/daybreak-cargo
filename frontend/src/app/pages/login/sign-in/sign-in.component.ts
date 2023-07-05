import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/http/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-sign-in',
	templateUrl: './sign-in.component.html',
	styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
	constructor(
		private matSnackbar: MatSnackBar,
		private loginService: AuthService,
		private router: Router
	) { }

	_form = new FormGroup({
		email: new FormControl('', Validators.required),
		senha: new FormControl('', Validators.required)
	});

	hide: boolean = true;

	ngOnInit() {
		// if (localStorage.getItem('user')) {
		// 	const user = JSON.parse(localStorage.getItem('user') || '{}');
		// 	this._form.value.email = user.email;
		// 	this._form.setValue(this._form.value);
		// }
	}

	validate() {
		if (this._form.invalid) {
			this.matSnackbar.open('Preencha todos os campos', '', { duration: 2500 });
		} else {
			this.loginService.getLogin(this._form.value).subscribe(
				(success: any) => {
					this.router.navigateByUrl('home');
				},
				error => {
					this.matSnackbar.open(`⛔ ${error.error.message}`, 'Fechar', {
						duration: 2500
					});
				}
			);
		}
	}
}
