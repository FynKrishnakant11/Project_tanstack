import { lazy, Suspense } from "react";
const AllPersonTable = lazy(() => import("./components/AllPersonTable"));
import FallBackUi from "./components/shared/FallBackUi";
function App() {
  return (
    <Suspense fallback={<FallBackUi />}>
      <AllPersonTable />
    </Suspense>
  );
}
export default App;
