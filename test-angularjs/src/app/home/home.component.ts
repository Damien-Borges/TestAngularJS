import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface User {
  id: number;
  createdAt: string;
  firstName: string;
  lastName: string;
  email: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  users: User[] = [];
  newUser: User;

  constructor(private http: HttpClient) {
    this.newUser = {
      id: 0,
      createdAt: '',
      firstName: '',
      lastName: '',
      email: ''
    };
    this.getUsers();
  }

  getUsers() {
    this.http.get<User[]>('https://64bcf8112320b36433c74a46.mockapi.io/users')
      .subscribe(
        (data: User[]) => {
          this.users = data;
        },
        (error) => {
          console.error('Erreur lors de la récupération des utilisateurs :', error);
        }
      );
  }

  addUser() {
    this.newUser.createdAt = new Date().toISOString();

    console.log(this.newUser);

    this.http.post<User>('https://64bcf8112320b36433c74a46.mockapi.io/users', this.newUser, {
      headers: { 'Content-Type': 'application/json' }
    })
      .subscribe(
        (data: User) => {
          this.users.push(data);

          this.newUser = {
            id: 0,
            createdAt: '',
            firstName: '',
            lastName: '',
            email: ''
          };
        },
        (error) => {
          console.error('Erreur lors de l\'ajout de l\'utilisateur :', error);
        }
      );
  }

  deleteUser(user: User) {
    this.http.delete<void>('https://64bcf8112320b36433c74a46.mockapi.io/users/' + user.id)
      .subscribe(
        () => {
          const index = this.users.indexOf(user);
          if (index !== -1) {
            this.users.splice(index, 1);
          }
        },
        (error) => {
          console.error('Erreur lors de la suppression de l\'utilisateur :', error);
        }
      );
  }
}
