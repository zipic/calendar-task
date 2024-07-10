import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './components/add/add.component';
import { MainComponent } from './components/main/main.component';
import { AllVenuesComponent } from './components/all-venues/all-venues.component';

const routes: Routes = [
  { path: 'add', component: AddComponent },
  { path: '', component: MainComponent },
  { path: 'all', component: AllVenuesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
