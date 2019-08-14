import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {RPiService} from "@persoinfo/services/rpi/rpi.service";
import {RPi} from "@persoinfo/model/rpi/rpi.model";

@Component({
  selector: 'app-rpi-form',
  templateUrl: './rpi-form.component.html',
  styleUrls: ['./rpi-form.component.css']
})
export class RPiFormComponent implements OnInit {

  form: FormGroup;

  constructor(private router: Router, private rpiService: RPiService,
              private formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      ip: ['', [
        Validators.required,
        Validators.pattern("^([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})$")
      ]],
      pin: ['', [
        Validators.required,
        Validators.pattern("^([1-9]{1})([0-9]{0,3})$")
      ]],
      type: ['', Validators.required]
    });
  }

  ngOnInit() {
    console.log('this is one');
  }

  submit(value: RPi) {
    this.rpiService.save(value)
      .subscribe(
        data => this.router.navigate(['/settings/rpi/', data.id]),
        error => console.log("error saving raspberry pi")
      );
  }

}