import { useAppSelector } from "../redux/hooks";

const Home = () => {
  const user = useAppSelector((state) => state.users);

  return (
    <div style={{ textAlign: "center" }}>
      <div>Welcome {user.name}</div>
    </div>
  );
};

export default Home;
