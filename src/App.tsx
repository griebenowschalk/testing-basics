import { SimplePost } from "./components/Simple/SimplePost";

function App() {
  return (
    <>
      <SimplePost
        content="Hello World"
        user="John Doe"
        likesBy={["Jane Doe", "Jim Doe"]}
      />
    </>
  );
}

export default App;
