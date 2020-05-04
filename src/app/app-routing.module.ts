import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EndGameDisplayComponent } from './end-game-display/end-game-display.component';
import { GameDisplayComponent } from './game-display/game-display.component';

const routes: Routes = [
  { path: 'GameDisplay', component: GameDisplayComponent},
  { path: 'EndResults', component: EndGameDisplayComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
//export const routingComponents = [GameDisplayComponent, EndGameDisplayComponent];