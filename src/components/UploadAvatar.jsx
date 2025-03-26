import { useImageUpload } from '~/hooks/use-image-upload'
import { Button } from '~/components/ui/button'
import { CircleUserRoundIcon, ImageUp, XIcon } from 'lucide-react'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentUser, updateUserAPI } from '~/redux/user/userSlice'
import { useState } from 'react'
import { ACCOUNT_STATUS } from '~/utils/constants'

export default function UploadAvatar({ avatar, className }) {
  const dispatch = useDispatch()
  const currentUser = useSelector(selectCurrentUser)
  const {
    previewUrl,
    fileInputRef,
    handleThumbnailClick,
    handleFileChange,
    handleRemove,
    fileName,
    file
  } = useImageUpload()
  const [showUpload, setShowUpload] = useState(false)

  const handleUploadAvatar = () => {
    const reqData = new FormData()
    reqData.append('avatar', file)
    reqData.append('status', ACCOUNT_STATUS.ACTIVE)
    reqData.append('role', currentUser?.role)

    toast.promise(
      dispatch(updateUserAPI(reqData)),
      {
        loading: 'Đang tải hình ảnh lên...',
        success: (res) => {
          if (!res.error) {
            handleRemove()
            return 'Tải hình ảnh lên thành công!'
          }
          throw res
        },
        error: 'Đã có lỗi!'
      }
    )
  }


  return (
    <div className={className}>
      <div className="relative inline-flex">
        <Button
          type='button'
          variant="outline"
          className="relative size-24 overflow-hidden rounded-full p-0"
          onClick={handleThumbnailClick}
          onMouseOver={() => setShowUpload(true)}
          onMouseOut={() => setShowUpload(false)}
          aria-label={previewUrl ? 'Change image' : 'Upload image'}>
          <div className={`absolute bg-black opacity-70 w-full h-full text-white z-50 flex items-center justify-center p-0 flex-col gap-1 border-[2px] border-black ${showUpload ? 'block' : 'hidden'} animate-fadeIn70`}>
            <ImageUp className='text-white !size-5 z-50'/>
            <span>{avatar ? 'Thay đổi' : 'Tải lên'}</span>
          </div>
          {previewUrl ? (
            <img
              className="h-full w-full object-cover"
              src={previewUrl}
              alt="Preview of uploaded image"
              width={40}
              height={40}
              style={{ objectFit: 'cover' }} />
          ) : (
            <div aria-hidden="true">
              {avatar ? <img src={avatar} className='w-full object-cover'/> : <CircleUserRoundIcon className="opacity-60" size={16} />}
            </div>
          )}
        </Button>
        {previewUrl && (
          <Button
            onClick={handleRemove}
            size="icon"
            variant="destructive"
            className="border-background absolute -top-2 -right-2 size-6 rounded-full border-2"
            aria-label="Remove image">
            <XIcon size={16} />
          </Button>
        )}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/*"
          aria-label="Upload image file" />
      </div>
      {fileName && <p className="text-muted-foreground mt-2 text-xs mx-10 line-clamp-1">{fileName}</p>}
      <div className="sr-only" aria-live="polite" role="status">
        {previewUrl ? 'Image uploaded and preview available' : 'No image uploaded'}
      </div>
      {previewUrl && <div className='mt-2'>
        <Button type='button' onClick={handleUploadAvatar}>Tải lên</Button>
      </div>}
    </div>
  )
}
