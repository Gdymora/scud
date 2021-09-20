import { Injectable } from '@angular/core';
import { User } from './shared/model/user';


@Injectable({
    providedIn: 'root'
})
export class DataService {
    users: User[] = [
        { id: '1', name: 'Jane', lastName: 'Doe', tags: ['angular', 'typescript'] },
        { id: '2', name: 'John', lastName: 'Doe', tags: ['javascript', 'rxjs'] },
        { id: '3', name: 'Jane', lastName: 'Doe', tags: ['angular', 'promise'] },
        { id: '4', name: 'Jane', lastName: 'Doe', tags: ['angular', 'typescript'] },
        { id: '5', name: 'Jane', lastName: 'Doe', tags: ['angular', 'typescript'] },
        { id: '6', name: 'Jane', lastName: 'Doe', tags: ['angular', 'typescript'] }
    ].map(e => new User(e.name, e.lastName, e.tags, e.id));

    getUsers(): User[] {
        return [...this.users];
    }

    create(user: User) {
        user.id = `${this.users.length + 1}`;
        this.users.push(user.clone());
    }

    edit(user: User) {
        const index = this.users.findIndex(u => u.id === user.id);
        this.users[index] = user.clone();
    }
}