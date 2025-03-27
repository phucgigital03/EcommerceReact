
export const roles = {
    USER: 'ROLE_USER',
    SELLER: 'ROLE_SELLER',
    ADMIN: 'ROLE_ADMIN',
}

export const permissions = {
    VIEW_SUPPORT: 'view_support',
    VIEW_DASHBOARD: 'view_dashboard',
    VIEW_ADMIN_TOOLS: 'view_admin-tool',
    VIEW_ADDRESS: 'view_address',
    VIEW_CATEGORY: 'view_category',
    VIEW_INVENTORY: 'view_inventory',
    VIEW_ORDER: 'view_order',
    VIEW_USER: 'view_usuer',
    // MANAGE_PRODUCT: 'manage_product',
    // DELETE_PRODUCT: 'add_product',
    // ADD_CATEGORIES: 'add_categories',
}

export const rolePermissions = {
    [roles.USER]: [
        permissions.VIEW_SUPPORT,
    ],
    [roles.SELLER]: [
        permissions.VIEW_SUPPORT,
        permissions.VIEW_DASHBOARD,
        permissions.VIEW_ADDRESS,
        permissions.VIEW_CATEGORY,
        permissions.VIEW_INVENTORY,
        permissions.VIEW_ORDER,
    ],
    [roles.ADMIN]: Object.values(permissions)
}

