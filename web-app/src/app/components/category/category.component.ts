import { Component, OnInit, Inject, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from '../../services/category.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import Category from '../../models/category';
interface ICategory {
  id?: number;
  name?: string;
  position?: number;
}
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  category: Category = {}
  name: string = ''
  categories: Category[] = [];
  displayedColumns: string[] = ['position', 'name', 'actions']

  public dataSource: MatTableDataSource<ICategory>;
  private serviceSubscribe: Subscription;

  constructor(
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private categoryService: CategoryService
  ) {
    this.dataSource = new MatTableDataSource<ICategory>()
    this.serviceSubscribe = this.categoryService.categories$.subscribe(res => {
      this.dataSource.data = res;
    })
  }

  ngOnInit(): void {
    this.categoryService.listAll()
    this.serviceSubscribe = this.categoryService.categories$.subscribe(res => {
      console.log(res)
      this.dataSource.data = res;
    })
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    this.serviceSubscribe.unsubscribe();
  }

  getCategories() {
    this.categoryService.listAll()
  }

  openDialog(): void {
    this.dialog.open(CategoryForm, {
      width: '500px',
      height: '350px',
      data: { name: this.name }
    });
  }

  delete(id: number) {
    const dialogRef = this.dialog.open(CategoryDeleteConfirm);
    let feedbackMessage = ''

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        feedbackMessage = this.categoryService.delete(id);
        this.openSnackBar(feedbackMessage)
      }
    })
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Dismiss', { duration: 4000 });
  }

}

@Component({
  selector: 'category-form',
  templateUrl: './category-form.html',
  styleUrls: ['./category.component.css'],
  providers: [CategoryComponent]
})
export class CategoryForm {

  form: FormGroup

  constructor(
    public dialogRef: MatDialogRef<CategoryForm>,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: Category) {
    this.form = this.formBuilder.group({
      name: new FormControl('', [Validators.required])
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    const feedbackMessage = this.categoryService.save(this.form.value)
    this.openSnackBar(feedbackMessage)
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Dismiss', { duration: 4000 });
  }

}

@Component({
  selector: 'category-delete-confirm',
  templateUrl: './category-delete-confirm.html',
  styleUrls: ['./category.component.css']
})
export class CategoryDeleteConfirm {

  constructor() { }

  ngOnInit(): void {
  }

}