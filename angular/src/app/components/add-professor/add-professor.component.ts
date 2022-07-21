import { Component, OnInit, ViewChild, NgZone  } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Router } from '@angular/router';
import { ApiService } from './../../shared/api.service';
import { MatChipInputEvent } from '@angular/material/chips';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

export interface Subject {
  name: string;
}

@Component({
  selector: 'app-add-professor',
  templateUrl: './add-professor.component.html',
  styleUrls: ['./add-professor.component.css']
})
export class AddProfessorComponent implements OnInit {

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  @ViewChild('chipList') chipList: any;
  @ViewChild('resetStudentForm') myNgForm: any;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  profForm!: FormGroup;

  ngOnInit() {
    this.submitBookForm();
  }
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private profApi: ApiService
  ) {}
  /* Reactive book form */
  submitBookForm() {
    this.profForm = this.fb.group({
      professor_username: ['', [Validators.required]],
      professor_firstname: ['', [Validators.required]],
      professor_lastname: ['', [Validators.required]],
      professor_email: ['', [Validators.required]],
      age: ['', [Validators.required]],
      
    });
  }
  

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.profForm.controls[controlName].hasError(errorName);
  };
  /* Submit book */
  submitStudentForm() {
    if (this.profForm.valid) {
      this.profApi.AddProf(this.profForm.value).subscribe((res) => {
        this.ngZone.run(() => this.router.navigateByUrl('/viewProfs'));
      });
    }
  }
}
