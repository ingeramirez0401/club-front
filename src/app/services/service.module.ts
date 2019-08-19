import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigService,
         LocalStorageService,
         NotificationService,
         UserService,
         SidebarService,
         AppService,
         UploadFileService,
         ModalSearchService,
         SmsService,
         EmailService,
         ReunionesService,
         SettingsService,
         TaxTypeService,
         ProductTypeService,
         PaymentTypeService,
         MoneyTypeService,
         SupplierTypeService,
         SupplierService } from './services.index';
import { LoginGuard } from './guard/login.guard';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    ConfigService,
    LocalStorageService,
    NotificationService, 
    SettingsService,
    UserService,
    AppService,
    SidebarService,
    UploadFileService,
    SmsService,
    EmailService,
    LoginGuard,
    ModalSearchService,
    ReunionesService,
    TaxTypeService,
    ProductTypeService,
    PaymentTypeService,
    MoneyTypeService,
    SupplierTypeService,
    SupplierService
  ]
})
export class ServiceModule { }
