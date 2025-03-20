import { Injectable } from '@angular/core';
import { Category } from '../types/product.types';
import { from, map, Observable } from 'rxjs';
import { supabase } from '@app/config';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  public getCategories(): Observable<Category[]> {
    return from(supabase.from('categories').select('*')).pipe(
      map((value) => value.data as Category[]),
    );
  }

  public getCategoryBySlug(categorySlug: string): Observable<Category | null> {
    return from(
      supabase.from('categories').select('*').eq('slug', categorySlug),
    ).pipe(
      map((value) => {
        if (value.data && value.data[0]) {
          return value.data[0] as Category;
        }
        return null;
      }),
    );
  }
}
