import { Router } from "express";
import { verifyToken } from "../middlewares/jwt";
import { createCredential, deleteCredentialById, getCredentialByUserId } from "../db/credential";
import type { ICredential } from "../db/credential";

const credentialsRoutes = Router();

credentialsRoutes.post("/", verifyToken, async (req, res) => {
    try {
      const { type, credential } = req.body;
      if (!req.user?.id) return res.status(401).json({ message: "User not authenticated" });
      
      const newCredential = await createCredential({ 
        type, 
        credential, 
        userId: req.user.id 
      } as ICredential);
      
      res.status(200).json({ 
        message: "Credential created/updated successfully", 
        credential: newCredential 
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error creating credential" });
    }
});


credentialsRoutes.get("/", verifyToken, async (req, res) => {
  if (!req.user?.id) return res.status(401).json({ message: "User not authenticated" });
  const credential = await getCredentialByUserId(req.user.id);
  res.status(200).json({ message: "Credential fetched successfully", credential });
});

credentialsRoutes.delete("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ message: "Invalid id" });
  const deletedCredential = await deleteCredentialById(id);
  if (!deletedCredential) throw new Error("Credential not found");
  res.status(200).json({ message: "Credential deleted successfully", credential: deletedCredential });
});

export default credentialsRoutes;