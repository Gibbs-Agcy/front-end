import { cn } from '@/lib/utils'

interface TweetCardProps {
  children?: React.ReactNode
  author?: string
  handle?: string
  content?: string
  avatar?: string
  className?: string
}

export function TweetCard({
  children,
  author,
  handle,
  content,
  avatar = '/placeholder-avatar.png',
  className,
}: TweetCardProps) {
  return (
    <div
      className={cn(
        'testimonial-card glass rounded-2xl p-6 transition-all',
        className
      )}
    >
      {children || (
        <>
          <div className="flex items-start gap-3">
            <img
              src={avatar}
              alt={author}
              className="h-12 w-12 rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold">{author}</span>
                <span className="text-sm text-muted-foreground">@{handle}</span>
              </div>
              <p className="mt-2 text-sm leading-relaxed">{content}</p>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

