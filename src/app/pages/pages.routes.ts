import { Routes, RouterModule, CanActivate } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileViewComponent } from './profile/view/view.component';
import { AccounSettingsComponent } from './accoun-settings/accoun-settings.component';
import { LogoutComponent } from '../logout/logout.component';
import { ProfileUpdateComponent } from './profile/update/update.component';
import { UsersComponent } from './configuration/users/users.component';
import { UsersListComponent } from './configuration/users/list/list.component';
import { UsersCreateComponent } from './configuration/users/create/create.component';
import { UsersEditComponent } from './configuration/users/edit/edit.component';
import { RolesComponent } from './configuration/roles/roles.component';
import { RolesListComponent } from './configuration/roles/list/list.component';
import { RolesCreateComponent } from './configuration/roles/create/create.component';
import { RolesEditComponent } from './configuration/roles/edit/edit.component';
import { DocumentTypesComponent } from './configuration/document-types/document-types.component';
import { DocumentTypesListComponent } from './configuration/document-types/list/list.component';
import { DocumentTypesCreateComponent } from './configuration/document-types/create/create.component';
import { DocumentTypesEditComponent } from './configuration/document-types/edit/edit.component';
import { RejectReasonComponent } from './configuration/reject-reason/reject-reason.component';
import { RejectReasonListComponent } from './configuration/reject-reason/list/list.component';
import { RejectReasonCreateComponent } from './configuration/reject-reason/create/create.component';
import { RejectReasonEditComponent } from './configuration/reject-reason/edit/edit.component';
import { SpecialitiesComponent } from './products/specialities/specialities.component';
import { SpecialitiesListComponent } from './products/specialities/list/list.component';
import { SpecialitiesCreateComponent } from './products/specialities/create/create.component';
import { SpecialitiesEditComponent } from './products/specialities/edit/edit.component';
import { SpecialitiesViewComponent } from './products/specialities/view/view.component';
import { SpecialitiesBulkComponent } from './products/specialities/bulk/bulk.component';
import { LinesComponent } from './products/lines/lines.component';
import { LinesListComponent } from './products/lines/list/list.component';
import { LinesCreateComponent } from './products/lines/create/create.component';
import { LinesEditComponent } from './products/lines/edit/edit.component';
import { LinesViewComponent } from './products/lines/view/view.component';
import { LinesBulkComponent } from './products/lines/bulk/bulk.component';
import { SystemsComponent } from './products/systems/systems.component';
import { SystemsListComponent } from './products/systems/list/list.component';
import { SystemsCreateComponent } from './products/systems/create/create.component';
import { SystemsEditComponent } from './products/systems/edit/edit.component';
import { SystemsViewComponent } from './products/systems/view/view.component';
import { SystemsBulkComponent } from './products/systems/bulk/bulk.component';
import { ProceduresComponent } from './products/procedures/procedures.component';
import { ProceduresListComponent } from './products/procedures/list/list.component';
import { ProceduresCreateComponent } from './products/procedures/create/create.component';
import { ProceduresEditComponent } from './products/procedures/edit/edit.component';
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

const pagesRoutes: Routes = [
            { path: 'dashboard', component: DashboardComponent, data: { title: 'Dashboard' } },
            { path: 'account-settings', component: AccounSettingsComponent, data: { title: 'Configuración' } },
            {
                path: 'profile',
                component: ProfileComponent,
                children: [
                    { path: 'view', component: ProfileViewComponent, data: { title: 'Ver Perfil' } },
                    { path: 'update/:id', component: ProfileUpdateComponent, data: { title: 'Editar Perfil' } },
                    { path: '**', pathMatch: 'full', redirectTo: 'view' }
                ]
            },
            { path: 'logout', component: LogoutComponent },
            {
                path: 'users',
                component: UsersComponent,
                children: [
                    { path: 'list', component: UsersListComponent, data: { title: 'Listado de Usuarios' } },
                    { path: 'create', component: UsersCreateComponent, data: { title: 'Crear Usuario' } },
                    { path: 'update/:id', component: UsersEditComponent, data: { title: 'Editar Usuario' } },
                    { path: '**', pathMatch: 'full', redirectTo: 'list' }
                ]
            },
            {
                path: 'roles',
                component: RolesComponent,
                children: [
                    { path: 'list', component: RolesListComponent, data: { title: 'Listado de Roles' } },
                    { path: 'create', component: RolesCreateComponent, data: { title: 'Crear Rol' } },
                    { path: 'update/:id', component: RolesEditComponent, data: { title: 'Editar Rol' } },
                    { path: '**', pathMatch: 'full', redirectTo: 'list' }
                ]
            },
            {
                path: 'document-types',
                component: DocumentTypesComponent,
                children: [
                    { path: 'list', component: DocumentTypesListComponent, data: { title: 'Listado de Tipos de Documentos' } },
                    { path: 'create', component: DocumentTypesCreateComponent, data: { title: 'Crear Tipo de Documento' } },
                    { path: 'update/:id', component: DocumentTypesEditComponent, data: { title: 'Editar Tipo de Documento' } },
                    { path: '**', pathMatch: 'full', redirectTo: 'list' }
                ]
            },
            {
                path: 'tax-types',
                component: TaxTypeComponent,
                children: [
                    { path: 'list', component: TaxTypeListComponent, data: { title: 'Listado de Tipos de Impuestos' } },
                    { path: 'create', component: TaxTypeCreateComponent, data: { title: 'Crear Tipo de Impuesto' } },
                    { path: 'update/:id', component: TaxTypeEditComponent, data: { title: 'Editar Tipo de Impuesto' } },
                    { path: '**', pathMatch: 'full', redirectTo: 'list' }
                ]
            },
            {
                path: 'product-types',
                component: ProductTypeComponent,
                children: [
                    { path: 'list', component: ProductTypeListComponent, data: { title: 'Listado de Tipos de Productos' } },
                    { path: 'create', component: ProductTypeCreateComponent, data: { title: 'Crear Tipo de Producto' } },
                    { path: 'update/:id', component: ProductTypeEditComponent, data: { title: 'Editar Tipo de Producto' } },
                    { path: '**', pathMatch: 'full', redirectTo: 'list' }
                ]
            },
            {
                path: 'payment-types',
                component: PaymentTypeComponent,
                children: [
                    { path: 'list', component: PaymentTypeListComponent, data: { title: 'Listado de Tipos de Pago' } },
                    { path: 'create', component: PaymentTypeCreateComponent, data: { title: 'Crear Tipo de Pago' } },
                    { path: 'update/:id', component: PaymentTypeEditComponent, data: { title: 'Editar Tipo de Pago' } },
                    { path: '**', pathMatch: 'full', redirectTo: 'list' }
                ]
            },
            {
                path: 'money-types',
                component: MoneyTypeComponent,
                children: [
                    { path: 'list', component: MoneyTypeListComponent, data: { title: 'Listado de Monedas' } },
                    { path: 'create', component: MoneyTypeCreateComponent, data: { title: 'Crear Nueva Moneda' } },
                    { path: 'update/:id', component: MoneyTypeEditComponent, data: { title: 'Editar Moneda' } },
                    { path: '**', pathMatch: 'full', redirectTo: 'list' }
                ]
            },
            {
                path: 'supplier-types',
                component: SupplierTypeComponent,
                children: [
                    { path: 'list', component: SupplierTypeListComponent, data: { title: 'Listado de Tipos de Proveedores' } },
                    { path: 'create', component: SupplierTypeCreateComponent, data: { title: 'Crear Nueva Tipo de Proveedor' } },
                    { path: 'update/:id', component: SupplierTypeEditComponent, data: { title: 'Editar Tipo de Proveedor' } },
                    { path: '**', pathMatch: 'full', redirectTo: 'list' }
                ]
            },
            {
                path: 'suppliers',
                component: SupplierComponent,
                children: [
                    { path: 'list', component: SupplierListComponent, data: { title: 'Listado de Proveedores' } },
                    { path: 'create', component: SupplierCreateComponent, data: { title: 'Crear Nuevo Proveedor' } },
                    { path: 'update/:id', component: SupplierEditComponent, data: { title: 'Editar Proveedor' } },
                    { path: '**', pathMatch: 'full', redirectTo: 'list' }
                ]
            },
            {
                path: 'reject-reasons',
                component: RejectReasonComponent,
                children: [
                    { path: 'list', component: RejectReasonListComponent, data: { title: 'Listado de Motivos de Rechazo' } },
                    { path: 'create', component: RejectReasonCreateComponent, data: { title: 'Crear Motivo de Rechazo' } },
                    { path: 'update/:id', component: RejectReasonEditComponent, data: { title: 'Editar Motivo de Rechazo' } },
                    { path: '**', pathMatch: 'full', redirectTo: 'list' }
                ]
            },
            {
                path: 'specialties',
                component: SpecialitiesComponent,
                children: [
                    { path: 'bulk', component: SpecialitiesBulkComponent, data: { title: 'Cargue masivo de Especialidades' } },
                    { path: 'list', component: SpecialitiesListComponent, data: { title: 'Listado de Especialidades' } },
                    { path: 'create', component: SpecialitiesCreateComponent, data: { title: 'Crear Especialidad' } },
                    { path: 'update/:id', component: SpecialitiesEditComponent, data: { title: 'Editar Especialidad' } },
                    { path: 'view/:id', component: SpecialitiesViewComponent, data: { title: 'Ver Especialidad' } },
                    { path: '**', pathMatch: 'full', redirectTo: 'list' }
                ]
            },
            {
                path: 'lines',
                component: LinesComponent,
                children: [
                    { path: 'bulk', component: LinesBulkComponent, data: { title: 'Cargue masivo de Líneas' } },
                    { path: 'list', component: LinesListComponent, data: { title: 'Listado de Líneas' } },
                    { path: 'create', component: LinesCreateComponent, data: { title: 'Crear Línea' } },
                    { path: 'update/:id', component: LinesEditComponent, data: { title: 'Editar Línea' } },
                    { path: 'view/:id', component: LinesViewComponent, data: { title: 'Ver Línea' } },
                    { path: '**', pathMatch: 'full', redirectTo: 'list' }
                ]
            },
            {
                path: 'systems',
                component: SystemsComponent,
                children: [
                    { path: 'bulk', component: SystemsBulkComponent, data: { title: 'Cargue masivo de Sistemas' } },
                    { path: 'list', component: SystemsListComponent, data: { title: 'Listado de Sistemas' } },
                    { path: 'create', component: SystemsCreateComponent, data: { title: 'Crear Sistema' } },
                    { path: 'update/:id', component: SystemsEditComponent, data: { title: 'Editar Sistema' } },
                    { path: 'view/:id', component: SystemsViewComponent, data: { title: 'Ver Sistema' } },
                    { path: '**', pathMatch: 'full', redirectTo: 'list' }
                ]
            },
            {
                path: 'procedures',
                component: ProceduresComponent,
                children: [
                    { path: 'bulk', component: ProceduresBulkComponent, data: { title: 'Cargue masivo de Procedimientos' } },
                    { path: 'list', component: ProceduresListComponent, data: { title: 'Listado de Procedimientos' } },
                    { path: 'create', component: ProceduresCreateComponent, data: { title: 'Crear Procedimiento' } },
                    { path: 'update/:id', component: ProceduresEditComponent, data: { title: 'Editar Procedimiento' } },
                    { path: 'view/:id', component: ProceduresViewComponent, data: { title: 'Ver Procedimiento' } },
                    { path: '**', pathMatch: 'full', redirectTo: 'list' }
                ]
            },
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
