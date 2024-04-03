import { ChakraProvider } from "@chakra-ui/react";
import { MerchVolunteers } from "./merch-volunteers";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ChakraProvider>
        <MerchVolunteers />
      </ChakraProvider>
    </main>
  );
}
