import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch(`http://api.example.com/data`);
  const data = await res.json();

  return {
    props: { data },
  };
}

interface AppPageProps {
  data: {
    description: string;
  };
}

function AppPage( {data}: AppPageProps ){
  return (
    <div>
      <h1>App</h1>
      <p>{data.description}</p>
    </div>
  )
};

export default AppPage;