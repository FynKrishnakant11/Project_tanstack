import { lazy,Suspense } from "react";
const AllPersonTable = lazy(() => import("./components/AllpersonTable"));
import FallBackUi from "./shared/FallBackUi";
function App() {
  return (
    <>
      <div className="">
        <Suspense fallback={<FallBackUi/>}>
          <AllPersonTable />
        </Suspense>
      </div>
    </>
  );
}
export default App;
