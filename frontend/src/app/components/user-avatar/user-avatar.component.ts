import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

export interface UserElement {
	user_id: string;
	nome: string;
	sobrenome: string;
	email: string;
	avatar: string;
}

@Component({
	selector: 'app-user-avatar',
	templateUrl: './user-avatar.component.html',
	styleUrls: ['./user-avatar.component.scss']
})
export class UserAvatarComponent implements OnInit {
	constructor(
		// @Inject(MAT_DIALOG_DATA) public dialogData: UserElement,
	) { }

	_form = new FormGroup({
		user_id: new FormControl(''),
		nome: new FormControl(''),
		sobrenome: new FormControl(''),
		email: new FormControl(''),
		avatar: new FormControl('')
	});

	user = {} as UserElement;
	_dataSource!: MatTableDataSource<any>;
	avatarURL: string = this.user.avatar
	isChecked = true;

	ngOnInit(): void {
		this.user = JSON.parse(localStorage.getItem('user') || '{}');
		this._form.patchValue([this.user]);
	}

	logout() {
		localStorage.clear();
		window.location.reload();
	}

}
