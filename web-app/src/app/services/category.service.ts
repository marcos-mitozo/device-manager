import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import Category from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categories$: BehaviorSubject<Category[]>;
  categories: Array<Category> = [];

  constructor(private http: HttpClient) {
    this.categories$ = new BehaviorSubject<Category[]>([])
    this.categories = this.listAll()
  }

  save(values: any): string {

    this.http.post('http://localhost:4000/category', values)
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

  listAll(): Category[] {
    let response: Category[] = []
    this.http.get('http://localhost:4000/category')
      .subscribe({
        next: (res?: any) => {
          this.categories = res.map((category: any, index: number) => category.position = index + 1)
          this.categories$.next(res)
          response = res
        },
        error: (error?: any) => {
          console.log(error)
        }
      })
    return response
  }

  delete(id: number): string {
    this.http.delete(`http://localhost:4000/category/${id}`)
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
