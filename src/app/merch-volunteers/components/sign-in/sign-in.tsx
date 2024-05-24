import { signIn } from "@/app/auth";
import { Button, Flex, Img } from "@chakra-ui/react";

export function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <Flex alignItems="center" justifyContent="flex-end" p={4}>
        <Button
          type="submit"
          bg="brand.background.secondary"
          textColor="brand.text.primary"
        >
          {" "}
          Sign In with Google
        </Button>
      </Flex>
    </form>
  );
}
