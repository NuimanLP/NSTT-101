'use strict';

/**
 * profile controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::profile.profile', ({ strapi }) =>  ({
    async updateProfile(ctx) {
      try {
        const { id } = ctx.params;
        // @ts-ignore
        const { body } = ctx.request;
  
  
        const updatedProfile = await strapi.entityService.update('api::profile.profile', id, {
          data: body,
        });
  
        ctx.body = updatedProfile;
      } catch (err) {
        ctx.body = err;
        ctx.status = 500;
      }
    },
  }));
  