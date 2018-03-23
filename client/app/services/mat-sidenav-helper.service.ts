import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material';

@Injectable()
export class AppMatSidenavHelperService {
    public sidenavInstances: MatSidenav[];

    constructor() {
        this.sidenavInstances = [];
    }

    public setSidenav(id, instance) {
        this.sidenavInstances[id] = instance;
    }

    public getSidenav(id) {
        return this.sidenavInstances[id];
    }
}
