import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Component, OnInit } from '@angular/core';
import { MerchantService } from 'src/app/services/http/merchant.service';


@Component({
  selector: 'app-slide-toggle',
  templateUrl: './slide-toggle.component.html',
  styleUrls: ['./slide-toggle.component.scss']
})
export class SlideToggleComponent implements OnInit {
  isChecked: boolean = false
  isCheckedStatusName: string = 'Loja Fechada'

  constructor(private httpMerchant: MerchantService,) { }

  ngOnInit(): void {
    this.handleStatus()
  }

  onToggleChange(event: MatSlideToggleChange | any) {
    let { checked } = event
    this.isChecked = checked;
    if (this.isChecked == true) {
      this.isCheckedStatusName = 'Loja aberta'
      this.updateMerchantStatus({ state: 'OK' })
    }
    else if (this.isChecked == false) {
      this.isChecked = false
      this.isCheckedStatusName = 'Loja fechada'
      this.updateMerchantStatus({ state: 'CLOSED' })
    }
  }


  handleStatus() {
    const merchant = JSON.parse(localStorage.getItem('merchant') || '{}');

    this.isChecked = merchant.available
    this.isCheckedStatusName = merchant.message.subtitle ? merchant.message.subtitle : merchant.message.title

    // setTimeout(() => this.handleStatus(), 20000)
  }

  updateMerchantStatus(merchant: any) {
    this.httpMerchant.update(merchant)
  }

}
