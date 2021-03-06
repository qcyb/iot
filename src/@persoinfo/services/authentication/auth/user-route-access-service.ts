import {Injectable, isDevMode} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {StateStorageService} from './state-storage.service';
import {AccountService} from "./account.service";
import {Location} from "@angular/common";
import {Observable} from "rxjs";

@Injectable({providedIn: 'root'})
export class UserRouteAccessService implements CanActivate {
    constructor(
        private router: Router,
        private _location: Location,
        private accountService: AccountService,
        private stateStorageService: StateStorageService
    ) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean> {
        const authorities = route.data['authorities'];
        // We need to call the checkLogin / and so the accountService.identity() function, to ensure,
        // that the client has a principal too, if they already logged in by the server.
        // This could happen on a page refresh.
        return this.checkLogin(authorities, state.url);
    }

    checkLogin(authorities: string[], url: string): Promise<boolean> {
        return this.accountService.identity(false).then(account => {
            if (!account) {
                this._location.go('login');
            }
            if (!authorities || authorities.length === 0) {
                return true;
            }

            if (account) {
                const hasAnyAuthority = this.accountService.hasAnyAuthority(authorities);
                if (hasAnyAuthority) {
                    return true;
                }
                if (isDevMode()) {
                    console.error('User has not any of required authorities: ', authorities);
                }
                return false;
            }

            this.stateStorageService.storeUrl(url);
            // only show the login dialog, if the user hasn't logged in yet
            if (!account) {
                console.log('no user found...check login')
                this._location.go('login');
            }
            return false;
        });
    }
}
