import { Outlet } from "react-router-dom";
import  Header from "./header";
export default function AdminLayout() {
  return (
    <div>
     <Header/>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
