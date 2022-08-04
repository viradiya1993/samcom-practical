import { Routes } from "@angular/router";
import { AuthGuard } from "src/app/auth/auth.guard";

export const AdminLayoutRoutes: Routes = [
    { path: '', redirectTo: '/userlist', pathMatch: 'full' },
    { path: 'userlist', canActivate: [AuthGuard], loadChildren: () => import('../contacts/contacts.module').then(m => m.ContactsModule) },
    { path: '**', redirectTo: '/userlist', pathMatch: 'full' },
];