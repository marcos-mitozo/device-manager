import { Component, OnInit, Inject, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
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
      height: '350px'
    });
  }

  delete(id: number) {
    const dialogRef = this.dialog.open(CategoryDeleteConfirm);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.categoryService.delete(id);
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

  form = this.formBuilder.group({
    name: ['', Validators.required]
  });

  constructor(
    public dialogRef: MatDialogRef<CategoryForm>,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: Category) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    this.categoryService.save(this.form.value)
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