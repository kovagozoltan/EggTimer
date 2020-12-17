import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailsComponent } from './details/details.component';
import { HardnessSelectorComponent } from './hardness-selector/hardness-selector.component';



const routes: Routes = [
  {
    path: '',
    redirectTo: '/select',
    pathMatch: 'full'
  },
  {
    path: 'select',
    component: HardnessSelectorComponent
  },
  {
    path: 'details',
    component: DetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
