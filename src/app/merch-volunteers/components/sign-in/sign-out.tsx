import { signOut } from "@/app/auth";
import { Button, Flex, Img } from "@chakra-ui/react";
import { Session } from "next-auth";

export function SignOut(props: { session: Session }) {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <Flex alignItems="center" justifyContent="flex-end" p={4}>
        <Img
          src={props.session.user?.image ?? ""}
          h={8}
          borderRadius={16}
          m={2}
        />
        <Button
          type="submit"
          bg="brand.background.secondary"
          textColor="brand.text.primary"
        >
          {`Sign Out: ${props.session.user?.email}`}
        </Button>
      </Flex>
    </form>
  );
}
