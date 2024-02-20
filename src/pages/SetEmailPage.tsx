import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Header } from "../components/Header/Header";
import { WhatsYourEmail } from "../components/SetUserData/WhatsYourEmail/WhatsYourEmail";

export const SetEmailPage = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  if (!user) {
    return <>User not found</>;
  }
  const { name } = user.client;
  return (
    <>
      <Header />
      <WhatsYourEmail fullName={name as unknown as string} />
    </>
  );
};
