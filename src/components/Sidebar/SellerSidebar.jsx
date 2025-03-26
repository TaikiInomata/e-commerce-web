import { Link, useNavigate } from 'react-router-dom'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroupLabel,
  SidebarMenuSub,
  SidebarMenuSubItem
} from '~/components/ui/sidebar'
import { Box, ChevronDown, House, MessageCircleWarning, NotepadText, Store, TicketPercent } from 'lucide-react'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '~/components/ui/collapsible'
import { LuSettings } from 'react-icons/lu'
import { IoMdHelpCircleOutline } from 'react-icons/io'
import { LuLogOut } from 'react-icons/lu'
import { Separator } from '~/components/ui/separator'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '~/components/ui/alert-dialog'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'
import { logoutUserAPI } from '~/redux/user/userSlice'
import { clearCart } from '~/redux/cart/cartSlice'

function SellerSidebar() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout = async () => {
    dispatch(clearCart())
    toast.promise(dispatch(logoutUserAPI()), {
      loading: 'Đang đăng xuất...'
    })
  }

  return (
    <Sidebar className='px-4 bg-mainColor1-800 border-none pb-4 rounded-tr-2xl rounded-br-2xl'>
      <SidebarHeader className='p-0'>
        <span
          className='text-4xl font-medium text-white text-center cursor-pointer hover:scale-105 transition-transform hover:duration-500 my-10'
          onClick={() => navigate('/')}
        >
          LEVI
        </span>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>

          <SidebarMenuItem>
            <SidebarMenuButton className='text-white hover:bg-white/15 hover:text-white hover:rounded-lg' asChild>
              <Link to='/seller'>
                <House />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <Collapsible defaultOpen className="group/collapsible">
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton className='text-white group-data-[state=open]/collapsible:hover:bg-white/15 hover:bg-white/15 group-data-[state=open]/collapsible:hover:text-white hover:text-white'>
                  <Store />
                  <span>Cửa hàng</span>
                  <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuButton asChild className='text-white hover:bg-white/15 hover:text-white hover:rounded-lg'>
                      <Link to='/seller/store/profile'>Hồ sơ cửa hàng</Link>
                    </SidebarMenuButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuButton asChild className='text-white hover:bg-white/15 hover:text-white hover:rounded-lg'>
                      <Link to='/seller/store/inventory'>Quản lý kho hàng</Link>
                    </SidebarMenuButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>

          <Collapsible defaultOpen className="group/collapsible">
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton className='text-white group-data-[state=open]/collapsible:hover:bg-white/15 hover:bg-white/15 group-data-[state=open]/collapsible:hover:text-white hover:text-white'>
                  <Box />
                  <span>Sản phẩm</span>
                  <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuButton asChild className='text-white hover:bg-white/15 hover:text-white hover:rounded-lg'>
                      <Link to='/seller/products'>Quản lí sản phẩm</Link>
                    </SidebarMenuButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>

          <Collapsible defaultOpen className="group/collapsible">
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton className='text-white group-data-[state=open]/collapsible:hover:bg-white/15 hover:bg-white/15 group-data-[state=open]/collapsible:hover:text-white hover:text-white'>
                  <NotepadText />
                  <span>Đơn hàng</span>
                  <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuButton asChild className='text-white hover:bg-white/15 hover:text-white hover:rounded-lg'>
                      <Link to='/seller/orders'>Quản lí đơn hàng</Link>
                    </SidebarMenuButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>

          <SidebarMenuItem>
            <SidebarMenuButton className='text-white hover:bg-white/15 hover:text-white hover:rounded-lg' asChild>
              <Link to='/seller/promotion'>
                <TicketPercent />
                <span>Quản lý khuyến mãi</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton className='text-white hover:bg-white/15 hover:text-white hover:rounded-lg' asChild>
              <Link to='/seller/comment'>
                <MessageCircleWarning />
                <span>Quản lý đánh giá, bình luận</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

        </SidebarMenu>

        <Separator className='my-6' />

        <SidebarGroup className='p-0'>
          <SidebarGroupLabel className='text-gray-300 mb-1'>CHUNG</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton className='text-white hover:bg-white/15 hover:text-white hover:rounded-lg' asChild>
                  <a href='/seller/settings'>
                    <LuSettings />
                    <span>Cài đặt</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton className='text-white hover:bg-white/15 hover:text-white hover:rounded-lg' asChild>
                  <a href='/seller/help'>
                    <IoMdHelpCircleOutline />
                    <span>Trợ giúp</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <SidebarMenuItem>
                    <SidebarMenuButton className='text-white hover:bg-white/15 hover:text-white hover:rounded-lg' asChild>
                      <div className='cursor-pointer'>
                        <LuLogOut />
                        <span>Đăng xuất</span>
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Bạn có chắc chắn muốn đăng xuất?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Bạn sẽ cần phải đăng nhập lại trước khi truy cập vào hệ thống.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Hủy</AlertDialogCancel>
                    <AlertDialogAction onClick={handleLogout}>Đăng xuất</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

export default SellerSidebar