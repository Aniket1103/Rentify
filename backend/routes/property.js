import express from "express";
import { isAuthenticated, isSeller } from "../middleware/auth.js";
import {
  getAllProperties,
  getMyProperties,
  createProperty,
  updateProperty,
  deleteProperty
} from "../controllers/property.js";

const router = express.Router();

router
  .route("/buyer")
  .get(isAuthenticated, getAllProperties)                      
  
router
  .route("/seller")
  .get(isAuthenticated, isSeller, getMyProperties)

router
  .route("/create")
  .post(isAuthenticated, isSeller, createProperty)      

router
  .route("/update")
  .patch(isAuthenticated, isSeller, updateProperty)
  
router
  .route("/delete")
  .delete(isAuthenticated, isSeller, deleteProperty)
  
export default router;