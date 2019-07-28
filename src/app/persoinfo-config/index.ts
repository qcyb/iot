import {PersoInfoConfig} from '@persoinfo/types';

/**
 * Default Fuse Configuration
 *
 * You can edit these options to change the default options. All these options also can be changed per component
 * basis. See `app/main/pages/authentication/login/login.component.ts` constructor method to learn more
 * about changing these options per component basis.
 */

export const persoInfoConfig: PersoInfoConfig = {
    layout: {
        style: 'vertical-layout-1',
        width: 'fullwidth',
        navbar: {
            background: 'mat-persoinfo-dark-700-bg',
            folded: false,
            hidden: false,
            position: 'left',
            variant: 'vertical-style-1'
        },
        toolbar: {
            background: 'mat-white-500-bg',
            hidden: false,
            position: 'below-static'
        },
        footer: {
            background: 'mat-persoinfo-dark-900-bg',
            hidden: false,
            position: 'below-fixed'
        },
        sidepanel: {
            hidden: false,
            position: 'right'
        }
    },
    customScrollbars: true
};