import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { switchMap } from 'rxjs';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'heroes-new-page',
  templateUrl: './new-page.component.html',
  styles: [],
})
export class NewPageComponent implements OnInit {
  durationInSeconds = 5;

  public heroForm = new FormGroup({
    id: new FormControl<string>(''),
    superhero: new FormControl<string>('', { nonNullable: true }),
    publisher: new FormControl<Publisher>(Publisher.DCComics),
    alter_ego: new FormControl(''),
    first_appearance: new FormControl(''),
    characters: new FormControl(''),
    alt_img: new FormControl(''),
  });

  public publishers = [
    { id: 'DC Comics', desc: 'DC - Comics' },
    { id: 'Marvel Comics', desc: 'Marvel - Comics' },
  ];

  constructor(
    private activatedR: ActivatedRoute,
    private router: Router,
    private HeroesS: HeroesService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  get currentHero(): Hero {
    const hero = this.heroForm.value as Hero;
    return hero;
  }

  ngOnInit(): void {
    if (!this.router.url.includes('edit')) return;

    this.activatedR.params
      .pipe(switchMap(({ id }) => this.HeroesS.getHeroById(id)))
      .subscribe((hero) => {
        if (!hero) return this.router.navigateByUrl('/');

        this.heroForm.reset(hero);
        return;
      });
  }

  onSubmit(): void {
    if (this.heroForm.invalid) return;

    if (this.currentHero.id) {
      this.HeroesS.updateHero(this.currentHero).subscribe((hero) => {
        this.showSnackBar(`${hero.superhero} update!🔄`);
      });
      return;
    }
    this.HeroesS.addHero(this.currentHero).subscribe((hero) => {
      this.router.navigate(['/heroes/edir/', hero.id]);
      this.showSnackBar(`${hero.superhero} created!`);
    });
  }

  onDeleteHero(){
    if(!this.currentHero.id) throw Error('Hero id is required')
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: this.heroForm.value
    });

    dialogRef.afterClosed().subscribe(result => {
     if(!result) return
    this.HeroesS.deleteteHero(this.currentHero.id)
      this.router.navigate(['/heroes'])
    /* this.animal = result; */
    });
  }

  showSnackBar(msg: string): void {
    this.snackBar.open(msg, 'done', {
      duration: this.durationInSeconds * 1000,
    });
  }
}
