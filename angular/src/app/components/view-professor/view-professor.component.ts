import { Professor } from './../../shared/professor';
import { ApiService } from './../../shared/api.service';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-view-professor',
  templateUrl: './view-professor.component.html',
  styleUrls: ['./view-professor.component.css']
})
export class ViewProfessorComponent implements OnInit {

  ProfessorData: any = [];
  dataSource!: MatTableDataSource<Professor>;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  displayedColumns: string[] = [
    '_id',
    'professor_username',
    'professor_email',
    'professor_firstname',
    'professor_lastname',
    'age',
    'action'

  ];
  constructor(private profApi: ApiService) {

  }
  ngOnInit() {    
    this.profApi.GetProfs().subscribe((data) => {
      
    this.ProfessorData = data;
    this.dataSource = new MatTableDataSource<Professor>(this.ProfessorData);
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
    }, 0);
  });}
  deleteProfessor(index: number, e:any) {
    if (window.confirm('Are you sure')) {
      const data = this.dataSource.data;
      data.splice(
        this.paginator.pageIndex * this.paginator.pageSize + index,
        1
      );
      this.dataSource.data = data;
      this.profApi.DeleteProf(e._id).subscribe();
    }
  }
}



  
  