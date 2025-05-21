import express from "express";
import { ContactController } from "./contact.controller";

const router = express.Router();

router.post("/", ContactController.createContactMessage);
router.get("/", ContactController.getAllContacts);
router.get("/:id", ContactController.getSingleContact);
router.delete("/:id", ContactController.deleteContact);

export const ContactRoutes = router;
