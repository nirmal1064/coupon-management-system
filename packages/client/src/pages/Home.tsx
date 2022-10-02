import { useAppSelector } from "../redux/hooks";

const Home = () => {
  console.log("In Home");
  const user = useAppSelector((state) => state.users);

  return (
    <div>
      <div>Welcome {user.name}</div>
    </div>
  );
};

export default Home;
