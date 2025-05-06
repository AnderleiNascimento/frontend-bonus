import { MENU_ITEMS } from "@/assets/data/menu-items";
import MeService from '@/services/MeService'

export const getMenuItems = () => {
  const userRoles = MeService.getUser()?.roles || [];
  const userPermissions = MeService.getUser()?.permissions || [];

  return filterMenuItemsByRoles(MENU_ITEMS, userRoles, userPermissions);
};


export const findAllParent = (menuItems, menuItem) => {
  let parents = [];
  const parent = findMenuItem(menuItems, menuItem.parentKey);
  if (parent) {
    parents.push(parent.key);
    if (parent.parentKey) {
      parents = [...parents, ...findAllParent(menuItems, parent)];
    }
  }
  return parents;
};

export const getMenuItemFromURL = (items, url) => {
  if (Array.isArray(items)) {
    for (const item of items) {
      const foundItem = getMenuItemFromURL(item, url);
      if (foundItem) return foundItem;
    }
  } else {
    if (items.url === url) return items;
    if (items.children != null) {
      for (const item of items.children) {
        if (item.url === url) return item;
      }
    }
  }
};

export const findMenuItem = (menuItems, menuItemKey) => {
  if (menuItems && menuItemKey) {
    for (const item of menuItems) {
      if (item.key === menuItemKey) {
        return item;
      }
      const found = findMenuItem(item.children, menuItemKey);
      if (found) return found;
    }
  }
  return null;
};

const filterMenuItemsByRoles = (items, userRoles, userPermissions) => {
  return items
    .map(item => {
      if (item.children) {
        const filteredChildren = filterMenuItemsByRoles(item.children, userRoles, userPermissions);
        if (filteredChildren.length) {
          return { ...item, children: filteredChildren };
        }
        return null;
      }

      return hasAccess(item.roles, item.permissions, userRoles, userPermissions) ? item : null;
    })
    .filter(Boolean);
};

const hasAccess = (itemRoles = [], itemPermissions = [], userRoles = [], userPermissions = []) => {
  const hasRole = !itemRoles.length || itemRoles.some(role => userRoles.includes(role));
  const hasPermission = !itemPermissions.length || itemPermissions.some(permission => userPermissions.includes(permission));

  return hasRole || hasPermission;
};
