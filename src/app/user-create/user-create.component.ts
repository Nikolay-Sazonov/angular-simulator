import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { User } from '../interfaces/User';

@Component({
  selector: 'app-user-create',
  imports: [ReactiveFormsModule],
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.scss',
})
export class UserCreateComponent {
  
  @Output() created = new EventEmitter<User>();
  
  public form = new FormGroup ({
    name: new FormControl<string>('', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]),
    username: new FormControl<string>('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
    email: new FormControl<string>('', [Validators.required, Validators.email, Validators.maxLength(100)]),
    phone: new FormControl<string>('', [Validators.required, Validators.minLength(10), Validators.maxLength(25)]),
    website: new FormControl<string>('', [Validators.maxLength(100)]),
    address: new FormGroup ({
      city: new FormControl<string>('', [Validators.required, Validators.maxLength(50)]),
      street: new FormControl<string>('', [Validators.required, Validators.maxLength(100)]),
      suite: new FormControl<string>('', Validators.maxLength(50)),
      zipcode: new FormControl<string>('', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]),
      geo: new FormGroup({
        lat: new FormControl<string>('', { nonNullable: true, validators: [Validators.required]}),
        lng: new FormControl<string>('',{ nonNullable: true, validators: [Validators.required]}),
      }),
    }),
    company: new FormGroup({
      name: new FormControl<string>('',[Validators.required, Validators.maxLength(50)]),
      catchPhrase: new FormControl<string>('', Validators.maxLength(200)),
      bs: new FormControl<string>('', Validators.maxLength(100)),
    })
  })

  onSubmit() {
    if (this.form.invalid) return;
    const formValue = this.form.value;

    const newUser: User = {
      id: Date.now(),
      name: formValue.name || 'Неизвестно',
      username: formValue.username || 'Неизвестно',
      email: formValue.email || 'Неизвестно',
      phone: formValue.phone || 'Неизвестно',
      website: formValue.website || 'Неизвестно',
      address: {
        street: formValue.address?.street || 'Неизвестно',
        suite: formValue.address?.suite || 'Неизвестно',
        city: formValue.address?.city || 'Неизвестно',
        zipcode: formValue.address?.zipcode || 'Неизвестно',
        geo: {
          lat: formValue.address?.geo?.lat || 'Неизвестно',
          lng: formValue.address?.geo?.lng || 'Неизвестно',
        },
      },
      company: {
        name: formValue.company?.name || 'Неизвестно',
        catchPhrase: formValue.company?.catchPhrase || 'Неизвестно',
        bs: formValue.company?.bs || 'Неизвестно',
      },
    };

    this.created.emit(newUser);
    this.form.reset();
  }
}
