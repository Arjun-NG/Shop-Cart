"use client";
import React from "react";
import { assets, BagIcon, BoxIcon, CartIcon, HomeIcon } from "@/assets/assets";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import { useClerk, UserButton } from "@clerk/nextjs";

const Navbar = () => {
  const { isSeller, router, user } = useAppContext();
  const { openSignIn } = useClerk();

// openSignIn({
//   appearance: {
//     variables: {
//       colorPrimary: "#0F172A",        // slate-900
//       colorText: "#020617",           // near-black
//       colorBackground: "transparent",
//       borderRadius: "12px",
//       fontFamily: "Inter, system-ui, sans-serif",
//     },
//     elements: {
//       card:
//         "backdrop-blur-xl bg-white/80 shadow-2xl border border-slate-200 rounded-2xl p-8",

//       headerTitle:
//         "text-2xl font-semibold tracking-tight text-slate-900",

//       headerSubtitle:
//         "text-sm text-slate-500 mt-1",

//       formFieldLabel:
//         "text-xs uppercase tracking-wide text-slate-500 font-medium",

//       formFieldInput:
//         "rounded-lg border border-slate-300 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/20 transition-all",

//       formButtonPrimary:
//         "mt-4 w-full rounded-lg bg-gradient-to-r from-slate-900 to-slate-800 hover:from-black hover:to-slate-900 text-white font-medium py-2.5 transition-all shadow-md hover:shadow-lg",

//       footerActionText:
//         "text-sm text-slate-500",

//       footerActionLink:
//         "text-slate-900 font-medium hover:underline",

//       dividerLine:
//         "bg-slate-200",

//       socialButtonsBlockButton:
//         "rounded-lg border border-slate-300 hover:bg-slate-100 transition-all",

//       socialButtonsBlockButtonText:
//         "text-slate-700 font-medium",

//       identityPreviewText:
//         "text-sm text-slate-600",

//       formResendCodeLink:
//         "text-slate-900 font-medium hover:underline",
//     },
//   },
// });


  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-32 py-3 border-b border-gray-300 text-gray-700">
      <Image
        className="cursor-pointer w-28 md:w-32"
        onClick={() => router.push("/")}
        src={assets.logo}
        alt="logo"
      />
      <div className="flex items-center gap-4 lg:gap-8 max-md:hidden">
        <Link href="/" className="hover:text-gray-900 transition">
          Home
        </Link>
        <Link href="/all-products" className="hover:text-gray-900 transition">
          Shop
        </Link>
        <Link href="/" className="hover:text-gray-900 transition">
          About Us
        </Link>
        <Link href="/" className="hover:text-gray-900 transition">
          Contact
        </Link>

        {isSeller && (
          <button
            onClick={() => router.push("/seller")}
            className="text-xs border px-4 py-1.5 rounded-full"
          >
            Seller Dashboard
          </button>
        )}
      </div>

      <ul className="hidden md:flex items-center gap-4 ">
        <Image className="w-4 h-4" src={assets.search_icon} alt="search icon" />
        {user ? (
          <><UserButton>
            <UserButton.MenuItems>
              <UserButton.Action label="Cart" labelIcon={<CartIcon />} onClick={() => router.push("/cart")} />
               <UserButton.Action label="My Orders" labelIcon={<BagIcon />} onClick={() => router.push("/my-orders")} />

            </UserButton.MenuItems>
            </UserButton></>
        ) : (
          <button
            onClick={openSignIn}
            className="flex items-center gap-2 hover:text-gray-900 transition"
          >
            <Image src={assets.user_icon} alt="user icon" />
            Account
          </button>
        )}
      </ul>

      <div className="flex items-center md:hidden gap-3">
        {isSeller && (
          <button
            onClick={() => router.push("/seller")}
            className="text-xs border px-4 py-1.5 rounded-full"
          >
            Seller Dashboard
          </button>
        )}
   {user ? (
          <><UserButton>
            <UserButton.MenuItems>
              <UserButton.Action label="Home" labelIcon={<HomeIcon />} onClick={() => router.push("/")} />
              <UserButton.Action label="Products" labelIcon={<BoxIcon />} onClick={() => router.push("/all-products")} />
              <UserButton.Action label="Cart" labelIcon={<CartIcon />} onClick={() => router.push("/cart")} />
              <UserButton.Action label="My Orders" labelIcon={<BagIcon />} onClick={() => router.push("/my-orders")} />
 

            </UserButton.MenuItems>
            </UserButton></>
        ) : (
          <button
            onClick={openSignIn}
            className="flex items-center gap-2 hover:text-gray-900 transition"
          >
            <Image src={assets.user_icon} alt="user icon" />
            Account
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
