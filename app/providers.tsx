'use client'

import {NextUIProvider} from "@nextui-org/react";
import { SessionProvider } from "next-auth/react";

function Providers({children}:{children:React.ReactNode}) {
  return (
    <SessionProvider>
      <NextUIProvider>{children}</NextUIProvider>
      </SessionProvider>
  )
}

export default Providers