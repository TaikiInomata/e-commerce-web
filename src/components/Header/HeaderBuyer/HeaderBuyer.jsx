import { useEffect } from 'react'
import { createSearchParams, Link, useNavigate } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
import { fetchCurrentCartAPI, selectCurrentCart } from '~/redux/cart/cartSlice'

import { useConfirm } from 'material-ui-confirm'
import { logoutUserAPI, selectCurrentUser } from '~/redux/user/userSlice'
import { Input } from '~/components/ui/input'

import { LuShoppingCart } from 'react-icons/lu'
import { IoNotificationsOutline } from 'react-icons/io5'
import MenuBar from './MenuBar'

import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import { ArrowRightIcon, SearchIcon } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '~/components/ui/dropdown-menu'
import { Badge } from '~/components/ui/badge'
import { useForm } from 'react-hook-form'

import { Button } from '~/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '~/components/ui/sheet'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '~/components/ui/tooltip'


function HeaderBuyer() {
  const navigate = useNavigate()

  const cart = useSelector(selectCurrentCart)
  const currentUser = useSelector(selectCurrentUser)
  const currentCart = useSelector(selectCurrentCart)
  const dispatch = useDispatch()

  const { handleSubmit, register } = useForm()

  useEffect(() => {
    dispatch(fetchCurrentCartAPI())
  }, [dispatch])


  const handleSearch = (data) => {
    const searchValue = data.searchValue.trim()
    if (searchValue) {
      navigate(`/buyer/search?${createSearchParams({ 'keyword': searchValue })}`)
    }
  }

  const confirmLogout = useConfirm()
  const handleLogout = async () => {
    confirmLogout({
      title: 'Bạn có chắc chắn muốn đăng xuất?',
      confirmationText: 'Xác nhận',
      cancellationText: 'Hủy'
    }).then(() => {
      dispatch(logoutUserAPI())
    }).catch(() => {})
  }

  return (
    <>
      <div className='container mx-auto mt-6 mb-4'>
        <div className="flex items-center justify-between">
          <div
            className='text-4xl font-medium text-mainColor1-600 cursor-pointer hover:scale-105 transition-transform hover:duration-500'
            onClick={() => navigate('/')}
          >
          LEVI
          </div>
          <div className="flex-1">
            <form action="#" onSubmit={handleSubmit(handleSearch)} className="relative w-[80%] mx-auto">
              <Input
                className='peer ps-9 pe-9 w-full placeholder:text-sm placeholder:text-mainColor1-100 rounded-full border-mainColor1-800 text-mainColor1-600 hover:border-[2px] focus:border-[2px] flex-1'
                placeholder='Bạn cần tìm gì?'
                {...register('searchValue')}
              />
              <div className="text-mainColor1-600/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                <SearchIcon size={16} />
              </div>
              <button
                className="text-mainColor1-600/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Submit search"
                type="submit"
              >
                <ArrowRightIcon size={16} aria-hidden="true" />
              </button>
            </form>
          </div>

          <div className='flex items-center gap-6'>
            <IoNotificationsOutline className='text-mainColor1-600 text-xl font-bold' />

            <Sheet key={'right'}>
              <SheetTrigger asChild>
                <div className='relative cursor-pointer hover:scale-105 hover:ease-out hover:duration-300 transition-transform'>
                  <LuShoppingCart className='text-mainColor1-600 text-xl' />
                  <Badge className="w-2 h-2 rounded-full p-2 text-center absolute -top-3 -right-3 bg-mainColor1-600">
                    {cart?.products?.length || 0}
                  </Badge>
                </div>
              </SheetTrigger>
              <SheetContent side={'right'}>
                <SheetHeader className='mt-3'>
                  <SheetTitle className='flex items-center justify-between'>
                    <div>
                      Giỏ hàng của bạn {' '}
                      <span className='text-sm text-gray-700'>(4)</span>
                    </div>
                    <SheetClose asChild>
                      <Link to='/buyer/cart' className='text-mainColor1-400 font-normal text-sm'>Xem tất cả</Link>
                    </SheetClose>

                  </SheetTitle>
                  <SheetDescription>
                    Sơ lược các sản phẩm trong giỏ hàng.
                  </SheetDescription>
                </SheetHeader>
                <div className="py-4">
                  {currentCart?.fullProducts.map((product, index) => (
                    <div key={index} className='flex items-center gap-2 my-3 overflow-hidden'>
                      <img src={product?.thumbnailUrl} alt="" width={40} height={40} />
                      <div className='flex flex-col gap-1'>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span className='text-sm line-clamp-1 text-mainColor2-800'>{product?.name}</span>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{product?.name}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        <div className='flex flex-col lg:flex-row lg:items-center lg:gap-4'>
                          <Badge className='bg-mainColor2-800/90'>{currentCart?.products[index].quantity} sản phẩm</Badge>
                          <span className='text-[0.8rem] text-muted-foreground'>x {product?.price.toLocaleString('vi-VN')}<sup>đ</sup></span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <SheetFooter>
                  <SheetClose asChild>
                    <Button className='bg-mainColor2-800/90 hover:bg-mainColor2-800 w-full hover:drop-shadow-lg' onClick={() => navigate('/buyer/checkout?step=1')}>Thanh toán ngay</Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>

            </Sheet>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className='flex items-center gap-3 cursor-pointer'>
                  <Avatar>
                    <AvatarImage src={currentUser?.avatar} />
                    <AvatarFallback>LV</AvatarFallback>
                  </Avatar>
                  <div className='text-sm text-gray-500'>Xin chào, <br></br><b className='text-gray-900'>{currentUser?.displayName}</b></div>
                </div>

              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-40">
                <DropdownMenuLabel>Tài khoản của tôi</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={() => navigate('/user/profile')} className='cursor-pointer'>Hồ sơ</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/user/order')} className='cursor-pointer'>Đơn hàng</DropdownMenuItem>
                  <DropdownMenuItem>Cài đặt</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className='text-red-600 font-medium'
                  onClick={handleLogout}
                >Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      <MenuBar />
    </>

  )
}

export default HeaderBuyer
