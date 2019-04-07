import { Component, OnInit } from '@angular/core';
import { PetService } from '../../services/pet.service';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.scss']
})
export class PetsComponent implements OnInit {
  pets;

  constructor(
    private _petService: PetService
  ) { }

  ngOnInit() {
    this._petService.getPets().subscribe(pets => {
      console.log(pets);
      this.pets = pets;
    });
  }

}
