import { sendMail } from "../../utils/sendMail";
import { IContact } from "./contact.interface";
import { Contact } from "./contact.model";

const createContactMessage = async (payload: IContact) => {
  const result = await Contact.create(payload);

  await sendMail({
    to: "rafizulislam899@gmail.com",
    subject: `New Contact Message from ${payload.name}`,
    html: `
      <h3>You've received a new message from your portfolio website:</h3>
      <p><strong>Name:</strong> ${payload.name}</p>
      <p><strong>Email:</strong> ${payload.email}</p>
      <p><strong>Subject:</strong> ${payload.subject}</p>
      <p><strong>Message:</strong><br>${payload.message}</p>
    `,
  });

  return result;
};

const getAllContacts = async (query: Record<string, unknown>) => {
  const page = Number(query.page) | 1;
  const limit = Number(query.limit) | 10;
  const skip = (page - 1) * limit;

  const total = await Contact.countDocuments();

  const data = await Contact.find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  return {
    meta: {
      page,
      limit,
      total,
      totalPage: Math.ceil(total / limit),
    },
    data,
  };
};

const getSingleContact = async (id: string) => {
  const result = await Contact.findById(id);
  return result;
};

const deleteContact = async (id: string) => {
  const result = await Contact.findByIdAndDelete(id);
  return result;
};

export const ContactServices = {
  createContactMessage,
  getAllContacts,
  getSingleContact,
  deleteContact,
};
