import { useId, useState } from 'react'
import { Star } from 'lucide-react'
import { cn } from '~/lib/utils'
import { cva } from 'class-variance-authority'
import { Label } from '~/components/ui/label'

export const ratingVariants = cva('flex gap-x-1.5', {
  variants: {
    size: {
      sm: '[&_label>svg]:size-6',
      md: '[&_label>svg]:size-8',
      lg: '[&_label>svg]:size-10'
    },
    color: {
      default: '[&_.selected-star>svg]:text-yellow-500 [&_.selected-star>svg]:fill-current',
      primary: '[&_.selected-star>svg]:text-primary [&_.selected-star>svg]:fill-primary',
      secondary: '[&_.selected-star>svg]:text-secondary [&_.selected-star>svg]:fill-secondary',
      success: '[&_.selected-star>svg]:text-success [&_.selected-star>svg]:fill-success',
      info: '[&_.selected-star>svg]:text-info [&_.selected-star>svg]:fill-info',
      warning: '[&_.selected-star>svg]:text-warning [&_.selected-star>svg]:fill-warning',
      error: '[&_.selected-star>svg]:text-error [&_.selected-star>svg]:fill-error'
    }
  },
  defaultVariants: {
    size: 'md',
    color: 'default'
  }
})

const Rating = ({
  totalStars = 5,
  defaultSelected = 0,
  onChange,
  Icon = Star,
  size,
  color,
  direction = 'ltr',
  className,
  id,
  hoverable = true,
  selectOnHover = false
}) => {
  const [selectedStar, setSelectedStar] = useState(defaultSelected < totalStars ? defaultSelected : totalStars)
  const [hoveredStar, setHoveredStar] = useState(0)
  const generatedId = useId()
  const radioGroupId = id || generatedId

  const handleStarClick = (value) => {
    const newValue = selectedStar === value ? 0 : value
    setSelectedStar(newValue)
    if (onChange) {
      onChange(newValue)
    }
  }

  const handleStarHover = (value) => {
    if (hoverable) {
      setHoveredStar(value)
      if (selectOnHover) {
        setSelectedStar(value)
        if (onChange) {
          onChange(value)
        }
      }
    }
  }

  const handleParentMouseLeave = () => {
    if (hoverable) {
      setHoveredStar(0)
    }
  }

  return (
    <div
      className={cn(ratingVariants({ size, color }), className)}
      role="radiogroup"
      aria-labelledby={`${radioGroupId}-label`}
      onMouseLeave={handleParentMouseLeave}>
      {[...Array(totalStars)].map((_, index) => {
        const starValue = direction === 'ltr' ? index + 1 : totalStars - index
        const starId = `${radioGroupId}-star-${starValue}`

        return (
          <div key={starValue} className="flex items-center" onMouseEnter={() => handleStarHover(starValue)}>
            <input
              type="radio"
              id={starId}
              name={radioGroupId}
              value={starValue}
              checked={selectedStar === starValue}
              onChange={() => handleStarClick(starValue)}
              className="hidden"
            />
            <Label
              htmlFor={starId}
              className={cn(
                'cursor-pointer',
                selectedStar >= starValue || hoveredStar >= starValue ? 'selected-star' : 'unselected-star'
              )}
              title={`${starValue} star`}
              onClick={(e) => {
                if (selectedStar === starValue) {
                  e.preventDefault()
                  handleStarClick(0)
                }
              }}>
              <Icon className="transition-colors duration-300" />
            </Label>
          </div>
        )
      })}
    </div>
  )
}

export default Rating
