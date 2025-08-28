interface BannerProps {
  variantLabel: string
}

export function Banner({ variantLabel }: BannerProps) {
  const getBannerClasses = () => {
    let bannerClasses = 'w-full text-center py-4 text-4xl font-bold rounded-lg mb-8'
    bannerClasses += ' bg-green-400 text-black'
    return bannerClasses
  }

  return (
    <div className={getBannerClasses()}>
      {variantLabel}
    </div>
  )
}
