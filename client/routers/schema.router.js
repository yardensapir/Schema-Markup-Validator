import express from "express";
import * as schemaController from "../controllers/shcemaController.js";

const router = new express.Router();

// Test Server
router.get("/", (req, res) => {
  res.send("Hello from server !");
});

// Arcticle Shcema Router
router.post("/findArticleSchema", schemaController.getArticleSchema);
// FAQs Schema Router
router.post("/findFAQSchema", schemaController.getFAQsSchema);
// Organiztion Schema Router
router.post("/findOrganiztionSchema", schemaController.getOrganiztionSchema);
// Product Schema Router
router.post("/findProductSchema", schemaController.getProductSchema);

export default router;
