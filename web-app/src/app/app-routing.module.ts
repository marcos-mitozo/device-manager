import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CategoryComponent } from './category/category.component';
import { DeviceComponent } from './device/device.component';

const routes: Routes = [
  { path: 'device-component', component: DeviceComponent },
  { path: 'category-component', component: CategoryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
