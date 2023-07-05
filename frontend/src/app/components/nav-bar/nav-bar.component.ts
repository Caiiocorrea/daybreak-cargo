import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSidenav, MatSidenavContent } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/http/user.service';
import { NavMobileService } from 'src/app/services/nav-mobile.service';

@Component({
	selector: 'app-nav-bar',
	templateUrl: './nav-bar.component.html',
	styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
	constructor(
		private userService: UserService,
		private router: Router,
		private observer: BreakpointObserver,
		private mobileService: NavMobileService
	) { }

	@ViewChild(MatSidenav) sidenav!: MatSidenav;
	@ViewChild('cadastroItens') cadastroItens!: ElementRef<HTMLDivElement>;
	@ViewChild('entradaItens') entradaItens!: ElementRef<HTMLDivElement>;
	@ViewChild('saidaItens') saidaItens!: ElementRef<HTMLDivElement>;

	userName: string = '';
	jobName: string = '';
	isMobile: boolean = false;
	expanded: boolean = false;
	others: boolean = false;
	title!: string;
	untitle!: Subscription;

	ngAfterViewInit(): void {
		this.observer.observe(['(max-width: 960px)']).subscribe(res => {
			if (res.matches) {
				this.sidenav.mode = 'over';
				this.sidenav.close();
				this.isMobile = true;
			} else {
				this.sidenav.mode = 'side';
				this.sidenav.open();
				this.isMobile = false;
			}
		});
	}

	ngOnInit(): void {
		this.untitle = this.mobileService.observeTitle().subscribe(url => {
			this.title = url;
		});

		this.userService.retunUser().subscribe((success: any) => {
			this.userName = success.Nome;
			this.jobName = success.Privilegio;
		});
	}

	logout() {
		this.userService.logout();
		this.router.navigateByUrl('/').then();
	}

	changeNav() {
		this.others = !this.others;
	}

	blurActiveItem(): void {
		document.activeElement instanceof HTMLElement &&
			document.activeElement.blur();
	}

	toggleExpanded() {
		this.expanded = !this.expanded;
		this.others = false;
	}

	toggleMode() {
		this.expanded = true;
		this.sidenav.toggle();
		this.others = false;
	}

	hasPrivilege(privilege: string) { }
}
