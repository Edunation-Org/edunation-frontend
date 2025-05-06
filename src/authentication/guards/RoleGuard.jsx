export function hasRole(userRoles, allowedRoles) {
  return allowedRoles.some((role) => userRoles.includes(role));
}

export const RoleGuard = ({ roles, userRoles, children }) => {
  return hasRole(userRoles, roles) ? children : null;
};
