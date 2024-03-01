'use strict';

const booking = require('../routes/booking');

const { createCoreController } = require('@strapi/strapi').factories;

const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    const day = d.getDate().toString().padStart(2, '0');
    const month = (d.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

module.exports = createCoreController('api::booking.booking', ({ strapi }) => ({
    async findUserBookings(ctx) {
        if (!ctx.state.user) {
            return ctx.badRequest('No user found.');
        }

        try {
            const entities = await strapi.entityService.findMany('api::booking.booking', {
                filters: {
                    owner: ctx.state.user.id,
                },
                populate: { 
                  Receipt: true,
                  Tour_Table: true
                }
            });

            console.log(entities);

            const bookings = entities.map(entity => ({
                BookingID: entity.id,
                BookingDate: formatDate(entity.BookingDate),
                Amount: entity.Amount,
                Total_Price: entity.Total_Price,
                PaymentStatus: entity.PaymentStatus,
                Receipt: entity.Receipt,
                EventName: entity.Tour_Table.EventName,
                EventDetail: entity.Tour_Table.EventDetail,
                InitDates:formatDate(entity.Tour_Table.InitDates),
                DeadlineDates:formatDate(entity.Tour_Table.DeadlineDates) ,
                Price: entity.Tour_Table.Price,
                Username: ctx.state.user.username
            }));
               return bookings;
        } catch (error) {
            strapi.log.error('findUserBookings:error', error);
            return ctx.internalServerError('Unable to fetch user bookings.');
        }
    },
}));
