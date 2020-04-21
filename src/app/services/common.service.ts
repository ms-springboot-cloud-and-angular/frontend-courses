import { Generic } from './../models/generic';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/do';

export abstract class CommonService<E extends Generic> {

  protected baseEndpoint: string;
  protected headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(protected httpClient: HttpClient) { }

  public list(): Observable<E[]> {
    return this.httpClient.get<E[]>(this.baseEndpoint).do(res => console.log('HTTP response:', res));
  }

  public listPageable(page: string, size: string): Observable<any> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.httpClient.get<any>(`${this.baseEndpoint}/pageable`, { params: params });
  }

  public view(id: number): Observable<E> {
    return this.httpClient.get<E>(`${this.baseEndpoint}/${id}`);
  }

  public create(e: E): Observable<E> {
    return this.httpClient.post<E>(this.baseEndpoint, e, { headers: this.headers })
  }

  public edit(e: E): Observable<E> {
    return this.httpClient.put<E>(`${this.baseEndpoint}/${e.id}`, e, { headers: this.headers });
  }

  public delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseEndpoint}/${id}`);
  }
}
