import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { PresentationSpaComponent } from './presentation-spa/presentation-spa.component';
import { AdvantageComponent } from './advantage/advantage.component';
import { InvestComponent } from './invest/invest.component';
import { AccountComponent } from './account/account.component';
import { FooterComponent } from './footer/footer.component';



@NgModule({
  declarations: [HeaderComponent, PresentationSpaComponent, AdvantageComponent, InvestComponent, AccountComponent, FooterComponent],
  imports: [
    CommonModule
  ],
  exports: [
    HeaderComponent,
    PresentationSpaComponent,
    AdvantageComponent,
    InvestComponent,
    AccountComponent,
    FooterComponent
  ]
})
export class SharedModule { }
