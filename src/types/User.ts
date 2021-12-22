export type User = {
  uid: string;
  photoUrl: string | null;
  displayName: string | null;
};

export const initUser: User = {
  uid: "",
  photoUrl: "",
  displayName: "",
};
