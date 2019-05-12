export function isElementNode(node: any): boolean {
    return node.nodeType === 1;
}

export function isTextNode(node: any): boolean {
    return node.nodeType === 3;
}