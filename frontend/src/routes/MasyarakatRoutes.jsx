import MasyarakatLayout from "@/layouts/MasyarakatLayout";
import MasyarakatDashboard from "@/pages/masyarakat/dasboard";
import MasyarakatInfrastruktur from "@/pages/masyarakat/infrastruktur";
import MasyarakatKonfirmasi from "@/pages/masyarakat/konfirmasi-penerimaan";
import ProfilePage from "@/pages/masyarakat/masyarakat-profile";
import MasyarakatPemantauan from "@/pages/masyarakat/pemantauan";
import MasyarakatSemuaProgram from "@/pages/masyarakat/program";
import MasyarakatBansos from "@/pages/masyarakat/program-bansos";
import MasyarakatScanQR from "@/pages/masyarakat/scan-qr";
import VerifikasiNominal from "@/pages/masyarakat/verifikasi-nominal";

const MasyarakatRoutes = [
  {
    path: "/masyarakat",
    element: <MasyarakatLayout />,
    roles: ["user"],
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
      {
        path: "konfirmasi",
        element: <MasyarakatKonfirmasi />,
      },
      {
        path: "scan-qr",
        element: <MasyarakatScanQR />,
      },
      {
        path: "verifikasi",
        element: <VerifikasiNominal />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
    ],
  },
];

export default MasyarakatRoutes;
