import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[ ] = [
    {
      title: 'Dashboard',
      icon: 'mdi mdi-gauge',
      submenu: [
        { title: 'Main', path: '' },
        { title: 'ProgressBar', path: 'progress' },
        { title: 'Charts', path: 'chart' },
        { title: 'Promises', path: 'promises' },
        { title: 'Rxjs', path: 'rxjs' }
      ]
    },
    {
      title: 'Maintenance',
      icon: 'mdi mdi-folder-lock-open',
      submenu: [
        { title: 'Usuarios', path: 'users' },
        { title: 'Medics', path: 'medics' },
        { title: 'Hospitals', path: 'hospitals' }
      ]
    }
  ];

  constructor() { }
}
