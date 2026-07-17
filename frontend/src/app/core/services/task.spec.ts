import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Task, TaskCreate, TaskUpdate, TaskFilters, TaskStats } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getTasks(filters?: TaskFilters): Observable<{ tasks: Task[]; count: number }> {
    let params = new HttpParams();
    
    if (filters) {
      Object.keys(filters).forEach(key => {
        const value = filters[key as keyof TaskFilters];
        if (value !== undefined && value !== null && value !== '') {
          params = params.set(key, value.toString());
        }
      });
    }

    return this.http.get<{ tasks: Task[]; count: number }>(`${this.apiUrl}/tasks`, { params })
      .pipe(catchError(this.handleError));
  }

  getTaskById(id: string): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/tasks/${id}`)
      .pipe(catchError(this.handleError));
  }

  createTask(task: TaskCreate): Observable<{ message: string; task: Task }> {
    return this.http.post<{ message: string; task: Task }>(`${this.apiUrl}/tasks`, task)
      .pipe(catchError(this.handleError));
  }

  updateTask(id: string, task: TaskUpdate): Observable<{ message: string; task: Task }> {
    return this.http.put<{ message: string; task: Task }>(`${this.apiUrl}/tasks/${id}`, task)
      .pipe(catchError(this.handleError));
  }

  deleteTask(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/tasks/${id}`)
      .pipe(catchError(this.handleError));
  }

  getTaskStats(): Observable<TaskStats> {
    return this.http.get<TaskStats>(`${this.apiUrl}/tasks/stats`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    let errorMessage = 'An error occurred while processing your request';
    
    if (error.error?.message) {
      errorMessage = error.error.message;
    } else if (error.status === 403) {
      errorMessage = 'You don\'t have permission to perform this action';
    } else if (error.status === 404) {
      errorMessage = 'Resource not found';
    } else if (error.status === 401) {
      errorMessage = 'Please log in to continue';
    } else if (error.status === 0) {
      errorMessage = 'Network error. Please check your connection.';
    } else if (error.status === 500) {
      errorMessage = 'Server error. Please try again later.';
    }

    return throwError(() => new Error(errorMessage));
  }
}