import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services';

@Component({
  selector: 'app-resgister',
  templateUrl: './resgister.component.html',
  styleUrls: ['./resgister.component.css']
})
export class ResgisterComponent implements OnInit {

  public name: string = ''
  public email: string = '';
  public password: string = '';
  public birth_date: Date = new Date();

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log("Creating new User...");
    this.userService.create({
      nome: this.name,
      email: this.email,
      senha: this.password,
      data_nascimento: new Date().toISOString()
    }).subscribe(() => {
      console.log("User created!");
      
    });
  } 

}
