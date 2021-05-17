import { Component, OnInit, Inject, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';

import { DeviceService } from 'src/app/services/device.service';
import { CategoryService } from 'src/app/services/category.service';

import Category from 'src/app/models/category';
import Device from '../../models/device';

interface IDevice {
  id?: number;
  category?: Category,
  color?: string,
  partNumber?: number,
  position?: number
}

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['position', 'category', 'color', 'part number', 'actions']

  public dataSource: MatTableDataSource<IDevice>;
  private serviceSubscribe: Subscription;

  constructor(
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private deviceService: DeviceService
  ) {
    this.dataSource = new MatTableDataSource<IDevice>()
    this.serviceSubscribe = this.deviceService.devices$.subscribe(res => {
      this.dataSource.data = res
    })
  }

  ngOnInit(): void {
    this.getDevices()
    this.deviceService.listAll
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    this.serviceSubscribe.unsubscribe();
  }

  getDevices() {
    this.deviceService.listAll()
  }

  openDialog(): void {
    this.dialog.open(DeviceForm, {
      width: '500px',
      data: { }
    });
  }

  delete(id: number) {
    const dialogRef = this.dialog.open(DeviceDeleteConfirm);
    let feedbackMessage = ''

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        feedbackMessage = this.deviceService.delete(id);
        this.openSnackBar(feedbackMessage)
      }
    })
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Dismiss', { duration: 4000 });
  }
}
@Component({
  selector: 'device-form',
  templateUrl: './device-form.html',
  styleUrls: ['./device.component.css'],
  providers: [DeviceComponent]
})
export class DeviceForm implements OnInit {

  categories!: Category[]
  private serviceSubscribe: Subscription;

  form = this.formBuilder.group({
    categoryId: ['', Validators.required],
    color: ['', Validators.pattern('[a-zA-Z ]*')],
    partNumber: ['', Validators.required],
  });

  constructor(
    public dialogRef: MatDialogRef<DeviceForm>,
    private formBuilder: FormBuilder,
    private deviceService: DeviceService,
    private categoryService: CategoryService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: Device) {
    this.serviceSubscribe = this.categoryService.categories$.subscribe(res => {
      this.categories = res;
    })
  }

  ngOnInit() {
    this.categoryService.listAll()
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    const feedbackMessage = this.deviceService.save(this.form.value)
    this.openSnackBar(feedbackMessage)
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Dismiss', { duration: 4000 });
  }

}

@Component({
  selector: 'device-delete-confirm',
  templateUrl: './device-delete-confirm.html',
  styleUrls: ['./device.component.css']
})
export class DeviceDeleteConfirm {

  constructor() { }

  ngOnInit(): void {
  }

}