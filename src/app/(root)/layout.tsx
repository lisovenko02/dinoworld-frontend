import DashboardWrapper from './dashboardWrapper'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <DashboardWrapper>{children}</DashboardWrapper>
}
