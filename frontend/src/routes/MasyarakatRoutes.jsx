import MasyarakatLayout from "@/layouts/MasyarakatLayout";
import MasyarakatDashboard from "@/pages/masyarakat/dasboard";
import MasyarakatInfrastruktur from "@/pages/masyarakat/infrastruktur";
import MasyarakatPemantauan from "@/pages/masyarakat/pemantauan";
import MasyarakatSemuaProgram from "@/pages/masyarakat/program";
import MasyarakatBansos from "@/pages/masyarakat/program-bansos";

const MasyarakatRoutes = [
  {
    path: "/masyarakat",
    element: <MasyarakatLayout />,
    roles: ["masyarakat"],
    children: [
      {
        path: "",
        element: <MasyarakatDashboard />,
      },
      {
        path: "dashboard",
        element: <MasyarakatDashboard />,
      },
      {
        path: "program",
        element: <MasyarakatSemuaProgram />,
      },
      {
        path: "pemantauan",
        element: <MasyarakatPemantauan />,
      },
      {
        path: "bansos",
        element: <MasyarakatBansos />,
      },
      {
        path: "infrastruktur",
        element: <MasyarakatInfrastruktur />,
      },
    ],
  },
];

export default MasyarakatRoutes;
