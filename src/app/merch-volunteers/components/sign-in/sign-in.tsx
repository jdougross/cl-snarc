import { signIn } from "@/app/auth";
import { Button, Flex } from "@chakra-ui/react";

export function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <Flex
        flexDirection="row"
        alignItems="center"
        justifyContent="flex-end"
        px="8rem"
        py="2rem"
      >
        <Button type="submit" alignSelf="flex-end">
          Sign In with Google
        </Button>
      </Flex>
    </form>
  );
}
