import { Button, Navbar, NavbarContent, NavbarItem } from '@nextui-org/react'
import Link from 'next/link'
import React from 'react'

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
          <Button as={Link} color="primary" href="/auth/signup" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}

export default AppBar