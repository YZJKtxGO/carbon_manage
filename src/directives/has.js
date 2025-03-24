export function has(value) {
    let isExist = false;
    const role = localStorage.getItem("role");
    if (role == undefined || role == null) {
        return false;
    }
  
    if (value.includes(role)) {
        isExist = true;
    }
    return isExist;
}