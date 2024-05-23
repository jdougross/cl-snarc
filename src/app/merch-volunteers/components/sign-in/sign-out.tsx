import { signOut } from "@/app/auth";
import { Button, Flex, Img } from "@chakra-ui/react";
import { Session } from "next-auth";
import { buttonProps } from "../../../theme";

export function SignOut(props: { session: Session }) {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <Flex
        flexDirection="row"
        alignItems="center"
        justifyContent="flex-end"
        px="8rem"
        py="2rem"
      >
        <Img
          src={props.session.user?.image ?? ""}
          height="30px"
          width="30px"
          borderRadius="15px"
          mx="1rem"
        />
        <Button type="submit" {...buttonProps}>
          {`Sign Out: ${props.session.user?.email}`}
        </Button>
      </Flex>
    </form>
  );
}
