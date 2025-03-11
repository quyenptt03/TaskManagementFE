import { useSignOut } from "../../api/auth/query";
import Button from "../../components/Button";
import { useUserStore } from "../../store/useUserStore";

const Dashboard = () => {
  const { user } = useUserStore();
  //@ts-ignore
  const profile: User = user?.user;

  const signOut = useSignOut();

  if (!user) {
    return <p>Please log in</p>;
  }

  const onSignOut = async () => {
    signOut.mutate();
  };

  return (
    <div className="flex justify-center w-full h-full bg-[#D9EAFD]">
      <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg w-96 mt-44 h-fit">
        <h2 className="text-2xl font-bold mb-4 text-center">User profile</h2>
        <p>
          <strong>Username:</strong> {profile.userName}
        </p>
        <p>
          <strong>Email:</strong> {profile.email}
        </p>
        <p>
          <strong>Role: </strong> {profile.role}
        </p>
        <Button onClick={onSignOut} theme="filled">
          Log Out
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;
