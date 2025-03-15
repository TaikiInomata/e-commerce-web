import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '~/components/ui/breadcrumb'
import { BarChartComponent } from './BarChartComponent'
import { MultiLineChartComponent } from './MultiLineChartComponent'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import Rating from 'react-rating'
import { FaRegStar, FaReply, FaStar } from 'react-icons/fa'
import { TbMessageReport } from 'react-icons/tb'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '~/components/ui/dialog'
import { Label } from '~/components/ui/label'
import { Textarea } from '~/components/ui/textarea'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel } from '~/components/ui/form'
import { Checkbox } from '~/components/ui/checkbox'

const mockComments = [
  {
    id: 1,
    commenterName: 'ABC',
    commentAt: Date.now(),
    starCount: 4,
    commentContent: 'Sản phẩm tốt, đạt yêu cầu',
    images: [],
    responseStatus: false
  },
  {
    id: 2,
    commenterName: 'ABC',
    commentAt: Date.now(),
    starCount: 4,
    commentContent: 'Sản phẩm tốt, đạt yêu cầu',
    images: [],
    responseStatus: false
  },
  {
    id: 3,
    commenterName: 'ABC',
    commentAt: Date.now(),
    starCount: 4,
    commentContent: 'Sản phẩm tốt, đạt yêu cầu',
    images: [],
    responseStatus: true
  }
]

const items = [
  {
    id: '1',
    label: 'Spam'
  },
  {
    id: '2',
    label: 'Lừa đảo'
  },
  {
    id: '3',
    label: 'Ngôn từ không phù hợp'
  },
  {
    id: '4',
    label: 'Thông tin sai sự thật'
  },
  {
    id: '5',
    label: 'Tài khoản giả mạo'
  },
  {
    id: '6',
    label: 'Chứa quảng cáo'
  }
]

function Comments() {
  const date = new Date(Date.now())
  const formatter = new Intl.DateTimeFormat('vi-VN', {
    weekday: 'long',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
  const [time, setTime] = useState(new Date().toLocaleTimeString('vi-VN'))
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      const timeString = now.toLocaleTimeString('vi-VN')
      setTime(timeString)
    }, 1000)
    return () => clearInterval(timer)
  })

  const [comments, setComments] = useState(mockComments)


  const [replication, setReplication] = useState('')
  const handleSendReplication = (event) => {
    event.preventDefault()
    console.log(replication)
  }

  const form = useForm({
    defaultValues: {
      items: []
    }
  })

  const onSendReport = (data) => {
    console.log(data)
  }

  return (
    <div className='px-6 py-4'>
      <div className="flex items-center justify-between mb-4 gap-8">
        <div className="flex-1">
          <div className="font-bold text-xl mb-2">Quản lý đánh giá & bình luận</div>
          <Breadcrumb>
            <BreadcrumbList className='text-sm'>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to='/seller'>Dashboard</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Quản lý đánh giá & bình luận</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <span className="italic text-sm text-gray-500 text-right">{time}<br />{formatter.format(date)}</span>
      </div>

      <div className='bg-white p-4 rounded-lg'>
        <div className='text-lg font-medium mb-4'>Tổng quan</div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <BarChartComponent />
          <MultiLineChartComponent />
        </div>

        <div className='text-lg font-medium mb-4'>Danh sách bình luận</div>

        <div className="[&>div]:max-h-96">
          <Table className="[&_td]:border-border [&_th]:border-border border-separate border-spacing-0 [&_tfoot_td]:border-t [&_th]:border-b [&_tr]:border-none [&_tr:not(:last-child)_td]:border-b">
            <TableHeader className="bg-background/90 sticky top-0 z-10 backdrop-blur-xs">
              <TableRow className="hover:bg-transparent">
                <TableHead>Tên khách hàng</TableHead>
                <TableHead>Ngày đánh giá</TableHead>
                <TableHead>Số sao đánh giá</TableHead>
                <TableHead>Nội dung đánh giá</TableHead>
                <TableHead className='text-center'>Hình ảnh</TableHead>
                <TableHead className='text-center'>Trạng thái phản hồi</TableHead>
                <TableHead className='text-center'>Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {comments.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.commenterName}</TableCell>
                  <TableCell>{formatter.format(date)} {new Date(item.commentAt).toLocaleTimeString('vi-VN')}</TableCell>
                  <TableCell>
                    <div className='flex items-center gap-2'>
                      <span>{item.starCount} </span>
                      <Rating
                        emptySymbol={<FaRegStar />}
                        fullSymbol={<FaStar />}
                        initialRating={item.starCount || 0}
                        readonly
                        className='text-[#FBCA04] text-md leading-none'
                      />
                    </div>

                  </TableCell>
                  <TableCell>{item.commentContent}</TableCell>
                  <TableCell>{item.images}</TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      {!item.responseStatus
                        ? <Badge>Chưa phản hồi</Badge>
                        : <Badge variant='secondary'>Đã phản hồi</Badge>
                      }
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center gap-4 justify-center'>
                      {!item.responseStatus &&
                        <Dialog onOpenChange={() => setReplication('')}>
                          <DialogTrigger asChild>
                            <Button className='bg-white shadow-none text-gray-900 p-0 hover:bg-white hover:text-mainColor1-600 hover:scale-105 transition-all hover:duration-300 hover:ease-in-out'>
                              <FaReply />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            <form action="" onSubmit={handleSendReplication}>
                              <DialogHeader>
                                <DialogTitle>Gửi phản hồi</DialogTitle>
                                <DialogDescription>
                                  Phản hồi bình luận của khách hàng. Nhấn Lưu khi bạn hoàn thành phản hồi.
                                </DialogDescription>
                              </DialogHeader>
                              <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="reply" className="text-right">
                                    Phản hồi
                                  </Label>
                                  <Textarea id="reply" className="col-span-3 h-20" value={replication} onChange={(event) => setReplication(event.target.value)} />
                                </div>
                              </div>
                              <DialogFooter>
                                <Button type="submit">Gửi phản hồi</Button>
                              </DialogFooter>
                            </form>
                          </DialogContent>
                        </Dialog>
                      }

                      <Form {...form}>
                        <form className="space-y-8">
                          <Dialog onOpenChange={() => { form.reset() }}>
                            <DialogTrigger asChild>
                              <Button className='bg-white shadow-none text-gray-900 p-0 hover:bg-white hover:text-red-500 hover:scale-105 transition-all hover:duration-300 hover:ease-in-out'>
                                <TbMessageReport />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                              <DialogHeader>
                                <DialogTitle>Báo cáo vi phạm</DialogTitle>
                                <DialogDescription>
                              Gửi báo cáo vi phạm lên Quản trị viên.
                                </DialogDescription>
                              </DialogHeader>

                              <FormField
                                control={form.control}
                                name="items"
                                render={() => (
                                  <FormItem>
                                    {items.map((item) => (
                                      <FormField
                                        key={item.id}
                                        control={form.control}
                                        name="items"
                                        render={({ field }) => {
                                          return (
                                            <FormItem
                                              key={item.id}
                                              className="flex flex-row items-start space-x-3 space-y-0"
                                            >
                                              <FormControl>
                                                <Checkbox
                                                  checked={field.value?.includes(item.id)}
                                                  onCheckedChange={(checked) => {
                                                    return checked
                                                      ? field.onChange([...field.value, item.id])
                                                      : field.onChange(
                                                        field.value?.filter(
                                                          (value) => value !== item.id
                                                        )
                                                      )
                                                  }}
                                                />
                                              </FormControl>
                                              <FormLabel className="text-sm font-normal">
                                                {item.label}
                                              </FormLabel>
                                            </FormItem>
                                          )
                                        }}
                                      />
                                    ))}
                                  </FormItem>
                                )}
                              />
                              <DialogFooter>
                                <Button type="submit" onClick={form.handleSubmit(onSendReport)}>Gửi báo cáo</Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </form>
                      </Form>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

export default Comments