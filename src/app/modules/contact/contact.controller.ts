import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ContactServices } from "./contact.service";

const createContactMessage = catchAsync(async (req, res) => {
  const result = await ContactServices.createContactMessage(req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: "Contact message sent successfully",
    data: result,
  });
});

const getAllContacts = catchAsync(async (req, res) => {
  const result = await ContactServices.getAllContacts(req.query);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "All contact messages retrieved",
    meta: result.meta,
    data: result.data,
  });
});

const getSingleContact = catchAsync(async (req, res) => {
  const result = await ContactServices.getSingleContact(req.params.id);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Contact message retrieved",
    data: result,
  });
});

const deleteContact = catchAsync(async (req, res) => {
  const result = await ContactServices.deleteContact(req.params.id);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Contact message deleted",
    data: result,
  });
});

export const ContactController = {
  createContactMessage,
  getAllContacts,
  getSingleContact,
  deleteContact,
};
