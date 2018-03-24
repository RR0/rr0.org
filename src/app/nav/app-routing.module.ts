import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {PageComponent} from './page/page.component';
import {RedirectComponent} from './redirect/Redirect.component';
import {PageNotFoundComponent} from './notfound/PageNotFound.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'p/:pageId',
    component: PageComponent
  },
  {
    path: '404',
    component: PageNotFoundComponent
  },
  {
    path: '**',
    component: RedirectComponent
  },
];

//const routeOptions = { enableTracing: true };
const routeOptions = undefined;

@NgModule({
  imports: [RouterModule.forRoot(routes, routeOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
