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
      ]
    }
  ];

  constructor() { }
}
