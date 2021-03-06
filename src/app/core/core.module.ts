import {NgModule} from '@angular/core';
import {Web3ProviderService} from './web3-provider.service';
import {TokenContractService} from './contracts-services/token-contract.service';
import {LoadingOverlayComponent} from './loading-overlay/loading-overlay.component';
import {LoadingOverlayService} from './loading-overlay.service';
import {BlockingNotificationOverlayComponent} from './blocking-notification-overlay/blocking-notification-overlay.component';
import {MetamaskCheckService} from './metamask-check.service';
import {BlockingNotificationOverlayService} from './blocking-notification-overlay.service';
import {CommonModule} from '@angular/common';
import {CharityEventContractService} from './contracts-services/charity-event-contract.service';
import {IncomingDonationContractService} from './contracts-services/incoming-donation-contract.service';
import {OrganizationContractService} from './contracts-services/organization-contract.service';
import {OrganizationContractEventsService} from './contracts-services/organization-contract-events.service';
import {MetaDataStorageService} from './meta-data-storage.service';
import {PendingTransactionService} from './pending-transactions.service';
import {ErrorMessageService} from './error-message.service';
import {ErrorMessageComponent} from './error-message/error-message.component';
import {CommonSettingsService} from './common-settings.service';
import {OpenCharityWalletService} from './open-charity-wallet.service';
import {AuthService} from './auth.service';

export function windowFactory() {
	return window;
}

const contractsServices = [
	CharityEventContractService,
	IncomingDonationContractService,
	OrganizationContractService,
	OrganizationContractEventsService,
	TokenContractService,
];

@NgModule({
	imports: [CommonModule],
	declarations: [
		LoadingOverlayComponent,
		BlockingNotificationOverlayComponent,
		ErrorMessageComponent
	],
	exports: [
		LoadingOverlayComponent,
		BlockingNotificationOverlayComponent,
		ErrorMessageComponent
	],
	providers: [
		Web3ProviderService,
		LoadingOverlayService,
		BlockingNotificationOverlayService,
		MetamaskCheckService,
		{provide: 'Window', useFactory: windowFactory},
		MetaDataStorageService,
		PendingTransactionService,
		ErrorMessageService,
		CommonSettingsService,
		OpenCharityWalletService,
		AuthService,
		...contractsServices
	]
})
export class CoreModule {
}
