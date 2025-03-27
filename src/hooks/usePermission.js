import { rolePermissions } from "../config/rbacConfig";

// export const usePermission = (userRole)=>{
//     const hasPermission = (permission)=>{
//         const allowedPermissons = rolePermissions[userRole] || [];

//         return allowedPermissons.includes(permission);
//     }

//     return { hasPermission };
// }

// example for flatMap:
/*
    1.
    [
        ["view_support"], // Permissions for ROLE_USER
        ["view_support", "view_dashboard"] // Permissions for ROLE_SELLER
    ] (using map)

    2.
    ["view_support", "view_support", "view_dashboard"] (using flatMap)
*/

export const usePermission = (userRoles = []) => {
  const hasPermission = (permission) => {
    if (userRoles) {
      // Convert roles to uppercase to match the keys in rolePermissions
      const normalizedRoles = userRoles.map((role) => role.toUpperCase());

      // Collect all permissions from the user's roles
      const userPermissions = new Set(
        normalizedRoles.flatMap((role) => rolePermissions[role] || [])
      );

      console.log(userPermissions);

      // Check if the requested permission exists
      return userPermissions.has(permission);
    }
  };

  return { hasPermission };
};
