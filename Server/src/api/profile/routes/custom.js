'use strict';

module.exports = {
    routes: [
        {
            method: 'PUT',
            path: '/profiles/:id/updateinfo',
            handler: 'profile.updateProfile',
        }


    ]
}
