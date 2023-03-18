import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, catchError } from "rxjs";

import { UtilityService } from "../utility/utility.service";
import { environment } from "src/environments/environment";
import { Task, User } from "../../models";

@Injectable({
  providedIn: "root",
})
export class DatabaseService {
  constructor(
    private utilityService: UtilityService,
    private http: HttpClient
  ) {}

  public setUserProfileInDatabase(userData: User): Observable<Object> {
    return this.http
      .put<User>(
        `${environment.firebaseUrl}/${environment.firebaseCollections.collectionUsers}/${userData.uid}.json`,
        {
          uid: userData.uid,
          email: userData.email,
          username: userData.username,
          birthDate: userData.birthDate,
          tasks: userData.tasks,
        }
      )
      .pipe(catchError(this.utilityService.handleError));
  }

  public getUserProfileDataFromDatabase(uid: string): Observable<Object> {
    return this.http
      .get<User>(
        `${environment.firebaseUrl}/${environment.firebaseCollections.collectionUsers}/${uid}.json`
      )
      .pipe(catchError(this.utilityService.handleError));
  }

  public updateUserProfileDataInDatabase(
    uid: string,
    dataToPath: any
  ): Observable<Object> {
    return this.http
      .patch<any>(
        `${environment.firebaseUrl}/${environment.firebaseCollections.collectionUsers}/${uid}.json`,
        dataToPath
      )
      .pipe(catchError(this.utilityService.handleError));
  }

  public deleteUserProfileFromDatabase(uid: string): Observable<Object> {
    return this.http
      .delete<User>(
        `${environment.firebaseUrl}/${environment.firebaseCollections.collectionUsers}/${uid}.json`
      )
      .pipe(catchError(this.utilityService.handleError));
  }

  public addUserTask(uid: string, task: Task): Observable<Object> {
    return this.http
      .patch<Task>(
        `${environment.firebaseUrl}/${environment.firebaseCollections.collectionUsers}/${uid}/tasks/${task.tid}.json`,
        task
      )
      .pipe(catchError(this.utilityService.handleError));
  }

  public updateUserTask(uid: string, task: Task): Observable<Object> {
    return this.http
      .patch<Task>(
        `${environment.firebaseUrl}/${environment.firebaseCollections.collectionUsers}/${uid}/tasks/${task.tid}.json`,
        task
      )
      .pipe(catchError(this.utilityService.handleError));
  }

  public deleteUserTask(uid: string, taskId: string): Observable<Object> {
    return this.http
      .delete<Task>(
        `${environment.firebaseUrl}/${environment.firebaseCollections.collectionUsers}/${uid}/tasks/${taskId}.json`
      )
      .pipe(catchError(this.utilityService.handleError));
  }
}