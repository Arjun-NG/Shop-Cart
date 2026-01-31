import { serve } from "inngest/next";
import { inngest, SyncUserCreation, SyncUserDeletion, SyncUserUpdation } from "@/config/inngest";

// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
   SyncUserCreation,
   SyncUserUpdation,
   SyncUserDeletion
  ],
});