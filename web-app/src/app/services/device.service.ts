import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import Device from '../models/device';

@Injectable({
    providedIn: 'root'
})
export class DeviceService {
    devices$: BehaviorSubject<Device[]>;
    devices: Array<Device> = [];

    constructor(private http: HttpClient) {
        this.devices$ = new BehaviorSubject<Device[]>([])
        this.devices = this.listAll()
    }

    save(values: any): string {
        console.log(values)
        this.http.post('http://localhost:4000/device', values)
          .subscribe({
            next: (res: any) => {
              this.listAll()
              return res.message
            },
            error: (error?: any) => {
              return error.message
            }
          })
        return ''
      }

    listAll(): Device[] {
        let response: Device[] = []
        this.http.get('http://localhost:4000/device')
            .subscribe({
                next: (res?: any) => {
                    this.devices = res.map((device: any, index: number) => device.position = index + 1)
                    this.devices$.next(res)
                    response = res
                },
                error: (error?: any) => {
                    console.log(error)
                }
            })
        return response
    }

    delete(id: number): string {
        this.http.delete(`http://localhost:4000/device/${id}`)
          .subscribe({
            next: (res: any) => {
              this.listAll()
              return res.message
            },
            error: (error?: any) => {
              return error.message
            }
          })
        return ''
      }

}