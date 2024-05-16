import { ChakraProvider } from "@chakra-ui/react";
import { MerchVolunteers } from "./merch-volunteers";

import { auth } from "@/app/auth";
import { SignIn } from "./merch-volunteers/components/sign-in/sign-in";

export default async function Home() {
  const session = await auth();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ChakraProvider>
        <SignIn />
        {session && <MerchVolunteers />}
      </ChakraProvider>
    </main>
  );
}
