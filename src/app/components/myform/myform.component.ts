import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-myform',
  templateUrl: './myform.component.html',
  styleUrls: ['./myform.component.css']
})
export class MyformComponent implements OnInit {

  orderForm: FormGroup = this._formBuilder.group({});;
  items: FormArray = this._formBuilder.array([]);

  constructor(private _formBuilder: FormBuilder) { 

  }

  ngOnInit(): void {
    this.orderForm = this._formBuilder.group({
      customerName: '',
      email: '',
      items: this._formBuilder.array([this.createItem()])
    })
  }

  createItem() : FormGroup {
    return this._formBuilder.group({
      name: '',
      description: '',
      price: ''
    });
  }

  addItem() {
    this.items = this.orderForm.get('items') as FormArray;
    const lastIndex = this.items.length - 1;
    const lastFormGroup = this.f.controls[lastIndex] as FormGroup;
    const { name, description, price } = lastFormGroup['controls'];
    if (!name.value || !description.value || !price.value) {
      // show some error on the template
      return;
    }
    this.items.push(this.createItem());
  }

  get f() {
    return this.orderForm.get('items') as FormArray;
  }

}
