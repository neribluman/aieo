<div className="relative h-full">
  {/* Existing carousel code... */}
  
  {/* Update the text container for mobile */}
  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
    <h3 className="text-white text-lg md:text-xl font-semibold mb-1 line-clamp-2">
      {title}
    </h3>
    <p className="text-white/90 text-sm md:text-base line-clamp-2 md:line-clamp-3">
      {description}
    </p>
  </div>
</div> 