function allLinks(root, args, context, info) {
  return context.prisma.links()
}

module.exports = {
  allLinks,
}