function validateNode(opts) {
  return node => containBlocks(opts, node);
}

export default validateNode