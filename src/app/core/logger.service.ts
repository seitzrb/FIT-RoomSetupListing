import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  constructor() { }

  log(error: any) {
    if (error) {
      let logs = this.getLogs();

      logs = logs.concat(JSON.stringify(error));

      this.saveLogs(logs);
    }
  }

  private saveLogs(logs: any[]) {
    localStorage.setItem('LcLogs', JSON.stringify(logs));
  }

  private getLogs(): any[] {
    const logs = localStorage.getItem('LcLogs');
    if (logs) {
      return JSON.parse(logs);
    }
    return [];
  }
}
