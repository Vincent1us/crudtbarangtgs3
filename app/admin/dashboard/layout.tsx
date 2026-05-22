import CustomerSidebar from "@/components/Sidebar"

export const metadata = {
   title: 'Dashboard | Toko Online',
   description: 'Praktikum SMK Telkom Malang',
}


type PropsLayout = {
   children: React.ReactNode
}


const RootLayout = ({ children }: PropsLayout) => {
   return (
       <div>
        <CustomerSidebar >
         {children}
        </CustomerSidebar>
        </div>
   )
}


export default RootLayout