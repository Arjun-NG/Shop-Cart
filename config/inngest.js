
import connectDB from "./db.js";
import User from "../models/User.js";
import { Inngest } from "inngest";
export const inngest = new Inngest({ id: "ShopCart-next" });
export const SyncUserCreation = inngest.createFunction(
  { id: "sync-user-from-clerk" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    const {
      id,
      first_name,
      last_name,
      email_addresses,
      image_url,
    } = event.data;

    const userData = {
      _id: id,
      email: email_addresses?.[0]?.email_address,
      name: `${first_name || ""} ${last_name || ""}`.trim(),
      imageUrl: image_url,
    };

    await connectDB();

    await User.create(userData)
    return { status: "user synced" };
  }
);


export const SyncUserUpdation = inngest.createFunction(
  { id: "update-user-with-clerk" },
  { event: "clerk/user.updated" },
  async ({ event }) => {
    const {
      id,
      first_name,
      last_name,
      email_addresses,
      image_url,
    } = event.data;

    const userData = {
      _id: id,
      email: email_addresses?.[0]?.email_address,
      name: `${first_name || ""} ${last_name || ""}`.trim(),
      imageUrl: image_url,
    };

    await connectDB();

    await User.findByIdAndUpdate(userData)
    return { status: "User Details updated" };
  }
);

export const SyncUserDeletion = inngest.createFunction(
  { id: "delete-user-with-clerk" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    const {
      id,

    } = event.data;

    const userData = {
      _id: id,

    };

    await connectDB();

    await User.findByIdAndDelete(userData)
    return { status: "User Details Deleted" };
  }
);