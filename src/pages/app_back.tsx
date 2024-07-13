import { FamilyTree } from "@/components/FamilyTree";
import { RecoilRoot } from "recoil";


function AppPage( ){
  return (
    <RecoilRoot>
      <FamilyTree />
    </RecoilRoot>
  )
};

export default AppPage;