import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { ApiService } from './../../shared/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
export interface Subject {
  name: string;
}

@Component({
  selector: 'app-edit-professor',
  templateUrl: './edit-professor.component.html',
  styleUrls: ['./edit-professor.component.css']
})
export class EditProfessorComponent implements OnInit {

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  @ViewChild('chipList') chipList: any;
  @ViewChild('resetStudentForm') myNgForm: any;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  profForm!: FormGroup;
  subjectArray: Subject[] = [];

  ngOnInit() {
    this.updateBookForm();
  }
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private actRoute: ActivatedRoute,
    private profApi: ApiService
  ) {
    var id = this.actRoute.snapshot.paramMap.get('id');
    this.profApi.GetProf(id).subscribe((data: { professor_username: any; professor_firstname: any; professor_lastname: any; professor_email: any ,age:any}) => {
      this.profForm = this.fb.group({
        professor_username: [data.professor_username, [Validators.required]],
        professor_firstname: [data.professor_firstname, [Validators.required]],
        professor_lastname: [data.professor_lastname, [Validators.required]],
        professor_email: [data.professor_email, [Validators.required]],
        age: [data.age, [Validators.required]],

        
      });
    });
  }
  /* Reactive book form */
  updateBookForm() {
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
  /* Update book */
  updateProfForm() {
    console.log(this.profForm.value);
    var id = this.actRoute.snapshot.paramMap.get('id');
    if (window.confirm('Are you sure you want to update?')) {
      this.profApi
        .Updateprof(id, this.profForm.value)
        .subscribe((res: any) => {
          this.ngZone.run(() => this.router.navigateByUrl('/viewProfs'));
        });
    }
  }
}






  