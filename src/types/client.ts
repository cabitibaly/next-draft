export type Client = {
  nom: string;
  prenom?: string;
  email: string;
  telephone: string;
  description: string;
};

export type ClientAction =
    | { type: "SET_NOM"; payload: string }
    | { type: "SET_PRENOM"; payload: string }
    | { type: "SET_EMAIL"; payload: string }
    | { type: "SET_TELEPHONE"; payload: string }
    | { type: "SET_DESCRIPTION"; payload: string };