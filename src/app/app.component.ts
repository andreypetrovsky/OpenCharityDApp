import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Web3ProviderService} from './core/web3-provider.service';
import {LoadingOverlayService} from './core/loading-overlay.service';
import {MetamaskCheckService} from './core/metamask-check.service';
import {BlockingNotificationOverlayService} from './core/blocking-notification-overlay.service';
import {Router} from '@angular/router';
import {AuthService} from './core/auth.service';

@Component({
	selector: 'my-app',
	styleUrls: ['main.scss', './app.component.scss'],
	templateUrl: './app.component.html'
})

export class AppComponent implements OnInit, AfterViewInit {

	public appLoaded: boolean = false;
	public showBlockingOverlay: boolean = false;
	public blockingOverlayMessage: string = '';

	constructor(
		private web3ProviderService: Web3ProviderService,
		private loadingOverlayService: LoadingOverlayService,
		private metamaskCheckService: MetamaskCheckService,
		private authService: AuthService,
		private blockingNotificationOverlayService: BlockingNotificationOverlayService,
		private router: Router
	) {
	}

	public async ngOnInit(): Promise<void> {
		// await this.web3ProviderService.init();

		if (this.authService.isMetamaskUsed) {
			await this.checkMetamask();
		}

		this.appLoaded = true;
	}

	public async ngAfterViewInit(): Promise<void> {
		this.loadingOverlayService.hideOverlay();
	}

	private async checkMetamask(): Promise<void> {
		let message: string;

		if (this.metamaskCheckService.isMetamaskInstalled()) {
			const metamaskLocked: boolean = await this.metamaskCheckService.isMetamaskLocked();
			const correctNetwork: boolean = await this.metamaskCheckService.isCorrectNetwork();

			if (metamaskLocked) {
				message = 'Your MetaMask wallet is locked. Please, unlock it and try again;';
			} else if (!correctNetwork) {
				message = 'Wrong network. Please, connect to Open Charity network and try again';
			}
		} else {
			// message = 'You need MetaMask extension to interact with this app. Please, install it and try again';
			await this.router.navigate(['/login']);
		}

		if (message) {
			this.blockingNotificationOverlayService.setOverlayMessage(message);
			this.blockingOverlayMessage = message;

			this.blockingNotificationOverlayService.showOverlay();
			this.showBlockingOverlay = true;
		}

	}




}
