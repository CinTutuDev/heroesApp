import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeroesRoutingModule } from './heroes-routing.module';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { MaterialModule } from '../material/material.module';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { HeroPageComponent } from './pages/hero-page/hero-page.component';
import { CardComponent } from './components/card/card.component';
import { HeroImagePipe } from './pipe/hero-image.pipe';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NewPageComponent } from './pages/new-page/new-page.component';

@NgModule({
  declarations: [LayoutPageComponent, ListPageComponent, HeroPageComponent, CardComponent, HeroImagePipe, SearchPageComponent, NewPageComponent],
  imports: [CommonModule, HeroesRoutingModule, MaterialModule, ReactiveFormsModule],
})
export class HeroesModule {}
