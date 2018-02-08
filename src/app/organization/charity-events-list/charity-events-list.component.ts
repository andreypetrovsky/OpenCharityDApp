import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {OrganizationContractService} from '../services/organization-contract.service';
import {CharityEvent, CharityEventContractService} from '../services/charity-event-contract.service';
import {Subject} from 'rxjs/Subject';
import {TokenContractService} from '../../core/token-contract.service';
import {TagsBitmaskService} from '../services/tags-bitmask.service';
import {OrganizationContractEventsService} from '../services/organization-contract-events.service';

@Component({
	selector: 'opc-charity-events-list',
	templateUrl: 'charity-events-list.component.html',
	styleUrls: ['charity-events-list.component.scss']
})
export class CharityEventsListComponent implements OnInit, OnDestroy {
	@Input('organizationContractAddress') organizationContractAddress: string;
	charityEvents: CharityEvent[] = [];
	private componentDestroyed: Subject<void> = new Subject<void>();



	constructor(private organizationContractService: OrganizationContractService,
				private charityEventContractService: CharityEventContractService,
				private tokenContractService: TokenContractService,
				private organizationContractEventsService: OrganizationContractEventsService) {

	}

	ngOnInit(): void {
		this.updateCharityEventsList();

		this.organizationContractEventsService.onCharityEventAdded(this.organizationContractAddress)
		    .takeUntil(this.componentDestroyed)
		    .subscribe((event: any) => {
		            console.log(event);
		            this.updateCharityEventsList();
		        },
		        (err) => {
		            alert(`Error: ${err}`);
		        });
	}

	public async updateCharityEventsList(): Promise<void> {
		const charityEventsAddresses: string[] = await this.organizationContractService.getCharityEvents(this.organizationContractAddress);
		this.charityEvents = await this.charityEventContractService.getCharityEventsList(charityEventsAddresses);

		// this is temp solution
		// raised updates has to be triggered by events
		// websocket provider to listhen for events
		// is not available for ganache right now;
		this.updateCharityEventRaised(this.charityEvents);
	}

	ngOnDestroy(): void {
		this.componentDestroyed.next();
	}

	public async updateCharityEventRaised(charityEvents: CharityEvent[]) {
		charityEvents.forEach(async (charityEvent) => {
			const raised: string = await this.tokenContractService.balanceOf(charityEvent.address);
			charityEvent.raised = raised;
		});
	}
}
