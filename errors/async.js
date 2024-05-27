export const catchAsync = callback => {
  return () => {
    callback().catch(console.error)
  }
}