import DashboardWrapper from './dashboardWrapper'

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <DashboardWrapper>{children}</DashboardWrapper>
}
