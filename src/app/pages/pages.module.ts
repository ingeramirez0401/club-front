import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DashboardComponent } from './dashboard/dashboard.component';
import { AccounSettingsComponent } from './accoun-settings/accoun-settings.component';

import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { PAGES_ROUTES } from './pages.routes';
import { CommonModule } from '@angular/common';

//ng2-charts
import { ChartsModule } from 'ng2-charts';
import { PipesModule } from '../pipes/pipes.module';
import { ProfileComponent } from './profile/profile.component';
import { ProfileViewComponent } from './profile/view/view.component';
import { ProfileUpdateComponent } from './profile/update/update.component';
import { UsersComponent } from './configuration/users/users.component';
import { UsersListComponent } from './configuration/users/list/list.component';
import { UsersCreateComponent } from './configuration/users/create/create.component';
import { UsersEditComponent } from './configuration/users/edit/edit.component';
import { LogoutComponent } from '../logout/logout.component';
import { RolesComponent } from './configuration/roles/roles.component';
import { RolesListComponent } from './configuration/roles/list/list.component';
import { RolesCreateComponent } from './configuration/roles/create/create.component';
import { RolesEditComponent } from './configuration/roles/edit/edit.component';
import { DocumentTypesComponent } from './configuration/document-types/document-types.component';
import { DocumentTypesCreateComponent } from './configuration/document-types/create/create.component';
import { DocumentTypesEditComponent } from './configuration/document-types/edit/edit.component';
import { DocumentTypesListComponent } from './configuration/document-types/list/list.component';
import { RejectReasonComponent } from './configuration/reject-reason/reject-reason.component';
import { RejectReasonCreateComponent } from './configuration/reject-reason/create/create.component';
import { RejectReasonEditComponent } from './configuration/reject-reason/edit/edit.component';
import { RejectReasonListComponent } from './configuration/reject-reason/list/list.component';
import { SpecialitiesComponent } from './products/specialities/specialities.component';
import { SpecialitiesCreateComponent } from './products/specialities/create/create.component';
import { SpecialitiesEditComponent } from './products/specialities/edit/edit.component';
import { SpecialitiesListComponent } from './products/specialities/list/list.component';
import { SpecialitiesViewComponent } from './products/specialities/view/view.component';
import { SpecialitiesBulkComponent } from './products/specialities/bulk/bulk.component';
import { LinesComponent } from './products/lines/lines.component';
import { LinesCreateComponent } from './products/lines/create/create.component';
import { LinesEditComponent } from './products/lines/edit/edit.component';
import { LinesListComponent } from './products/lines/list/list.component';
import { LinesViewComponent } from './products/lines/view/view.component';
import { LinesBulkComponent } from './products/lines/bulk/bulk.component';
import { SystemsComponent } from './products/systems/systems.component';
import { SystemsCreateComponent } from './products/systems/create/create.component';
import { SystemsEditComponent } from './products/systems/edit/edit.component';
import { SystemsListComponent } from './products/systems/list/list.component';
import { SystemsViewComponent } from './products/systems/view/view.component';
import { SystemsBulkComponent } from './products/systems/bulk/bulk.component';
import { ProceduresComponent } from './products/procedures/procedures.component';
import { ProceduresCreateComponent } from './products/procedures/create/create.component';
import { ProceduresEditComponent } from './products/procedures/edit/edit.component';
import { ProceduresListComponent } from './products/procedures/list/list.component';
import { ProceduresViewComponent } from './products/procedures/view/view.component';
import { ProceduresBulkComponent } from './products/procedures/bulk/bulk.component';
import { TaxTypeComponent } from './configuration/tax-type/tax-type.component';
import { TaxTypeListComponent } from './configuration/tax-type/list/list.component';
import { TaxTypeCreateComponent } from './configuration/tax-type/create/create.component';
import { TaxTypeEditComponent } from './configuration/tax-type/edit/edit.component';
import { ProductTypeComponent } from './configuration/product-type/product-type.component';
import { ProductTypeListComponent } from './configuration/product-type/list/list.component';
import { ProductTypeCreateComponent } from './configuration/product-type/create/create.component';
import { ProductTypeEditComponent } from './configuration/product-type/edit/edit.component';
import { PaymentTypeComponent } from './configuration/payment-type/payment-type.component';
import { PaymentTypeListComponent } from './configuration/payment-type/list/list.component';
import { PaymentTypeCreateComponent } from './configuration/payment-type/create/create.component';
import { PaymentTypeEditComponent } from './configuration/payment-type/edit/edit.component';
import { MoneyTypeComponent } from './purchase/money-type/money-type.component';
import { MoneyTypeListComponent } from './purchase/money-type/list/list.component';
import { MoneyTypeCreateComponent } from './purchase/money-type/create/create.component';
import { MoneyTypeEditComponent } from './purchase/money-type/edit/edit.component';
import { SupplierTypeComponent } from './purchase/supplier-type/supplier-type.component';
import { SupplierTypeListComponent } from './purchase/supplier-type/list/list.component';
import { SupplierTypeCreateComponent } from './purchase/supplier-type/create/create.component';
import { SupplierTypeEditComponent } from './purchase/supplier-type/edit/edit.component';
import { SupplierComponent } from './purchase/supplier/supplier.component';
import { SupplierListComponent } from './purchase/supplier/list/list.component';
import { SupplierCreateComponent } from './purchase/supplier/create/create.component';
import { SupplierEditComponent } from './purchase/supplier/edit/edit.component';



@NgModule({
  declarations: [
    DashboardComponent,
    AccounSettingsComponent,
    ProfileComponent,
    ProfileViewComponent,
    ProfileUpdateComponent,
    UsersComponent,
    UsersListComponent,
    UsersCreateComponent,
    UsersEditComponent,
    LogoutComponent,
    RolesComponent,
    RolesListComponent,
    RolesCreateComponent,
    RolesEditComponent,
    DocumentTypesComponent,
    DocumentTypesCreateComponent,
    DocumentTypesEditComponent,
    DocumentTypesListComponent,
    RejectReasonComponent,
    RejectReasonCreateComponent,
    RejectReasonEditComponent,
    RejectReasonListComponent,
    SpecialitiesComponent,
    SpecialitiesCreateComponent,
    SpecialitiesEditComponent,
    SpecialitiesListComponent,
    SpecialitiesViewComponent,
    LinesComponent,
    LinesCreateComponent,
    LinesEditComponent,
    LinesListComponent,
    LinesViewComponent,
    SystemsComponent,
    SystemsCreateComponent,
    SystemsEditComponent,
    SystemsListComponent,
    SystemsViewComponent,
    ProceduresComponent,
    ProceduresCreateComponent,
    ProceduresEditComponent,
    ProceduresListComponent,
    ProceduresViewComponent,
    SpecialitiesBulkComponent,
    LinesBulkComponent,
    SystemsBulkComponent,
    ProceduresBulkComponent,
    TaxTypeComponent,
    TaxTypeListComponent,
    TaxTypeCreateComponent,
    TaxTypeEditComponent,
    ProductTypeComponent,
    ProductTypeListComponent,
    ProductTypeCreateComponent,
    ProductTypeEditComponent,
    PaymentTypeComponent,
    PaymentTypeListComponent,
    PaymentTypeCreateComponent,
    PaymentTypeEditComponent,
    MoneyTypeComponent,
    MoneyTypeListComponent,
    MoneyTypeCreateComponent,
    MoneyTypeEditComponent,
    SupplierTypeComponent,
    SupplierTypeListComponent,
    SupplierTypeCreateComponent,
    SupplierTypeEditComponent,
    SupplierComponent,
    SupplierListComponent,
    SupplierCreateComponent,
    SupplierEditComponent
  ],
  exports: [
    DashboardComponent
  ],
  imports: [
      SharedModule,
      PAGES_ROUTES,
      FormsModule,
      ReactiveFormsModule,
      ChartsModule,
      PipesModule,
      CommonModule
  ],
  providers: []
})
export class PagesModule { }
