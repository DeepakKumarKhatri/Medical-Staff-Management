export const decidePath = (comingFrom) => {
  switch (comingFrom) {
    case "clinic_manager":
      return "/clinic_manager/edit-profile";
    case "doctor":
      return "/doctor/edit-profile";
    case "patient":
      return "/patient/edit-profile";
    default:
      return "/";
  }
};
