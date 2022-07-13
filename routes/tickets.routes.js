const express = require("express");

const {
  createTicket,
  getTickets,
  getTicketById,
  adminUpdateTicket,
  adminDeleteTicket,
  createTicketMessage,
} = require("../controllers/ticket.controller");

const { validate } = require("../middlewares/validation.middleware");

const router = express.Router();

// DONE
router.get(
  "/",
  validate("query", "ticketQueryValSchema"),
  async (request, response, next) => {
    let query = {};
    if (!request.user.isAdmin) {
      const userId = request.user.userId;
      query = { userId: userId };
    }
    //  user is admin, GET ALL USERS TICKETS -> no query filter
    try {
      // handle pagination
      let page = +request.query.page || 1; // start from 1
      const limit = +request.query.limit || 20;
      const skip = (page - 1) * limit; // page starts from 1

      const { count, tickets } = await getTickets(query, limit, skip);
      if (!count) {
        return response.status(404).json({ message: "Cannot find tickets" });
      }
      const pagesCount = count / limit;

      // TODO !PAGE LIMIT
      if (tickets.length == 0) {
        return response.status(404).json({
          message: `No available tickets for page number ${page}, page max value ${pagesCount}, total items ${count}`,
        });
      }
      if (page > pagesCount) {
        // return response.status(404).json({ message: `Page out of bound, total items ${count}, page max value ${pagesCount}` });
      }
      const pagination = {
        page,
        totalItems: count,
        itemsPerPage: limit,
        totalPages: pagesCount,
      };
      return response.json({ pagination, tickets });
    } catch (error) {
      next(error);
    }
  }
);

// DONE
router.get(
  "/:ticketId",
  validate("params", "ticketParamValSchema"),
  async (request, response, next) => {
    try {
      const ticketId = request.params.ticketId;
      const ticket = await getTicketById(ticketId);
      if (!ticket) {
        return response.json({
          message: `Can not find TicketId _id:${ticketId}`,
        });
      }

      return response.json({
        message: `TicketId _id:${ticketId} retrived `,
        ticket,
      });
    } catch (error) {
      next(error);
    }
  }
);

// DONE
router.post(
  "/",
  validate("body", "ticketBodyPostValSchema"),
  async (request, response, next) => {
    try {
      // get name from jwt
      const username = request.user.username;
      const userId = request.user.userId;
      console.log(userId);
      // TODO username change _id
      const ticket = await createTicket(
        username,
        userId,
        request.body.description,
        request.body.isCompleted
      );
      return response.json({
        message: `Ticket created by ${username}`,
        ticket,
      });
    } catch (error) {
      next(error);
    }
  }
);

// DONE
router.post(
  "/messages/:ticketId",
  validate("body", "ticketBodyPostMessValSchema"),
  async (request, response, next) => {
    try {
      // fetch ticket then verify if request.user.userId !== ticket.userId
      const ticket = await getTicketById(request.params.ticketId);

      if (!request.user.isAdmin) {
        console.log(`isAdmin: ${request.user.isAdmin}`);
        if (request.user.userId !== ticket.userId.toString()) {
          return response
            .status(403)
            .json({
              message:
                `Only admins and ticket owner (${ticket.username}) are allowed to add messages`,
							// loggedUsername: request.user.username,
              // isAdmin: request.user.isAdmin
            });
        }
      }

      const ticketMessage = await createTicketMessage(
        request.params.ticketId,
        request.user.username,
        request.user.userId,
        request.body.message
      );
      return response.json({
        message: `Ticket message added by ${request.user.username}`,
        ticketMessage,
      });
    } catch (error) {
      next(error);
    }
  }
);
// DONE
router.put(
  "/:ticketId",
  validate("params", "ticketParamValSchema"),
  validate("body", "ticketBodyPutValSchema"),
  async (request, response, next) => {
    try {
      if (request.user.isAdmin) {
        // add guard on username/_id ??

        const ticket = await adminUpdateTicket(
          request.params.ticketId,
          request.body.isCompleted
        );
        return response.json({
          message: `Ticket ${ticketId} status updated by ${request.user.username}`,
          ticket,
        });
      } else {
        return response
          .status(401)
          .json({ message: "Only admins can update tickets status" });
      }
    } catch (error) {
      next(error);
    }
  }
);

// DONE
router.delete(
  "/:ticketId",
  validate("params", "ticketParamValSchema"),
  async (request, response, next) => {
    try {
      if (request.user.isAdmin) {
        const ticketId = request.params.ticketId;
        const ticket = await adminDeleteTicket(ticketId);
        return response.json({
          message: `Ticket ${ticketId} deleted by ${request.user.username}`,
          ticket,
        });
      } else {
        return response
          .status(400)
          .json({ message: "Only admins can delete tickets" });
      }
    } catch (error) {
      next(error);
    }
  }
);

// TODO an admin might want to get all tickets from a username (admin filter by username/ clientside filtering)

module.exports = router;
