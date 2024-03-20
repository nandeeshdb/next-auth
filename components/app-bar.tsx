import { Button, Navbar, NavbarContent, NavbarItem } from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import SignInButton from "./signin-button";

function AppBar() {
  return (
    <Navbar isBordered>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="/">
            home
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <SignInButton />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}

export default AppBar;
